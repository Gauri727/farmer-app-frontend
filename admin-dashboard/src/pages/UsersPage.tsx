import React, { useEffect, useState } from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { PageHeader } from '../components/layout/PageHeader';
import { Badge } from '../components/ui/Badge';
import { Modal, ConfirmModal } from '../components/ui/Modal';
import { useToast } from '../contexts/ToastContext';
import { usersApi } from '../api/users';

interface User {
  id: string; username: string; email: string; phone?: string;
  role: string; status: string; created_at?: string;
  [k: string]: unknown;
}

const STATUSES = ['active', 'inactive', 'banned'];

export const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [detail, setDetail] = useState<User | null>(null);
  const [confirmUser, setConfirmUser] = useState<{ user: User; status: string } | null>(null);
  const [statusLoading, setStatusLoading] = useState(false);
  const { show } = useToast();

  const load = () => {
    setLoading(true);
    usersApi.list()
      .then((r) => setUsers(Array.isArray(r.data) ? r.data : r.data?.users ?? []))
      .catch(() => show('error', 'Failed to load users'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    return !q || u.username?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q) || u.phone?.includes(q);
  });

  const handleStatusChange = async () => {
    if (!confirmUser) return;
    setStatusLoading(true);
    try {
      await usersApi.setStatus(confirmUser.user.id, confirmUser.status);
      show('success', `User status updated to "${confirmUser.status}"`);
      setUsers((p) => p.map((u) => u.id === confirmUser.user.id ? { ...u, status: confirmUser.status } : u));
      setDetail((d) => d?.id === confirmUser.user.id ? { ...d, status: confirmUser.status } : d);
    } catch { show('error', 'Failed to update status'); }
    finally { setStatusLoading(false); setConfirmUser(null); }
  };

  return (
    <AppLayout>
      <PageHeader title="User Management" subtitle={`${users.length} registered farmers`} />

      <div className="card">
        <div className="card-header">
          <span className="card-title">All Users</span>
          <div className="filter-bar">
            <div className="search-wrap" style={{ maxWidth: 280 }}>
              <span className="search-icon">🔍</span>
              <input
                id="user-search"
                className="search-input"
                placeholder="Search by name, email, phone…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="card-body">
          {loading ? (
            <div className="table-wrap">
              {[1, 2, 3, 4, 5].map(i => <div key={i} className="skeleton skeleton-row" />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">👥</div>
              <div className="empty-title">No users found</div>
              <div className="empty-sub">{search ? 'Try a different search term' : 'No farmers registered yet'}</div>
            </div>
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Phone</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((u) => (
                    <tr key={u.id}>
                      <td>
                        <div className="font-bold">{u.username || u.email}</div>
                        <div className="td-muted">{u.email}</div>
                      </td>
                      <td className="td-muted">{u.phone || '—'}</td>
                      <td><Badge value={u.role} /></td>
                      <td><Badge value={u.status} /></td>
                      <td className="td-muted text-sm">
                        {u.created_at ? new Date(u.created_at).toLocaleDateString('en-IN') : '—'}
                      </td>
                      <td>
                        <div className="td-actions">
                          <button
                            className="btn btn-ghost btn-sm"
                            onClick={() => {
                              usersApi.getById(u.id).then(r => setDetail(r.data)).catch(() => setDetail(u));
                            }}
                          >
                            View
                          </button>
                          <select
                            className="form-select"
                            style={{ padding: '4px 8px', fontSize: 12, width: 'auto' }}
                            value={u.status}
                            onChange={(e) => setConfirmUser({ user: u, status: e.target.value })}
                          >
                            {STATUSES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                          </select>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* User detail modal */}
      <Modal isOpen={!!detail} onClose={() => setDetail(null)} title="User Details" size="lg">
        {detail && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div className="form-row form-row-2">
              <div className="form-group">
                <label className="form-label">Username</label>
                <div className="form-input" style={{ background: 'var(--surface-2)' }}>{detail.username || '—'}</div>
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <div className="form-input" style={{ background: 'var(--surface-2)' }}>{detail.email || '—'}</div>
              </div>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <div className="form-input" style={{ background: 'var(--surface-2)' }}>{detail.phone || '—'}</div>
              </div>
              <div className="form-group">
                <label className="form-label">Status</label>
                <div><Badge value={detail.status} /></div>
              </div>
            </div>
            <details>
              <summary style={{ cursor: 'pointer', fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>Raw data</summary>
              <pre className="log-viewer">{JSON.stringify(detail, null, 2)}</pre>
            </details>
          </div>
        )}
      </Modal>

      {/* Status change confirm */}
      <ConfirmModal
        isOpen={!!confirmUser}
        onClose={() => setConfirmUser(null)}
        onConfirm={handleStatusChange}
        loading={statusLoading}
        title="Change User Status"
        message={`Set "${confirmUser?.user.username}" to "${confirmUser?.status}"?`}
      />
    </AppLayout>
  );
};

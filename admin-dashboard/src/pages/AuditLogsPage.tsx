import React, { useEffect, useState, useCallback } from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { PageHeader } from '../components/layout/PageHeader';
import { useToast } from '../contexts/ToastContext';
import { auditLogsApi } from '../api/auditLogs';

interface AuditLog {
  id: string; action: string; entity_type?: string; entity_id?: string;
  admin_username?: string; ip_address?: string; created_at?: string;
  details?: Record<string, unknown>;
}

const ACTION_COLORS: Record<string, string> = {
  create: '#16a34a', update: '#0284c7', delete: '#dc2626',
  login: '#8b5cf6', logout: '#64748b', publish: '#d97706',
};

export const AuditLogsPage: React.FC = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState('');
  const { show } = useToast();

  const load = useCallback(() => {
    setLoading(true);
    const params: Record<string, string> = {};
    if (actionFilter) params['action'] = actionFilter;
    auditLogsApi.list(params)
      .then(r => setLogs(Array.isArray(r.data) ? r.data : r.data?.logs ?? []))
      .catch(() => show('error', 'Failed to load audit logs'))
      .finally(() => setLoading(false));
  }, [actionFilter]);

  useEffect(() => { load(); }, [load]);

  const filtered = logs.filter(l => {
    const q = search.toLowerCase();
    return !q || l.action?.toLowerCase().includes(q) || l.entity_type?.toLowerCase().includes(q) || l.admin_username?.toLowerCase().includes(q);
  });

  const getActionColor = (action: string) => ACTION_COLORS[action?.toLowerCase()] ?? '#64748b';

  return (
    <AppLayout>
      <PageHeader
        title="Audit Logs"
        subtitle="Complete history of admin actions on the system"
        actions={<button className="btn btn-secondary" onClick={load}>↻ Refresh</button>}
      />

      <div className="card">
        <div className="card-header">
          <span className="card-title">Activity Log ({filtered.length})</span>
          <div className="filter-bar">
            <div className="search-wrap" style={{ maxWidth: 240 }}>
              <span className="search-icon">🔍</span>
              <input className="search-input" placeholder="Filter logs…" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <select id="action-filter" className="form-select" style={{ width: 'auto', padding: '8px 12px', fontSize: 13 }}
              value={actionFilter} onChange={e => setActionFilter(e.target.value)}>
              <option value="">All Actions</option>
              <option value="create">Create</option>
              <option value="update">Update</option>
              <option value="delete">Delete</option>
              <option value="login">Login</option>
              <option value="logout">Logout</option>
              <option value="publish">Publish</option>
            </select>
          </div>
        </div>
        <div className="card-body">
          {loading ? (
            <div className="table-wrap">{[1, 2, 3, 4, 5, 6, 7].map(i => <div key={i} className="skeleton skeleton-row" />)}</div>
          ) : filtered.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <div className="empty-title">No audit logs found</div>
              <div className="empty-sub">Actions performed by admins will appear here</div>
            </div>
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr><th>Timestamp</th><th>Admin</th><th>Action</th><th>Entity</th><th>Entity ID</th><th>IP</th></tr>
                </thead>
                <tbody>
                  {filtered.map(l => (
                    <tr key={l.id}>
                      <td className="td-muted text-sm" style={{ whiteSpace: 'nowrap' }}>
                        {l.created_at ? new Date(l.created_at).toLocaleString('en-IN') : '—'}
                      </td>
                      <td className="font-bold">{l.admin_username || '—'}</td>
                      <td>
                        <span className="badge" style={{ background: getActionColor(l.action) + '22', color: getActionColor(l.action), textTransform: 'uppercase' }}>
                          {l.action}
                        </span>
                      </td>
                      <td className="td-muted">{l.entity_type || '—'}</td>
                      <td className="td-muted text-sm" style={{ fontFamily: 'monospace' }}>{l.entity_id || '—'}</td>
                      <td className="td-muted text-sm">{l.ip_address || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

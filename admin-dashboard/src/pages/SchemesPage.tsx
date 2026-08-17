import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { PageHeader } from '../components/layout/PageHeader';
import { Modal, ConfirmModal } from '../components/ui/Modal';
import { useToast } from '../contexts/ToastContext';
import { schemesApi } from '../api/schemes';

interface Scheme {
  id: string; title: string; description?: string; category?: string;
  status: string; amount?: string; eligibility_summary?: string;
  created_at?: string;[k: string]: unknown;
}
const EMPTY = { title: '', description: '', category: '', status: 'draft', amount: '', eligibility_summary: '' };

export const SchemesPage: React.FC = () => {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState(EMPTY);
  const [editing, setEditing] = useState<Scheme | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [delTarget, setDelTarget] = useState<Scheme | null>(null);
  const [statusTarget, setStatusTarget] = useState<{ scheme: Scheme; status: string } | null>(null);
  const [saving, setSaving] = useState(false);
  const { show } = useToast();
  const navigate = useNavigate();

  // No GET /admin/schemes in the frozen API — manage list locally after mutations.
  useEffect(() => { setLoading(false); }, []);

  const openCreate = () => { setEditing(null); setForm(EMPTY); setModalOpen(true); };
  const openEdit = (s: Scheme) => {
    setEditing(s);
    setForm({ title: s.title, description: s.description || '', category: s.category || '', status: s.status, amount: String(s.amount || ''), eligibility_summary: s.eligibility_summary || '' });
    setModalOpen(true);
  };

  const set = (k: keyof typeof EMPTY, v: string) => setForm(p => ({ ...p, [k]: v }));

  const handleSave = async () => {
    if (!form.title.trim()) { show('warning', 'Scheme title is required'); return; }
    setSaving(true);
    try {
      if (editing) {
        const r = await schemesApi.update(editing.id, form);
        setSchemes(p => p.map(s => s.id === editing.id ? { ...editing, ...form, ...(r.data ?? {}) } : s));
        show('success', 'Scheme updated');
      } else {
        const r = await schemesApi.create(form);
        setSchemes(p => [...p, { id: r.data?.id ?? String(Date.now()), ...form, ...(r.data ?? {}) }]);
        show('success', 'Scheme created');
      }
      setModalOpen(false);
    } catch { show('error', 'Failed to save scheme'); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!delTarget) return;
    setSaving(true);
    try {
      await schemesApi.remove(delTarget.id);
      setSchemes(p => p.filter(s => s.id !== delTarget.id));
      show('success', 'Scheme deleted');
    } catch { show('error', 'Failed to delete scheme'); }
    finally { setSaving(false); setDelTarget(null); }
  };

  const handleStatusChange = async () => {
    if (!statusTarget) return;
    setSaving(true);
    try {
      await schemesApi.setStatus(statusTarget.scheme.id, statusTarget.status);
      setSchemes(p => p.map(s => s.id === statusTarget.scheme.id ? { ...s, status: statusTarget.status } : s));
      show('success', `Scheme status set to "${statusTarget.status}"`);
    } catch { show('error', 'Failed to change status'); }
    finally { setSaving(false); setStatusTarget(null); }
  };

  const filtered = schemes.filter(s => !search || s.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <AppLayout>
      <PageHeader
        title="Scheme Management"
        subtitle="Create and manage farmer welfare schemes"
        actions={<button id="add-scheme-btn" className="btn btn-primary" onClick={openCreate}>+ New Scheme</button>}
      />

      <div className="card">
        <div className="card-header">
          <span className="card-title">Schemes ({schemes.length})</span>
          <div className="search-wrap" style={{ maxWidth: 260 }}>
            <span className="search-icon">🔍</span>
            <input className="search-input" placeholder="Search schemes…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
        <div className="card-body">
          {loading ? <div className="skeleton skeleton-row" style={{ height: 80 }} /> :
            filtered.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📋</div>
                <div className="empty-title">No schemes yet</div>
                <div className="empty-sub">Click "New Scheme" to get started</div>
              </div>
            ) : (
              <div className="table-wrap">
                <table>
                  <thead><tr><th>Title</th><th>Category</th><th>Status</th><th>Amount</th><th>Actions</th></tr></thead>
                  <tbody>
                    {filtered.map(s => (
                      <tr key={s.id}>
                        <td>
                          <div className="font-bold">{s.title}</div>
                          <div className="td-muted text-sm" style={{ maxWidth: 250, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{s.description}</div>
                        </td>
                        <td className="td-muted">{s.category || '—'}</td>
                        <td>
                          <select
                            style={{ padding: '4px 8px', fontSize: 12, borderRadius: 6, border: '1px solid var(--border)', background: 'var(--surface)', cursor: 'pointer' }}
                            value={s.status}
                            onChange={e => setStatusTarget({ scheme: s, status: e.target.value })}
                          >
                            {['draft', 'active', 'inactive'].map(st => <option key={st} value={st}>{st}</option>)}
                          </select>
                        </td>
                        <td className="td-muted">{s.amount || '—'}</td>
                        <td>
                          <div className="td-actions">
                            <button className="btn btn-ghost btn-sm" onClick={() => navigate(`/schemes/${s.id}`)}>Sub-items</button>
                            <button className="btn-icon" onClick={() => openEdit(s)}>✏️</button>
                            <button className="btn-icon danger" onClick={() => setDelTarget(s)}>🗑️</button>
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

      {/* Create/Edit Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Scheme' : 'New Scheme'} size="lg"
        footer={<>
          <button className="btn btn-secondary" onClick={() => setModalOpen(false)} disabled={saving}>Cancel</button>
          <button id="save-scheme-btn" className="btn btn-primary" onClick={handleSave} disabled={saving}>{saving ? 'Saving…' : 'Save Scheme'}</button>
        </>}
      >
        <div className="form-group"><label className="form-label">Title *</label>
          <input id="scheme-title" className="form-input" value={form.title} onChange={e => set('title', e.target.value)} placeholder="e.g. PM Kisan Nidhi" /></div>
        <div className="form-group"><label className="form-label">Description</label>
          <textarea className="form-textarea" value={form.description} onChange={e => set('description', e.target.value)} rows={3} /></div>
        <div className="form-row form-row-2">
          <div className="form-group"><label className="form-label">Category</label>
            <input className="form-input" value={form.category} onChange={e => set('category', e.target.value)} placeholder="e.g. Crop Insurance" /></div>
          <div className="form-group"><label className="form-label">Benefit Amount</label>
            <input className="form-input" value={form.amount} onChange={e => set('amount', e.target.value)} placeholder="₹6000 per year" /></div>
        </div>
        <div className="form-group"><label className="form-label">Status</label>
          <select className="form-select" value={form.status} onChange={e => set('status', e.target.value)}>
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select></div>
        <div className="form-group"><label className="form-label">Eligibility Summary</label>
          <textarea className="form-textarea" value={form.eligibility_summary} onChange={e => set('eligibility_summary', e.target.value)} rows={2} placeholder="Brief eligibility criteria…" /></div>
      </Modal>

      <ConfirmModal isOpen={!!delTarget} onClose={() => setDelTarget(null)} onConfirm={handleDelete} loading={saving}
        title="Delete Scheme" message={`Delete "${delTarget?.title}"? All associated documents, FAQs and GR records will also be affected.`} />
      <ConfirmModal isOpen={!!statusTarget} onClose={() => setStatusTarget(null)} onConfirm={handleStatusChange} loading={saving}
        title="Change Scheme Status" message={`Set "${statusTarget?.scheme.title}" to "${statusTarget?.status}"?`} />
    </AppLayout>
  );
};

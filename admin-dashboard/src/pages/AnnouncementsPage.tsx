import React, { useState } from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { PageHeader } from '../components/layout/PageHeader';
import { Badge } from '../components/ui/Badge';
import { Modal, ConfirmModal } from '../components/ui/Modal';
import { useToast } from '../contexts/ToastContext';
import { announcementsApi } from '../api/announcements';

interface Announcement {
  id: string; title: string; content: string; status: string;
  target_audience?: string; created_at?: string;
}
const EMPTY = { title: '', content: '', target_audience: 'all' };

export const AnnouncementsPage: React.FC = () => {
  const [items, setItems]     = useState<Announcement[]>([]);
  const [form, setForm]       = useState(EMPTY);
  const [editing, setEditing] = useState<Announcement | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [delTarget, setDelTarget] = useState<Announcement | null>(null);
  const [publishTarget, setPublishTarget] = useState<Announcement | null>(null);
  const [saving, setSaving]   = useState(false);
  const { show } = useToast();

  const set = (k: keyof typeof EMPTY, v: string) => setForm(p => ({ ...p, [k]: v }));

  const openCreate = () => { setEditing(null); setForm(EMPTY); setModalOpen(true); };
  const openEdit = (a: Announcement) => {
    setEditing(a);
    setForm({ title: a.title, content: a.content, target_audience: a.target_audience || 'all' });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.content.trim()) { show('warning', 'Title and content are required'); return; }
    setSaving(true);
    try {
      if (editing) {
        await announcementsApi.update(editing.id, form);
        setItems(p => p.map(a => a.id === editing.id ? { ...a, ...form } : a));
        show('success', 'Announcement updated');
      } else {
        const r = await announcementsApi.create(form);
        setItems(p => [...p, { id: r.data?.id ?? String(Date.now()), status: 'draft', ...form, ...(r.data ?? {}) }]);
        show('success', 'Announcement created');
      }
      setModalOpen(false);
    } catch { show('error', 'Failed to save announcement'); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!delTarget) return;
    setSaving(true);
    try {
      await announcementsApi.remove(delTarget.id);
      setItems(p => p.filter(a => a.id !== delTarget.id));
      show('success', 'Announcement deleted');
    } catch { show('error', 'Delete failed'); }
    finally { setSaving(false); setDelTarget(null); }
  };

  const handlePublish = async () => {
    if (!publishTarget) return;
    setSaving(true);
    try {
      await announcementsApi.publish(publishTarget.id);
      setItems(p => p.map(a => a.id === publishTarget.id ? { ...a, status: 'published' } : a));
      show('success', `"${publishTarget.title}" published!`);
    } catch { show('error', 'Publish failed'); }
    finally { setSaving(false); setPublishTarget(null); }
  };

  return (
    <AppLayout>
      <PageHeader
        title="Announcements"
        subtitle="Publish notices and updates for farmers"
        actions={<button id="add-announcement-btn" className="btn btn-primary" onClick={openCreate}>+ New Announcement</button>}
      />

      <div className="card">
        <div className="card-header"><span className="card-title">Announcements ({items.length})</span></div>
        <div className="card-body">
          {items.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📢</div>
              <div className="empty-title">No announcements yet</div>
              <div className="empty-sub">Create the first announcement for farmers</div>
            </div>
          ) : (
            <div className="table-wrap">
              <table>
                <thead><tr><th>Title</th><th>Audience</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                  {items.map(a => (
                    <tr key={a.id}>
                      <td>
                        <div className="font-bold">{a.title}</div>
                        <div className="td-muted text-sm" style={{ maxWidth: 300, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{a.content}</div>
                      </td>
                      <td className="td-muted">{a.target_audience || 'all'}</td>
                      <td><Badge value={a.status} /></td>
                      <td>
                        <div className="td-actions">
                          {a.status !== 'published' && (
                            <button className="btn btn-primary btn-sm" onClick={() => setPublishTarget(a)}>Publish</button>
                          )}
                          <button className="btn-icon" onClick={() => openEdit(a)}>✏️</button>
                          <button className="btn-icon danger" onClick={() => setDelTarget(a)}>🗑️</button>
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

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Announcement' : 'New Announcement'}
        footer={<>
          <button className="btn btn-secondary" onClick={() => setModalOpen(false)} disabled={saving}>Cancel</button>
          <button id="save-announcement-btn" className="btn btn-primary" onClick={handleSave} disabled={saving}>{saving ? 'Saving…' : 'Save'}</button>
        </>}
      >
        <div className="form-group"><label className="form-label">Title *</label>
          <input id="announcement-title" className="form-input" value={form.title} onChange={e => set('title', e.target.value)} placeholder="e.g. New Kharif Season Subsidy Available" /></div>
        <div className="form-group"><label className="form-label">Content *</label>
          <textarea className="form-textarea" value={form.content} onChange={e => set('content', e.target.value)} rows={4} placeholder="Announcement body text…" /></div>
        <div className="form-group"><label className="form-label">Target Audience</label>
          <select className="form-select" value={form.target_audience} onChange={e => set('target_audience', e.target.value)}>
            <option value="all">All Farmers</option>
            <option value="kharif">Kharif Season Farmers</option>
            <option value="rabi">Rabi Season Farmers</option>
            <option value="horticulture">Horticulture Farmers</option>
          </select></div>
      </Modal>

      <ConfirmModal isOpen={!!delTarget} onClose={() => setDelTarget(null)} onConfirm={handleDelete} loading={saving}
        title="Delete Announcement" message={`Delete "${delTarget?.title}"?`} />
      <ConfirmModal isOpen={!!publishTarget} onClose={() => setPublishTarget(null)} onConfirm={handlePublish} loading={saving}
        title="Publish Announcement"
        message={`Publish "${publishTarget?.title}" to all targeted farmers? This action will send notifications.`} />
    </AppLayout>
  );
};

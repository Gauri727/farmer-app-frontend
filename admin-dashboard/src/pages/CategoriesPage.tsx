import React, { useEffect, useState } from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { PageHeader } from '../components/layout/PageHeader';
import { Modal, ConfirmModal } from '../components/ui/Modal';
import { useToast } from '../contexts/ToastContext';
import { categoriesApi } from '../api/categories';

interface Category { id: string; name: string; name_mr: string; name_hi: string; description: string; icon: string; }

const EMPTY: Omit<Category, 'id'> = { name: '', name_mr: '', name_hi: '', description: '', icon: '' };

export const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading]   = useState(true);
  const [form, setForm]         = useState<Omit<Category, 'id'>>(EMPTY);
  const [editing, setEditing]   = useState<Category | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [delTarget, setDelTarget] = useState<Category | null>(null);
  const [saving, setSaving]     = useState(false);
  const { show } = useToast();

  // NOTE: No GET /categories endpoint in the admin API contract.
  // List is managed locally after create/update/delete for demo consistency.
  useEffect(() => { setLoading(false); }, []);

  const openCreate = () => { setEditing(null); setForm(EMPTY); setModalOpen(true); };
  const openEdit = (c: Category) => {
    setEditing(c);
    setForm({ name: c.name, name_mr: c.name_mr, name_hi: c.name_hi, description: c.description, icon: c.icon });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.name.trim()) { show('warning', 'Category name is required'); return; }
    setSaving(true);
    try {
      if (editing) {
        const r = await categoriesApi.update(editing.id, form);
        const updated: Category = { ...editing, ...form, ...(r.data as Partial<Category> ?? {}) };
        setCategories(p => p.map(c => c.id === editing.id ? updated : c));
        show('success', 'Category updated');
      } else {
        const r = await categoriesApi.create(form);
        const data = r.data as Partial<Category> & { id?: string };
        const newCat: Category = { id: data.id ?? String(Date.now()), ...form };
        setCategories(p => [...p, newCat]);
        show('success', 'Category created');
      }
      setModalOpen(false);
    } catch { show('error', 'Failed to save category'); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!delTarget) return;
    setSaving(true);
    try {
      await categoriesApi.remove(delTarget.id);
      setCategories(p => p.filter(c => c.id !== delTarget.id));
      show('success', 'Category deleted');
    } catch { show('error', 'Failed to delete category'); }
    finally { setSaving(false); setDelTarget(null); }
  };

  const set = (k: keyof typeof EMPTY, v: string) => setForm(p => ({ ...p, [k]: v }));

  return (
    <AppLayout>
      <PageHeader
        title="Category Management"
        subtitle="Organise scheme categories shown in the farmer app"
        actions={<button id="add-category-btn" className="btn btn-primary" onClick={openCreate}>+ Add Category</button>}
      />

      <div className="card">
        <div className="card-header"><span className="card-title">Categories ({categories.length})</span></div>
        <div className="card-body">
          {loading ? <div className="skeleton skeleton-row" style={{ height: 80 }} /> :
           categories.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🗂️</div>
              <div className="empty-title">No categories yet</div>
              <div className="empty-sub">Click "Add Category" to create the first one</div>
            </div>
          ) : (
            <div className="table-wrap">
              <table>
                <thead><tr><th>Icon</th><th>Name (EN)</th><th>Marathi</th><th>Hindi</th><th>Description</th><th>Actions</th></tr></thead>
                <tbody>
                  {categories.map(c => (
                    <tr key={c.id}>
                      <td style={{ fontSize: 22 }}>{c.icon || '📁'}</td>
                      <td className="font-bold">{c.name}</td>
                      <td className="td-muted">{c.name_mr || '—'}</td>
                      <td className="td-muted">{c.name_hi || '—'}</td>
                      <td className="td-muted" style={{ maxWidth: 200, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{c.description || '—'}</td>
                      <td>
                        <div className="td-actions">
                          <button className="btn-icon" onClick={() => openEdit(c)}>✏️</button>
                          <button className="btn-icon danger" onClick={() => setDelTarget(c)}>🗑️</button>
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

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Edit Category' : 'New Category'}
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setModalOpen(false)} disabled={saving}>Cancel</button>
            <button id="save-category-btn" className="btn btn-primary" onClick={handleSave} disabled={saving}>{saving ? 'Saving…' : 'Save'}</button>
          </>
        }
      >
        <div className="form-group"><label className="form-label">Name (English) *</label>
          <input id="cat-name" className="form-input" value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Crop Insurance" /></div>
        <div className="form-row form-row-2">
          <div className="form-group"><label className="form-label">Name (Marathi)</label>
            <input className="form-input" value={form.name_mr} onChange={e => set('name_mr', e.target.value)} placeholder="मराठी" /></div>
          <div className="form-group"><label className="form-label">Name (Hindi)</label>
            <input className="form-input" value={form.name_hi} onChange={e => set('name_hi', e.target.value)} placeholder="हिंदी" /></div>
        </div>
        <div className="form-group"><label className="form-label">Icon (emoji)</label>
          <input className="form-input" value={form.icon} onChange={e => set('icon', e.target.value)} placeholder="🌾" maxLength={4} /></div>
        <div className="form-group"><label className="form-label">Description</label>
          <textarea className="form-textarea" value={form.description} onChange={e => set('description', e.target.value)} placeholder="Short description…" rows={3} /></div>
      </Modal>

      <ConfirmModal isOpen={!!delTarget} onClose={() => setDelTarget(null)} onConfirm={handleDelete} loading={saving}
        title="Delete Category" message={`Delete "${delTarget?.name}"? This cannot be undone.`} />
    </AppLayout>
  );
};

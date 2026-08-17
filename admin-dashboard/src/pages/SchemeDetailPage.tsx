import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { PageHeader } from '../components/layout/PageHeader';
import { Modal, ConfirmModal } from '../components/ui/Modal';
import { useToast } from '../contexts/ToastContext';
import { schemesApi } from '../api/schemes';

type Tab = 'documents' | 'faqs' | 'gr';

interface DocItem  { id: string; name: string; description?: string; required?: boolean; }
interface FaqItem  { id: string; question: string; answer: string; order?: number; }
interface GrItem   { id: string; title: string; file_url?: string; gr_number?: string; date?: string; }

// ── Generic sub-panel component ──────────────────────────────────────
function SubPanel<T extends { id: string }>({
  items, onAdd, onDelete, onEdit, fields, title, emptyIcon,
}: {
  items: T[];
  onAdd: (data: Record<string,string>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onEdit: (id: string, data: Record<string,string>) => Promise<void>;
  fields: { key: string; label: string; type?: 'text'|'textarea'|'checkbox'; required?: boolean }[];
  title: string;
  emptyIcon: string;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [delId, setDelId]         = useState<string | null>(null);
  const [editItem, setEditItem]   = useState<T | null>(null);
  const [form, setForm]           = useState<Record<string,string>>({});
  const [saving, setSaving]       = useState(false);
  const { show } = useToast();

  const openCreate = () => {
    setEditItem(null);
    setForm(Object.fromEntries(fields.map(f => [f.key, ''])));
    setModalOpen(true);
  };
  const openEdit = (item: T) => {
    setEditItem(item);
    setForm(Object.fromEntries(fields.map(f => [f.key, String((item as Record<string,unknown>)[f.key] ?? '')])));
    setModalOpen(true);
  };

  const handleSave = async () => {
    const missing = fields.filter(f => f.required && !form[f.key]?.trim());
    if (missing.length) { show('warning', `${missing[0].label} is required`); return; }
    setSaving(true);
    try {
      if (editItem) { await onEdit(editItem.id, form); show('success', 'Updated'); }
      else { await onAdd(form); show('success', 'Added'); }
      setModalOpen(false);
    } catch { show('error', 'Operation failed'); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!delId) return;
    setSaving(true);
    try { await onDelete(delId); show('success', 'Deleted'); }
    catch { show('error', 'Delete failed'); }
    finally { setSaving(false); setDelId(null); }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
        <button className="btn btn-primary btn-sm" onClick={openCreate}>+ Add</button>
      </div>
      {items.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">{emptyIcon}</div>
          <div className="empty-title">No {title} yet</div>
        </div>
      ) : (
        <div className="table-wrap">
          <table>
            <thead><tr>{fields.slice(0,2).map(f => <th key={f.key}>{f.label}</th>)}<th>Actions</th></tr></thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  {fields.slice(0,2).map(f => (
                    <td key={f.key} className={f === fields[0] ? 'font-bold' : 'td-muted'}>
                      {String((item as Record<string,unknown>)[f.key] ?? '—')}
                    </td>
                  ))}
                  <td>
                    <div className="td-actions">
                      <button className="btn-icon" onClick={() => openEdit(item)}>✏️</button>
                      <button className="btn-icon danger" onClick={() => setDelId(item.id)}>🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editItem ? `Edit ${title}` : `Add ${title}`}
        footer={<>
          <button className="btn btn-secondary" onClick={() => setModalOpen(false)} disabled={saving}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSave} disabled={saving}>{saving ? 'Saving…' : 'Save'}</button>
        </>}
      >
        {fields.map(f => (
          <div key={f.key} className="form-group">
            <label className="form-label">{f.label}{f.required ? ' *' : ''}</label>
            {f.type === 'textarea'
              ? <textarea className="form-textarea" value={form[f.key]||''} onChange={e => setForm(p => ({...p, [f.key]: e.target.value}))} rows={3} />
              : <input className="form-input" value={form[f.key]||''} onChange={e => setForm(p => ({...p, [f.key]: e.target.value}))} />
            }
          </div>
        ))}
      </Modal>
      <ConfirmModal isOpen={!!delId} onClose={() => setDelId(null)} onConfirm={handleDelete} loading={saving}
        title={`Delete ${title}`} message="This cannot be undone." />
    </div>
  );
}

// ── Main page ────────────────────────────────────────────────────────
export const SchemeDetailPage: React.FC = () => {
  const { schemeId } = useParams<{ schemeId: string }>();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>('documents');

  const [docs, setDocs] = useState<DocItem[]>([]);
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [grs,  setGrs]  = useState<GrItem[]>([]);

  const sid = schemeId!;

  // Documents
  const addDoc    = async (d: Record<string,string>) => { const r = await schemesApi.addDocument(sid, d); const newDoc: DocItem = { id: (r.data as {id?:string})?.id ?? String(Date.now()), name: d.name ?? '', description: d.description }; setDocs(p => [...p, newDoc]); };
  const editDoc   = async (id: string, d: Record<string,string>) => { await schemesApi.updateDocument(id, d); setDocs(p => p.map(x => x.id === id ? { ...x, ...d } : x)); };
  const deleteDoc = async (id: string) => { await schemesApi.removeDocument(id); setDocs(p => p.filter(x => x.id !== id)); };

  // FAQs
  const addFaq    = async (d: Record<string,string>) => { const r = await schemesApi.addFaq(sid, d); setFaqs(p => [...p, { id: (r.data as {id?:string})?.id ?? String(Date.now()), question: d.question ?? '', answer: d.answer ?? '' }]); };
  const editFaq   = async (id: string, d: Record<string,string>) => { await schemesApi.updateFaq(id, d); setFaqs(p => p.map(x => x.id === id ? { ...x, ...d } : x)); };
  const deleteFaq = async (id: string) => { await schemesApi.removeFaq(id); setFaqs(p => p.filter(x => x.id !== id)); };

  // GR
  const addGr    = async (d: Record<string,string>) => { const r = await schemesApi.addGr(sid, d); setGrs(p => [...p, { id: (r.data as {id?:string})?.id ?? String(Date.now()), title: d.title ?? '', gr_number: d.gr_number, file_url: d.file_url }]); };
  const editGr   = async (id: string, d: Record<string,string>) => { await schemesApi.updateGr(id, d); setGrs(p => p.map(x => x.id === id ? { ...x, ...d } : x)); };
  const deleteGr = async (id: string) => { await schemesApi.removeGr(id); setGrs(p => p.filter(x => x.id !== id)); };

  return (
    <AppLayout>
      <PageHeader
        title={`Scheme: ${sid}`}
        subtitle="Manage documents, FAQs and GR records"
        actions={<button className="btn btn-secondary" onClick={() => navigate('/schemes')}>← Back to Schemes</button>}
      />

      <div className="card">
        <div className="card-header">
          <div className="tabs" style={{ borderBottom: 'none', margin: 0 }}>
            {(['documents','faqs','gr'] as Tab[]).map(t => (
              <button key={t} className={`tab-btn${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}>
                {t === 'documents' ? '📄 Documents' : t === 'faqs' ? '❓ FAQs' : '🏛️ GR Docs'}
              </button>
            ))}
          </div>
        </div>
        <div className="card-body" style={{ padding: 20 }}>
          {tab === 'documents' && (
            <SubPanel<DocItem>
              items={docs} onAdd={addDoc} onEdit={editDoc} onDelete={deleteDoc}
              title="Document" emptyIcon="📄"
              fields={[
                { key: 'name',        label: 'Document Name', required: true },
                { key: 'description', label: 'Description',   type: 'textarea' },
              ]}
            />
          )}
          {tab === 'faqs' && (
            <SubPanel<FaqItem>
              items={faqs} onAdd={addFaq} onEdit={editFaq} onDelete={deleteFaq}
              title="FAQ" emptyIcon="❓"
              fields={[
                { key: 'question', label: 'Question', required: true },
                { key: 'answer',   label: 'Answer',   required: true, type: 'textarea' },
              ]}
            />
          )}
          {tab === 'gr' && (
            <SubPanel<GrItem>
              items={grs} onAdd={addGr} onEdit={editGr} onDelete={deleteGr}
              title="GR Document" emptyIcon="🏛️"
              fields={[
                { key: 'title',     label: 'Title',     required: true },
                { key: 'gr_number', label: 'GR Number' },
                { key: 'file_url',  label: 'File URL'  },
              ]}
            />
          )}
        </div>
      </div>
    </AppLayout>
  );
};

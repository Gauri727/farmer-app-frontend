import React, { useState } from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { PageHeader } from '../components/layout/PageHeader';
import { Modal, ConfirmModal } from '../components/ui/Modal';
import { useToast } from '../contexts/ToastContext';
import { eligibilityApi } from '../api/eligibility';

interface Question {
  id: string; question: string; question_type: string; options?: string;
  is_required?: boolean; order?: number;
}
const EMPTY = { question: '', question_type: 'boolean', options: '', is_required: 'true', order: '0' };

export const EligibilityPage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [form, setForm]   = useState(EMPTY);
  const [editing, setEditing] = useState<Question | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [delTarget, setDelTarget] = useState<Question | null>(null);
  const [saving, setSaving] = useState(false);
  const { show } = useToast();

  const set = (k: keyof typeof EMPTY, v: string) => setForm(p => ({ ...p, [k]: v }));

  const openCreate = () => { setEditing(null); setForm(EMPTY); setModalOpen(true); };
  const openEdit = (q: Question) => {
    setEditing(q);
    setForm({ question: q.question, question_type: q.question_type, options: q.options || '', is_required: String(q.is_required ?? true), order: String(q.order ?? 0) });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.question.trim()) { show('warning', 'Question text is required'); return; }
    setSaving(true);
    const payload = { ...form, is_required: form.is_required === 'true', order: Number(form.order) };
    try {
      if (editing) {
        await eligibilityApi.updateQuestion(editing.id, payload);
        setQuestions(p => p.map(q => q.id === editing.id ? { ...editing, ...payload } : q));
        show('success', 'Question updated');
      } else {
        const r = await eligibilityApi.createQuestion(payload);
        setQuestions(p => [...p, { id: r.data?.id ?? String(Date.now()), ...payload }]);
        show('success', 'Question created');
      }
      setModalOpen(false);
    } catch { show('error', 'Failed to save question'); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!delTarget) return;
    setSaving(true);
    try {
      await eligibilityApi.removeQuestion(delTarget.id);
      setQuestions(p => p.filter(q => q.id !== delTarget.id));
      show('success', 'Question deleted');
    } catch { show('error', 'Delete failed'); }
    finally { setSaving(false); setDelTarget(null); }
  };

  return (
    <AppLayout>
      <PageHeader
        title="Eligibility Questions"
        subtitle="Configure questions used to check farmer eligibility for schemes"
        actions={<button id="add-question-btn" className="btn btn-primary" onClick={openCreate}>+ Add Question</button>}
      />

      <div className="card">
        <div className="card-header"><span className="card-title">Questions ({questions.length})</span></div>
        <div className="card-body">
          {questions.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">✅</div>
              <div className="empty-title">No eligibility questions yet</div>
              <div className="empty-sub">Add questions to screen farmers for scheme eligibility</div>
            </div>
          ) : (
            <div className="table-wrap">
              <table>
                <thead><tr><th>#</th><th>Question</th><th>Type</th><th>Required</th><th>Actions</th></tr></thead>
                <tbody>
                  {questions.sort((a,b) => (a.order||0)-(b.order||0)).map(q => (
                    <tr key={q.id}>
                      <td className="td-muted">{q.order ?? '—'}</td>
                      <td className="font-bold">{q.question}</td>
                      <td><span className="badge badge-info">{q.question_type}</span></td>
                      <td>{q.is_required ? '✅' : '—'}</td>
                      <td>
                        <div className="td-actions">
                          <button className="btn-icon" onClick={() => openEdit(q)}>✏️</button>
                          <button className="btn-icon danger" onClick={() => setDelTarget(q)}>🗑️</button>
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

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Question' : 'New Eligibility Question'}
        footer={<>
          <button className="btn btn-secondary" onClick={() => setModalOpen(false)} disabled={saving}>Cancel</button>
          <button id="save-question-btn" className="btn btn-primary" onClick={handleSave} disabled={saving}>{saving ? 'Saving…' : 'Save'}</button>
        </>}
      >
        <div className="form-group"><label className="form-label">Question Text *</label>
          <textarea id="question-text" className="form-textarea" value={form.question} onChange={e => set('question', e.target.value)} rows={2} placeholder="e.g. Is the applicant a registered farmer?" /></div>
        <div className="form-row form-row-2">
          <div className="form-group"><label className="form-label">Question Type</label>
            <select className="form-select" value={form.question_type} onChange={e => set('question_type', e.target.value)}>
              <option value="boolean">Yes / No</option>
              <option value="number">Number</option>
              <option value="text">Text</option>
              <option value="select">Select (Options)</option>
            </select></div>
          <div className="form-group"><label className="form-label">Display Order</label>
            <input className="form-input" type="number" value={form.order} onChange={e => set('order', e.target.value)} min="0" /></div>
        </div>
        {form.question_type === 'select' && (
          <div className="form-group"><label className="form-label">Options (comma-separated)</label>
            <input className="form-input" value={form.options} onChange={e => set('options', e.target.value)} placeholder="Option A, Option B, Option C" /></div>
        )}
        <div className="form-group"><label className="form-label">Required?</label>
          <select className="form-select" value={form.is_required} onChange={e => set('is_required', e.target.value)}>
            <option value="true">Yes — Required</option>
            <option value="false">No — Optional</option>
          </select></div>
      </Modal>

      <ConfirmModal isOpen={!!delTarget} onClose={() => setDelTarget(null)} onConfirm={handleDelete} loading={saving}
        title="Delete Question" message={`Delete question "${delTarget?.question}"?`} />
    </AppLayout>
  );
};

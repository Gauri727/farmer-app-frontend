import React from 'react';
import type { ReactNode } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'default' | 'lg';
}

export const Modal: React.FC<Props> = ({ isOpen, onClose, title, children, footer, size = 'default' }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className={`modal${size === 'lg' ? ' modal-lg' : ''}`}>
        <div className="modal-header">
          <span className="modal-title">{title}</span>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
};

interface ConfirmProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  loading?: boolean;
}
export const ConfirmModal: React.FC<ConfirmProps> = ({ isOpen, onClose, onConfirm, title, message, loading }) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    title="Confirm Action"
    footer={
      <>
        <button className="btn btn-secondary" onClick={onClose} disabled={loading}>Cancel</button>
        <button className="btn btn-danger" onClick={onConfirm} disabled={loading}>
          {loading ? 'Processing…' : 'Confirm'}
        </button>
      </>
    }
  >
    <div className="confirm-modal" style={{ textAlign: 'center' }}>
      <div className="confirm-icon">⚠️</div>
      <div className="confirm-title">{title}</div>
      <div className="confirm-text">{message}</div>
    </div>
  </Modal>
);

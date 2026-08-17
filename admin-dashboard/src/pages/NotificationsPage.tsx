import React, { useState } from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { PageHeader } from '../components/layout/PageHeader';
import { useToast } from '../contexts/ToastContext';
import { notificationsApi } from '../api/notifications';

export const NotificationsPage: React.FC = () => {
  const { show } = useToast();

  // Broadcast
  const [bcTitle, setBcTitle]     = useState('');
  const [bcMessage, setBcMessage] = useState('');
  const [bcAudience, setBcAudience] = useState('all');
  const [bcLoading, setBcLoading] = useState(false);

  // SMS
  const [smsMessage, setSmsMessage] = useState('');
  const [smsPhones, setSmsPhones]   = useState('');
  const [smsLoading, setSmsLoading] = useState(false);

  const sendBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bcTitle.trim() || !bcMessage.trim()) { show('warning', 'Title and message are required'); return; }
    setBcLoading(true);
    try {
      await notificationsApi.broadcast({ title: bcTitle, message: bcMessage, audience: bcAudience });
      show('success', 'Broadcast notification sent!');
      setBcTitle(''); setBcMessage('');
    } catch { show('error', 'Failed to send broadcast'); }
    finally { setBcLoading(false); }
  };

  const sendSms = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!smsMessage.trim()) { show('warning', 'SMS message is required'); return; }
    setBcLoading(true);
    try {
      const phones = smsPhones.split(',').map(p => p.trim()).filter(Boolean);
      await notificationsApi.sms({ message: smsMessage, phone_numbers: phones.length ? phones : undefined });
      show('success', 'SMS sent successfully!');
      setSmsMessage(''); setSmsPhones('');
    } catch { show('error', 'Failed to send SMS'); }
    finally { setSmsLoading(false); }
  };

  return (
    <AppLayout>
      <PageHeader
        title="Notifications & SMS"
        subtitle="Send push notifications and SMS messages to farmers"
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Broadcast push */}
        <div className="notif-card">
          <div>
            <h3>📱 Push Broadcast</h3>
            <p>Send push notifications to farmers via the mobile app</p>
          </div>
          <form id="broadcast-form" onSubmit={sendBroadcast} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="form-group">
              <label className="form-label">Notification Title *</label>
              <input id="bc-title" className="form-input" value={bcTitle} onChange={e => setBcTitle(e.target.value)} placeholder="e.g. New Scheme Available" />
            </div>
            <div className="form-group">
              <label className="form-label">Message *</label>
              <textarea className="form-textarea" value={bcMessage} onChange={e => setBcMessage(e.target.value)} rows={3} placeholder="Notification body text…" />
            </div>
            <div className="form-group">
              <label className="form-label">Target Audience</label>
              <select className="form-select" value={bcAudience} onChange={e => setBcAudience(e.target.value)}>
                <option value="all">All Farmers</option>
                <option value="active">Active Users Only</option>
                <option value="inactive">Inactive Users</option>
              </select>
            </div>
            <button type="submit" id="send-broadcast-btn" className="btn btn-primary" disabled={bcLoading}>
              {bcLoading ? 'Sending…' : '📤 Send Broadcast'}
            </button>
          </form>
        </div>

        {/* SMS */}
        <div className="notif-card">
          <div>
            <h3>💬 SMS Message</h3>
            <p>Send direct SMS to specific phone numbers or all farmers</p>
          </div>
          <form id="sms-form" onSubmit={sendSms} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div className="form-group">
              <label className="form-label">SMS Message *</label>
              <textarea className="form-textarea" value={smsMessage} onChange={e => setSmsMessage(e.target.value)} rows={4}
                placeholder="Keep under 160 characters for a single SMS…" maxLength={480} />
              <span className="form-hint">{smsMessage.length} / 480 characters</span>
            </div>
            <div className="form-group">
              <label className="form-label">Phone Numbers (optional)</label>
              <input className="form-input" value={smsPhones} onChange={e => setSmsPhones(e.target.value)}
                placeholder="+919876543210, +919123456789" />
              <span className="form-hint">Comma-separated. Leave blank to send to all farmers.</span>
            </div>
            <button type="submit" id="send-sms-btn" className="btn btn-primary" disabled={smsLoading}>
              {smsLoading ? 'Sending…' : '📨 Send SMS'}
            </button>
          </form>
        </div>
      </div>
    </AppLayout>
  );
};

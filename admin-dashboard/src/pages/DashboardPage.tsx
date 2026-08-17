import React, { useEffect, useState } from 'react';
import { AppLayout } from '../components/layout/AppLayout';
import { PageHeader } from '../components/layout/PageHeader';
import { dashboardApi } from '../api/dashboard';

interface Stats {
  total_users?: number;
  active_schemes?: number;
  total_announcements?: number;
  pending_applications?: number;
  [key: string]: unknown;
}

const STAT_DEFS = [
  { key: 'total_users', label: 'Registered Farmers', icon: '👥', color: '#16a34a', bg: '#dcfce7' },
  { key: 'active_schemes', label: 'Active Schemes', icon: '📋', color: '#0284c7', bg: '#e0f2fe' },
  { key: 'total_announcements', label: 'Announcements', icon: '📢', color: '#d97706', bg: '#fef3c7' },
  { key: 'pending_applications', label: 'Pending (if any)', icon: '⏳', color: '#8b5cf6', bg: '#f5f3ff' },
];

const Skeleton = () => (
  <div className="stats-grid">
    {[1, 2, 3, 4].map(i => <div key={i} className="skeleton skeleton-card" style={{ height: 130 }} />)}
  </div>
);

export const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    dashboardApi.getStats()
      .then((r) => setStats(r.data))
      .catch(() => setError('Failed to load dashboard stats.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AppLayout>
      <PageHeader
        title="Dashboard"
        subtitle="System overview — live data from the backend"
      />

      {loading && <Skeleton />}
      {error && (
        <div className="card" style={{ padding: 24, color: 'var(--error)', background: 'var(--error-bg)' }}>
          {error}
        </div>
      )}

      {stats && (
        <>
          <div className="stats-grid">
            {STAT_DEFS.map((def, i) => {
              const val = stats[def.key];
              return (
                <div key={def.key} className="stat-card" style={{ animationDelay: `${i * 0.07}s` }}>
                  <div className="stat-icon" style={{ background: def.bg, color: def.color }}>
                    {def.icon}
                  </div>
                  <div>
                    <div className="stat-value">{val != null ? String(val) : '—'}</div>
                    <div className="stat-label">{def.label}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Raw stats card for any extra keys */}
          <div className="card">
            <div className="card-header">
              <span className="card-title">All Stats</span>
            </div>
            <div className="card-body">
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Metric</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(stats).map(([k, v]) => (
                      <tr key={k}>
                        <td className="font-bold" style={{ fontFamily: 'monospace', fontSize: 12.5 }}>{k}</td>
                        <td>{String(v)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </AppLayout>
  );
};

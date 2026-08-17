import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';

const NAV = [
  { label: 'Dashboard',     path: '/',              icon: '📊' },
  { label: 'Users',         path: '/users',         icon: '👥' },
  { label: 'Categories',    path: '/categories',    icon: '🗂️' },
  { label: 'Schemes',       path: '/schemes',       icon: '📋' },
  { label: 'Eligibility',   path: '/eligibility',   icon: '✅' },
  { label: 'Announcements', path: '/announcements', icon: '📢' },
  { label: 'Notifications', path: '/notifications', icon: '🔔' },
  { label: 'Audit Logs',    path: '/audit-logs',    icon: '📝' },
];

export const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const { show } = useToast();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    show('info', 'Logged out successfully');
    navigate('/login');
  };

  const initials = user?.username?.slice(0, 2).toUpperCase() ?? 'AD';

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">🌾</div>
        <div className="sidebar-logo-text">
          <div className="sidebar-logo-title">FarmerApp</div>
          <div className="sidebar-logo-sub">Admin Panel</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        <div className="sidebar-section-label">Management</div>
        {NAV.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) => `sidebar-item${isActive ? ' active' : ''}`}
          >
            <span className="sidebar-item-icon">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* User footer */}
      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-user-avatar">{initials}</div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name truncate">{user?.username ?? 'Admin'}</div>
            <div className="sidebar-user-role">{user?.role ?? 'Administrator'}</div>
          </div>
          <button className="sidebar-logout-btn" title="Logout" onClick={handleLogout}>⏻</button>
        </div>
      </div>
    </aside>
  );
};

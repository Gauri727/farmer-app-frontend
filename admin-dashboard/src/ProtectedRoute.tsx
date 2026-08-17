import React from 'react';
import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

export const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { token, loading } = useAuth();
  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f1117' }}>
        <div style={{ color: '#4ade80', fontSize: 18, fontFamily: 'Inter, sans-serif' }}>Loading…</div>
      </div>
    );
  }
  return token ? <>{children}</> : <Navigate to="/login" replace />;
};

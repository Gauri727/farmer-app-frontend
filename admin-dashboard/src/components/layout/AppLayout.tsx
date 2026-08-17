import React from 'react';
import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';

export const AppLayout: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div className="app-shell">
    <Sidebar />
    <div className="main-area">
      <div className="page-content">{children}</div>
    </div>
  </div>
);

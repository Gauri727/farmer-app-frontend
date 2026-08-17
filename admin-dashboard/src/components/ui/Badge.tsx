import React from 'react';

type Variant = 'active' | 'inactive' | 'banned' | 'draft' | 'published' | 'info' | 'warning';

const MAP: Record<string, Variant> = {
  active: 'active', inactive: 'inactive', banned: 'banned',
  draft: 'draft', published: 'published',
  true: 'active', false: 'inactive',
};

interface Props { value: string | boolean; label?: string; }

export const Badge: React.FC<Props> = ({ value, label }) => {
  const key = String(value).toLowerCase();
  const variant: Variant = MAP[key] ?? 'info';
  const text = label ?? String(value).charAt(0).toUpperCase() + String(value).slice(1);
  return <span className={`badge badge-${variant}`}>{text}</span>;
};

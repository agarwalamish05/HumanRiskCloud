import React, { ReactNode } from 'react';

// Card Component
export const Card = ({ children, className = '' }: { children?: ReactNode; className?: string }) => (
  <div className={`bg-slate-800 border border-slate-700 rounded-xl p-5 shadow-sm ${className}`}>
    {children}
  </div>
);

// Stat Badge
export const RiskBadge = ({ score }: { score: number }) => {
  let colorClass = 'text-green-400';
  if (score > 50) colorClass = 'text-yellow-400';
  if (score > 75) colorClass = 'text-rose-500';

  return <span className={`font-bold ${colorClass}`}>{score}</span>;
};

// Button
export const Button = ({ children, onClick, variant = 'primary', className = '' }: { children?: ReactNode; onClick?: () => void; variant?: 'primary' | 'secondary' | 'danger'; className?: string }) => {
  const baseStyles = "px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-sm";
  const variants = {
    primary: "bg-cyan-600 hover:bg-cyan-500 text-white",
    secondary: "bg-slate-700 hover:bg-slate-600 text-slate-200",
    danger: "bg-rose-600 hover:bg-rose-500 text-white"
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

// Section Header
export const SectionHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-6">
    <h2 className="text-2xl font-bold text-white">{title}</h2>
    {subtitle && <p className="text-slate-400 text-sm mt-1">{subtitle}</p>}
  </div>
);
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = () => {
  const { toastMessage, hideToast } = useAuth();

  if (!toastMessage) return null;

  const { message, type } = toastMessage;

  const typeConfig = {
    success: {
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
      border: 'border-emerald-500/30',
      bg: 'bg-emerald-950/80',
      glow: 'shadow-emerald-950/50',
    },
    error: {
      icon: <AlertCircle className="w-5 h-5 text-rose-400" />,
      border: 'border-rose-500/30',
      bg: 'bg-rose-950/80',
      glow: 'shadow-rose-950/50',
    },
    info: {
      icon: <Info className="w-5 h-5 text-indigo-400" />,
      border: 'border-indigo-500/30',
      bg: 'bg-indigo-950/80',
      glow: 'shadow-indigo-950/50',
    },
  };

  const current = typeConfig[type] || typeConfig.info;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-in max-w-sm w-full">
      <div
        className={`flex items-center gap-3 p-4 rounded-xl border ${current.border} ${current.bg} backdrop-blur-md shadow-xl text-slate-100 transition-all`}
      >
        <div className="shrink-0">{current.icon}</div>
        <p className="text-sm font-medium flex-1">{message}</p>
        <button
          onClick={hideToast}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

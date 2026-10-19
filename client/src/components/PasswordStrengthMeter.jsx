import React from 'react';
import { Check, X } from 'lucide-react';

export const PasswordStrengthMeter = ({ password }) => {
  const requirements = [
    { label: 'At least 6 characters', test: (pwd) => pwd.length >= 6 },
    { label: 'Contains uppercase letter (A-Z)', test: (pwd) => /[A-Z]/.test(pwd) },
    { label: 'Contains number (0-9)', test: (pwd) => /[0-9]/.test(pwd) },
    { label: 'Contains special symbol (!@#$%^&*)', test: (pwd) => /[^A-Za-z0-9]/.test(pwd) },
  ];

  const passedCount = requirements.filter((req) => req.test(password)).length;

  const getStrengthInfo = () => {
    if (!password) return { label: 'Empty', color: 'bg-slate-700', width: '0%', text: 'text-slate-500' };
    if (passedCount <= 1) return { label: 'Weak', color: 'bg-rose-500', width: '25%', text: 'text-rose-400' };
    if (passedCount === 2) return { label: 'Fair', color: 'bg-amber-500', width: '50%', text: 'text-amber-400' };
    if (passedCount === 3) return { label: 'Good', color: 'bg-cyan-500', width: '75%', text: 'text-cyan-400' };
    return { label: 'Strong', color: 'bg-emerald-500', width: '100%', text: 'text-emerald-400' };
  };

  const strength = getStrengthInfo();

  if (!password) return null;

  return (
    <div className="mt-2 space-y-2 p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-xs">
      <div className="flex items-center justify-between font-medium">
        <span className="text-slate-400">Password Strength:</span>
        <span className={`font-semibold ${strength.text}`}>{strength.label}</span>
      </div>

      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
        <div
          className={`h-full ${strength.color} transition-all duration-300`}
          style={{ width: strength.width }}
        />
      </div>

      <div className="grid grid-cols-2 gap-1 pt-1">
        {requirements.map((req, index) => {
          const isPassed = req.test(password);
          return (
            <div
              key={index}
              className={`flex items-center gap-1.5 text-[11px] ${
                isPassed ? 'text-emerald-400' : 'text-slate-500'
              }`}
            >
              {isPassed ? (
                <Check className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
              ) : (
                <X className="w-3.5 h-3.5 shrink-0 text-slate-600" />
              )}
              <span>{req.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

import React from 'react';
import { Shield, Code2, Database, KeyRound, Cpu } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-xl text-slate-400 py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Shield className="w-4 h-4" />
              </div>
              <span className="font-bold text-base text-white">
                Auth<span className="text-gradient">Sphere</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              A production-ready, secure full-stack authentication boilerplate built with React, Tailwind CSS, Node.js, Express, MongoDB, and Google OAuth 2.0.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-2 py-1 text-[11px] rounded-lg bg-slate-900 border border-slate-800 text-indigo-400 font-mono flex items-center gap-1">
                <Code2 className="w-3 h-3" /> React + Vite
              </span>
              <span className="px-2 py-1 text-[11px] rounded-lg bg-slate-900 border border-slate-800 text-cyan-400 font-mono flex items-center gap-1">
                <Cpu className="w-3 h-3" /> Node + Express
              </span>
              <span className="px-2 py-1 text-[11px] rounded-lg bg-slate-900 border border-slate-800 text-emerald-400 font-mono flex items-center gap-1">
                <Database className="w-3 h-3" /> MongoDB + Mongoose
              </span>
              <span className="px-2 py-1 text-[11px] rounded-lg bg-slate-900 border border-slate-800 text-amber-400 font-mono flex items-center gap-1">
                <KeyRound className="w-3 h-3" /> Google OAuth & JWT
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">Security & Docs</h4>
            <ul className="space-y-2 text-xs">
              <li className="hover:text-indigo-400 transition-colors">Bcrypt Password Hashing (10 rounds)</li>
              <li className="hover:text-indigo-400 transition-colors">JWT Bearer Authorization</li>
              <li className="hover:text-indigo-400 transition-colors">Google OAuth 2.0 ID Token Verification</li>
              <li className="hover:text-indigo-400 transition-colors">HttpOnly Cookies & Headers</li>
            </ul>
          </div>

          {/* Endpoints */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">API Endpoints</h4>
            <ul className="space-y-1.5 text-[11px] font-mono text-slate-400">
              <li><span className="text-emerald-400">POST</span> /api/auth/register</li>
              <li><span className="text-emerald-400">POST</span> /api/auth/login</li>
              <li><span className="text-emerald-400">POST</span> /api/auth/google</li>
              <li><span className="text-indigo-400">GET</span> /api/auth/me</li>
              <li><span className="text-amber-400">PUT</span> /api/auth/profile</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} AuthSphere Architecture. Built for secure user onboarding.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              Backend Status: <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Connected
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

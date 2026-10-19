import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  User,
  Mail,
  Shield,
  Key,
  Database,
  Calendar,
  Clock,
  Sparkles,
  Copy,
  Check,
  Code,
  ExternalLink,
  Settings,
  LogOut,
  RefreshCw,
  CheckCircle2,
} from 'lucide-react';
import { jwtDecode } from 'jwt-decode';
import api from '../services/api';

export const Dashboard = () => {
  const { user, token, logout, showToast } = useAuth();
  const [copiedToken, setCopiedToken] = useState(false);
  const [copiedId, setCopiedId] = useState(false);
  const [rawUser, setRawUser] = useState(null);
  const [loadingFresh, setLoadingFresh] = useState(false);

  // Decode JWT payload for developer inspection
  let decodedJwt = null;
  if (token) {
    try {
      decodedJwt = jwtDecode(token);
    } catch {
      decodedJwt = null;
    }
  }

  const fetchFreshProfile = async () => {
    setLoadingFresh(true);
    try {
      const res = await api.get('/auth/me');
      setRawUser(res.data.user);
      showToast('Profile data refreshed from MongoDB', 'info');
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingFresh(false);
    }
  };

  useEffect(() => {
    fetchFreshProfile();
  }, []);

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'token') {
      setCopiedToken(true);
      setTimeout(() => setCopiedToken(false), 2000);
    } else {
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Top Banner */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="flex items-center gap-5">
          <div className="relative">
            <img
              src={user?.avatar || 'https://api.dicebear.com/7.x/initials/svg?seed=User'}
              alt={user?.name}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-indigo-500/50 shadow-xl shadow-indigo-500/10"
              onError={(e) => {
                e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
                  user?.name || 'User'
                )}`;
              }}
            />
            <span
              className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-slate-900 flex items-center justify-center text-[10px] ${
                user?.authType === 'google' ? 'bg-amber-500' : 'bg-indigo-500'
              }`}
              title={user?.authType === 'google' ? 'Google Authenticated' : 'Email/Password'}
            >
              {user?.authType === 'google' ? 'G' : '✓'}
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {user?.name}
              </h1>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide uppercase flex items-center gap-1 ${
                  user?.authType === 'google'
                    ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                    : 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/30'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                {user?.authType === 'google' ? 'Google OAuth 2.0' : 'Local Account'}
              </span>
            </div>
            <p className="text-sm text-slate-400 font-medium flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-500" />
              {user?.email}
            </p>
            <p className="text-xs text-slate-400 italic pt-1">
              "{user?.bio || 'Welcome to my profile!'}"
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 self-stretch md:self-auto">
          <Link
            to="/profile"
            className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <Settings className="w-4 h-4 text-slate-400" />
            Edit Profile
          </Link>
          <button
            onClick={logout}
            className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Metrics & Session Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: User ID */}
        <div className="p-5 rounded-2xl glass-card border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold uppercase tracking-wider">MongoDB ID</span>
            <Database className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-center justify-between bg-slate-950/60 p-2 rounded-xl border border-slate-800">
            <code className="text-xs font-mono text-emerald-400 truncate max-w-[140px]">
              {user?.id || user?._id}
            </code>
            <button
              onClick={() => copyToClipboard(user?.id || user?._id, 'id')}
              className="p-1 text-slate-400 hover:text-white transition"
              title="Copy ID"
            >
              {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Card 2: Auth Provider */}
        <div className="p-5 rounded-2xl glass-card border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold uppercase tracking-wider">Auth Provider</span>
            <Shield className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-lg font-bold text-white capitalize">
            {user?.authType === 'google' ? 'Google OAuth' : 'Email / Bcrypt'}
          </p>
          <span className="text-[11px] text-slate-400 block">Verified & Active</span>
        </div>

        {/* Card 3: Last Login */}
        <div className="p-5 rounded-2xl glass-card border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold uppercase tracking-wider">Last Active</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-sm font-semibold text-white">
            {user?.lastLogin ? new Date(user.lastLogin).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}
          </p>
          <span className="text-[11px] text-slate-400 block">
            {user?.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Today'}
          </span>
        </div>

        {/* Card 4: Member Since */}
        <div className="p-5 rounded-2xl glass-card border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold uppercase tracking-wider">Registered</span>
            <Calendar className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-sm font-semibold text-white">
            {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Today'}
          </p>
          <span className="text-[11px] text-slate-400 block">Role: {user?.role || 'Standard User'}</span>
        </div>
      </div>

      {/* Developer & Security Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* JWT Token Inspector */}
        <div className="p-6 rounded-3xl glass-card border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <Key className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Active JWT Token & Claims</h3>
                <p className="text-[11px] text-slate-400">Stateless bearer token stored in localStorage</p>
              </div>
            </div>
            <button
              onClick={() => copyToClipboard(token, 'token')}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5 transition cursor-pointer"
            >
              {copiedToken ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Token</span>
                </>
              )}
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-xs text-slate-400 font-semibold block mb-1">Raw JWT Bearer:</span>
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 text-[11px] font-mono text-indigo-300 break-all max-h-20 overflow-y-auto">
                {token || 'No token found'}
              </div>
            </div>

            <div>
              <span className="text-xs text-slate-400 font-semibold block mb-1">Decoded Payload Claims:</span>
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 text-xs font-mono space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">id (Subject):</span>
                  <span className="text-emerald-400 font-semibold">{decodedJwt?.id || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">iat (Issued At):</span>
                  <span className="text-slate-300">
                    {decodedJwt?.iat ? new Date(decodedJwt.iat * 1000).toLocaleString() : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">exp (Expires):</span>
                  <span className="text-amber-400">
                    {decodedJwt?.exp ? new Date(decodedJwt.exp * 1000).toLocaleString() : '7 days'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MongoDB Live Document Viewer */}
        <div className="p-6 rounded-3xl glass-card border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Database className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">MongoDB User Document</h3>
                <p className="text-[11px] text-slate-400">Live record query from `users` collection</p>
              </div>
            </div>
            <button
              onClick={fetchFreshProfile}
              disabled={loadingFresh}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
              title="Refresh MongoDB record"
            >
              <RefreshCw className={`w-4 h-4 ${loadingFresh ? 'animate-spin text-emerald-400' : ''}`} />
            </button>
          </div>

          <div className="relative">
            <pre className="p-4 bg-slate-950/90 rounded-2xl border border-slate-800 text-[11px] font-mono text-emerald-300 overflow-x-auto max-h-[190px] overflow-y-auto">
              {JSON.stringify(rawUser || user, null, 2)}
            </pre>
            <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Password field safely excluded from responses
              </span>
              <span className="font-mono text-slate-500">Mongoose Model</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  ShieldCheck,
  Lock,
  Zap,
  Database,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Server,
  Layers,
  Code,
  KeyRound,
  RefreshCw,
} from 'lucide-react';
import api from '../services/api';

export const Home = () => {
  const { user, isAuthenticated } = useAuth();
  const [backendHealth, setBackendHealth] = useState({ status: 'checking', message: '' });
  const [checking, setChecking] = useState(false);

  const checkHealth = async () => {
    setChecking(true);
    try {
      const res = await api.get('/health');
      setBackendHealth({ status: 'online', message: res.data.message || 'Connected' });
    } catch (err) {
      setBackendHealth({ status: 'offline', message: 'Unable to reach backend API' });
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  return (
    <div className="relative overflow-hidden py-12 md:py-20">
      {/* Background Decorative Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-60 right-10 w-[400px] h-[350px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[350px] bg-cyan-600/10 blur-[110px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-medium backdrop-blur-md animate-fade-in shadow-inner">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <span>Production MERN Stack + Google OAuth 2.0</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.15]">
            Secure Authentication <br />
            <span className="text-gradient">Engineered for Scale</span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            A battle-tested full-stack authentication system featuring <strong>React & Tailwind CSS</strong> on the client, with <strong>Node.js, Express, MongoDB</strong>, and verified <strong>Google OAuth 2.0</strong> on the server.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer text-base"
              >
                Go to My Dashboard
                <ArrowRight className="w-5 h-5" />
              </Link>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer text-base"
                >
                  <Sparkles className="w-5 h-5" />
                  Create Free Account
                </Link>
                <Link
                  to="/login"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-medium hover:border-slate-600 transition-all flex items-center justify-center gap-2 cursor-pointer text-base"
                >
                  Sign In
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </Link>
              </>
            )}
          </div>

          {/* Backend Status Live Card */}
          <div className="pt-6 inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs">
            <span className="text-slate-400">Node + MongoDB Backend:</span>
            <div className="flex items-center gap-1.5 font-medium">
              <span
                className={`w-2 h-2 rounded-full ${
                  backendHealth.status === 'online'
                    ? 'bg-emerald-500 shadow-sm shadow-emerald-500'
                    : backendHealth.status === 'offline'
                    ? 'bg-rose-500'
                    : 'bg-amber-500 animate-pulse'
                }`}
              />
              <span
                className={
                  backendHealth.status === 'online'
                    ? 'text-emerald-400'
                    : backendHealth.status === 'offline'
                    ? 'text-rose-400'
                    : 'text-amber-400'
                }
              >
                {backendHealth.status === 'online'
                  ? 'Active & Connected to MongoDB'
                  : backendHealth.status === 'offline'
                  ? 'Connecting...'
                  : 'Checking...'}
              </span>
            </div>
            <button
              onClick={checkHealth}
              disabled={checking}
              className="p-1 rounded text-slate-500 hover:text-slate-300 transition"
              title="Ping Backend"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${checking ? 'animate-spin text-indigo-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Core Capabilities Grid */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Enterprise-Grade Security Architecture
            </h2>
            <p className="text-sm text-slate-400 max-w-xl mx-auto">
              Engineered with modern industry best practices for both local credentials and federated OAuth identity providers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="p-6 rounded-2xl glass-card border border-slate-800/80 space-y-4 hover:border-indigo-500/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                <KeyRound className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Google OAuth 2.0</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Seamless one-click Google Sign-In with server-side ID token verification, automatic account linking, and avatar synchronization.
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-xs text-indigo-400 font-medium">
                <CheckCircle className="w-4 h-4 text-indigo-400" />
                <span>Google Auth Library & Client ID</span>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-2xl glass-card border border-slate-800/80 space-y-4 hover:border-purple-500/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">JWT + Bcrypt Encryption</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Passwords salted and hashed using Bcrypt (10 salt rounds). Sessions secured via stateless JSON Web Tokens sent via Bearer headers and cookies.
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-xs text-purple-400 font-medium">
                <CheckCircle className="w-4 h-4 text-purple-400" />
                <span>HMAC SHA-256 Signature</span>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-2xl glass-card border border-slate-800/80 space-y-4 hover:border-emerald-500/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">MongoDB & Mongoose</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Robust schemas with email indexing, custom validation, pre-save middleware, timestamp tracking, and safe JSON serialization.
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Local & Atlas MongoDB Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Technology Stack Visual Breakdown */}
        <div className="p-8 rounded-3xl glass-card border border-slate-800 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
            <div>
              <h3 className="text-xl font-bold text-white">Full Stack Architecture Map</h3>
              <p className="text-xs text-slate-400 mt-1">End-to-end data flow between React, Express, and MongoDB</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-mono">
                Port 5173 ⟷ Port 5000 ⟷ Port 27017
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                <Code className="w-4 h-4" /> 1. Client Layer
              </div>
              <p className="text-sm font-semibold text-white">React 19 + Tailwind CSS</p>
              <p className="text-xs text-slate-400">
                Responsive UI, custom hooks, AuthContext state, and Axios interceptors.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Server className="w-4 h-4" /> 2. Server Layer
              </div>
              <p className="text-sm font-semibold text-white">Node.js + Express 5</p>
              <p className="text-xs text-slate-400">
                REST API, CORS configuration, JWT middleware, and centralized error handling.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <KeyRound className="w-4 h-4" /> 3. Auth Provider
              </div>
              <p className="text-sm font-semibold text-white">Google OAuth 2.0</p>
              <p className="text-xs text-slate-400">
                Google Identity Services, token verification, and automated profile syncing.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <Database className="w-4 h-4" /> 4. Database Layer
              </div>
              <p className="text-sm font-semibold text-white">MongoDB + Mongoose</p>
              <p className="text-xs text-slate-400">
                NoSQL persistence, unique email indexes, password hashing, and user documents.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Call to Action Card */}
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 border border-indigo-500/30 bg-gradient-to-br from-indigo-950/80 via-slate-900 to-purple-950/70 text-center space-y-6 shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-3">
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
              Ready to experience modern authentication?
            </h3>
            <p className="text-sm sm:text-base text-slate-300">
              Create a new account in seconds, or sign in directly using Google Authentication.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/signup"
              className="px-8 py-3.5 rounded-2xl bg-white text-slate-950 font-bold hover:bg-slate-100 shadow-xl transition-all hover:scale-105 cursor-pointer text-sm"
            >
              Sign Up Now
            </Link>
            <Link
              to="/login"
              className="px-8 py-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-white font-semibold border border-slate-700 transition cursor-pointer text-sm"
            >
              Sign In to Existing Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

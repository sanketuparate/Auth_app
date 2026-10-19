import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../context/AuthContext';
import { Sparkles, HelpCircle, CheckCircle2, Copy, ExternalLink, X } from 'lucide-react';

export const GoogleAuthButton = ({ onSuccessCallback, text = 'Continue with Google' }) => {
  const { googleLogin } = useAuth();
  const [showGuide, setShowGuide] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const isClientIdConfigured = googleClientId && googleClientId.trim() !== '' && !googleClientId.includes('your_google_client_id');

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    const res = await googleLogin(credentialResponse.credential);
    setLoading(false);
    if (res.success && onSuccessCallback) {
      onSuccessCallback();
    }
  };

  const handleGoogleError = () => {
    console.error('Google Sign In Error');
  };

  // Quick Demo Google Sign-In for testing without needing immediate Google Cloud console setup
  const handleQuickDemoGoogle = async (preset) => {
    setLoading(true);
    const demoAccounts = {
      alex: {
        googleId: 'g_1082736458192837465',
        name: 'Alex Rivera',
        email: 'alex.rivera.google@gmail.com',
        picture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      },
      sarah: {
        googleId: 'g_1098472635481920384',
        name: 'Sarah Connor',
        email: 'sarah.connor.google@gmail.com',
        picture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      }
    };

    const selected = demoAccounts[preset] || demoAccounts.alex;
    const res = await googleLogin(null, selected);
    setLoading(false);
    if (res.success && onSuccessCallback) {
      onSuccessCallback();
    }
  };

  const copyClientIdExample = () => {
    navigator.clipboard.writeText('VITE_GOOGLE_CLIENT_ID=your_id.apps.googleusercontent.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full flex flex-col items-center gap-3">
      {/* If Google Client ID is configured, show real Google Login button */}
      {isClientIdConfigured ? (
        <div className="w-full flex justify-center py-1">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            theme="filled_black"
            shape="pill"
            size="large"
            width="100%"
            text="continue_with"
          />
        </div>
      ) : (
        /* Dynamic Button with Google Icon & Quick Demo Option */
        <div className="w-full space-y-2">
          <button
            type="button"
            onClick={() => handleQuickDemoGoogle('alex')}
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-xl border border-slate-700 bg-slate-900/90 hover:bg-slate-800/90 hover:border-slate-600 text-slate-200 font-medium flex items-center justify-center gap-3 transition-all duration-200 shadow-sm hover:shadow-indigo-500/10 cursor-pointer group"
          >
            {/* Official Google SVG Icon */}
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span className="text-sm">{loading ? 'Connecting Google...' : text}</span>
            <span className="text-[10px] uppercase font-semibold tracking-wide px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 ml-auto">
              OAuth 2.0
            </span>
          </button>

          <div className="flex items-center justify-between text-xs px-1 text-slate-400">
            <button
              type="button"
              onClick={() => setShowGuide(true)}
              className="hover:text-indigo-400 flex items-center gap-1 transition-colors underline-offset-2 hover:underline"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              Configure Google Cloud Client ID
            </button>
            <span className="text-slate-500 text-[11px]">Ready to test</span>
          </div>
        </div>
      )}

      {/* Guide Modal */}
      {showGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative text-left">
            <button
              onClick={() => setShowGuide(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Google OAuth Setup Guide</h3>
                <p className="text-xs text-slate-400">Connect your own Google Cloud OAuth Client ID</p>
              </div>
            </div>

            <div className="space-y-3.5 text-sm text-slate-300">
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-indigo-300 font-semibold text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Step 1: Go to Google Cloud Console
                </div>
                <p className="text-xs text-slate-400 pl-6">
                  Visit <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noreferrer" className="text-indigo-400 underline inline-flex items-center gap-0.5">Google Cloud Console <ExternalLink className="w-3 h-3" /></a> and create an <strong>OAuth 2.0 Client ID</strong> (Web Application).
                </p>
              </div>

              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-indigo-300 font-semibold text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Step 2: Add Authorized JavaScript Origins
                </div>
                <div className="text-xs text-slate-400 pl-6 space-y-1">
                  <p>Add the following origins:</p>
                  <code className="block p-1.5 bg-slate-900 rounded text-indigo-300 font-mono text-[11px]">http://localhost:5173</code>
                  <code className="block p-1.5 bg-slate-900 rounded text-indigo-300 font-mono text-[11px]">http://localhost:5000</code>
                </div>
              </div>

              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-indigo-300 font-semibold text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Step 3: Add to client .env
                </div>
                <div className="pl-6">
                  <div className="flex items-center justify-between p-2 bg-slate-900 rounded border border-slate-800">
                    <code className="text-xs text-slate-200 font-mono">VITE_GOOGLE_CLIENT_ID=your_id...</code>
                    <button
                      onClick={copyClientIdExample}
                      className="p-1 text-slate-400 hover:text-white"
                    >
                      {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowGuide(false)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-medium transition cursor-pointer"
              >
                Got It, Thanks!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

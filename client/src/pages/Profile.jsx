import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { PasswordStrengthMeter } from '../components/PasswordStrengthMeter';
import {
  User,
  Mail,
  Shield,
  Lock,
  Camera,
  Check,
  AlertCircle,
  KeyRound,
  Eye,
  EyeOff,
  Sparkles,
  Info,
} from 'lucide-react';

export const Profile = () => {
  const { user, updateProfile, changePassword, showToast } = useAuth();

  // Profile Edit State
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [savingProfile, setSavingProfile] = useState(false);

  // Password Change State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  // Sample avatar presets
  const avatarPresets = [
    `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name || 'User')}&backgroundColor=4f46e5`,
    `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name || 'Bot')}&backgroundColor=06b6d4`,
    `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(name || 'Hero')}&backgroundColor=7c3aed`,
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name || 'Dev')}&backgroundColor=ec4899`,
    `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`,
    `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80`,
  ];

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('Name cannot be empty', 'error');
      return;
    }
    setSavingProfile(true);
    await updateProfile({ name: name.trim(), bio: bio.trim(), avatar });
    setSavingProfile(false);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError('');

    if (newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    setSavingPassword(true);
    const res = await changePassword(currentPassword, newPassword);
    setSavingPassword(false);

    if (res.success) {
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      setPasswordError(res.message);
    }
  };

  return (
    <div className="py-8 sm:py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">Account & Security</h1>
        <p className="text-sm text-slate-400">
          Manage your personal details, custom avatar, and authentication credentials
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Avatar & Overview */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl glass-card border border-slate-800 space-y-4 text-center">
            <div className="relative inline-block mx-auto">
              <img
                src={avatar || 'https://api.dicebear.com/7.x/initials/svg?seed=User'}
                alt={name}
                className="w-24 h-24 rounded-3xl object-cover border-2 border-indigo-500 shadow-xl"
                onError={(e) => {
                  e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=User`;
                }}
              />
              <div className="absolute -bottom-1 -right-1 p-1.5 bg-indigo-600 rounded-xl text-white border-2 border-slate-900">
                <Camera className="w-3.5 h-3.5" />
              </div>
            </div>

            <div>
              <h3 className="font-bold text-base text-white">{user?.name}</h3>
              <p className="text-xs text-slate-400 truncate">{user?.email}</p>
            </div>

            <div className="pt-2">
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                  user?.authType === 'google'
                    ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                    : 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/30'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                {user?.authType === 'google' ? 'Google OAuth Account' : 'Standard Password Account'}
              </span>
            </div>
          </div>

          {/* Quick Avatar Presets */}
          <div className="p-5 rounded-3xl glass-card border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Avatar Presets
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {avatarPresets.map((presetUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setAvatar(presetUrl)}
                  className={`p-1 rounded-xl border transition overflow-hidden cursor-pointer ${
                    avatar === presetUrl
                      ? 'border-indigo-500 bg-indigo-500/20 ring-2 ring-indigo-500/40'
                      : 'border-slate-800 hover:border-slate-700 bg-slate-900'
                  }`}
                >
                  <img src={presetUrl} alt="Avatar option" className="w-full h-12 rounded-lg object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Forms */}
        <div className="md:col-span-2 space-y-6">
          {/* Profile Details Form */}
          <div className="p-6 sm:p-8 rounded-3xl glass-card border border-slate-800 space-y-5">
            <div className="flex items-center gap-2.5 border-b border-slate-800 pb-4">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Personal Profile</h3>
                <p className="text-xs text-slate-400">Update your public display name and bio</p>
              </div>
            </div>

            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-slate-100 text-sm focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Email Address</label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-slate-500 text-sm cursor-not-allowed"
                />
                <p className="text-[11px] text-slate-500">Email address cannot be changed</p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Custom Avatar URL</label>
                <input
                  type="url"
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-slate-100 text-sm focus:outline-none placeholder:text-slate-600"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows="3"
                  maxLength="200"
                  className="w-full px-3.5 py-2.5 rounded-xl glass-input text-slate-100 text-sm focus:outline-none resize-none"
                />
                <div className="text-right text-[11px] text-slate-500">{bio.length}/200</div>
              </div>

              <button
                type="submit"
                disabled={savingProfile}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition cursor-pointer shadow-lg shadow-indigo-600/20 disabled:opacity-50"
              >
                {savingProfile ? 'Saving...' : 'Save Profile Changes'}
              </button>
            </form>
          </div>

          {/* Password Section */}
          <div className="p-6 sm:p-8 rounded-3xl glass-card border border-slate-800 space-y-5">
            <div className="flex items-center gap-2.5 border-b border-slate-800 pb-4">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
                <KeyRound className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Security & Password</h3>
                <p className="text-xs text-slate-400">Change your account password</p>
              </div>
            </div>

            {user?.authType === 'google' ? (
              <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-200/90 space-y-1">
                  <p className="font-semibold text-amber-300">Managed via Google OAuth</p>
                  <p>
                    Your account authenticates directly with Google. You do not need a password, and password management is securely handled by your Google Account.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                {passwordError && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{passwordError}</span>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Current Password</label>
                  <div className="relative">
                    <input
                      type={showCurrent ? 'text' : 'password'}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                      className="w-full px-3.5 pr-10 py-2.5 rounded-xl glass-input text-slate-100 text-sm focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrent(!showCurrent)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 cursor-pointer"
                    >
                      {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">New Password</label>
                  <div className="relative">
                    <input
                      type={showNew ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                      className="w-full px-3.5 pr-10 py-2.5 rounded-xl glass-input text-slate-100 text-sm focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew(!showNew)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 cursor-pointer"
                    >
                      {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <PasswordStrengthMeter password={newPassword} />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Confirm New Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-slate-100 text-sm focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={savingPassword}
                  className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition cursor-pointer shadow-lg shadow-purple-600/20 disabled:opacity-50"
                >
                  {savingPassword ? 'Updating...' : 'Update Password'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

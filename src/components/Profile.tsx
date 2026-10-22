import { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Mail, Building, MapPin, Calendar, Save, Check } from 'lucide-react';

export default function Profile() {
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Jamie Dawson',
    email: 'jamie.dawson@pulseboard.io',
    role: 'Admin',
    company: 'PulseBoard Inc.',
    location: 'San Francisco, CA',
    joined: 'March 2023',
    bio: 'Product manager focused on analytics and growth. Building better dashboards for SaaS teams.',
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl border border-slate-200"
    >
      {/* Header */}
      <div className="p-5 lg:p-6 border-b border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center">
              <span className="text-xl font-bold text-white">JD</span>
            </div>
            <button
              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm hover:bg-slate-50 transition-colors"
              aria-label="Change profile photo"
            >
              <Camera size={12} className="text-slate-500" />
            </button>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">{profile.name}</h2>
            <p className="text-sm text-slate-500">{profile.role} · {profile.company}</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="p-5 lg:p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-1.5">
              <Mail size={14} className="text-slate-400" />
              Full Name
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-900 focus:border-violet-300 focus:ring-2 focus:ring-violet-100 outline-none transition-all"
            />
          </div>
          <div>
            <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-1.5">
              <Mail size={14} className="text-slate-400" />
              Email
            </label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-900 focus:border-violet-300 focus:ring-2 focus:ring-violet-100 outline-none transition-all"
            />
          </div>
          <div>
            <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-1.5">
              <Building size={14} className="text-slate-400" />
              Company
            </label>
            <input
              type="text"
              value={profile.company}
              onChange={(e) => setProfile({ ...profile, company: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-900 focus:border-violet-300 focus:ring-2 focus:ring-violet-100 outline-none transition-all"
            />
          </div>
          <div>
            <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-1.5">
              <MapPin size={14} className="text-slate-400" />
              Location
            </label>
            <input
              type="text"
              value={profile.location}
              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-900 focus:border-violet-300 focus:ring-2 focus:ring-violet-100 outline-none transition-all"
            />
          </div>
        </div>

        <div>
          <label className="flex items-center gap-1.5 text-sm font-medium text-slate-700 mb-1.5">
            <Calendar size={14} className="text-slate-400" />
            Bio
          </label>
          <textarea
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-900 focus:border-violet-300 focus:ring-2 focus:ring-violet-100 outline-none transition-all resize-none"
          />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <p className="text-xs text-slate-400">
            Member since {profile.joined}
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
              ${saved ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-violet-600 text-white hover:bg-violet-700'}`}
          >
            {saved ? <Check size={14} /> : <Save size={14} />}
            {saved ? 'Saved!' : 'Save changes'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

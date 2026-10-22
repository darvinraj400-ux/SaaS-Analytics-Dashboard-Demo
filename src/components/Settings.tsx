import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Bell, Shield, Palette, Globe, Check } from 'lucide-react';

interface SettingsSection {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const sections: SettingsSection[] = [
  { id: 'general', label: 'General', icon: <Globe size={16} /> },
  { id: 'notifications', label: 'Notifications', icon: <Bell size={16} /> },
  { id: 'security', label: 'Security', icon: <Shield size={16} /> },
  { id: 'appearance', label: 'Appearance', icon: <Palette size={16} /> },
];

export default function Settings() {
  const [activeSection, setActiveSection] = useState('general');
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState({
    companyName: 'PulseBoard Inc.',
    timezone: 'UTC-5 (Eastern)',
    language: 'English',
    emailNotifications: true,
    pushNotifications: false,
    weeklyDigest: true,
    twoFactor: false,
    sessionTimeout: '30',
    density: 'comfortable',
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const Toggle = ({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) => (
    <button
      onClick={onChange}
      className="flex items-center gap-3 w-full"
      role="switch"
      aria-checked={checked}
      aria-label={label}
    >
      <div className={`w-10 h-6 rounded-full transition-colors duration-200 relative ${checked ? 'bg-violet-600' : 'bg-slate-200'}`}>
        <motion.div
          animate={{ x: checked ? 18 : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm"
        />
      </div>
    </button>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl border border-slate-200"
    >
      <div className="flex flex-col md:flex-row">
        {/* Section nav */}
        <div className="md:w-48 border-b md:border-b-0 md:border-r border-slate-100 p-3">
          <nav className="flex md:flex-col gap-1 overflow-x-auto">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-colors
                  ${activeSection === section.id ? 'bg-violet-50 text-violet-700 font-medium' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                {section.icon}
                {section.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 p-5 lg:p-6">
          {activeSection === 'general' && (
            <div className="space-y-5">
              <h3 className="text-base font-semibold text-slate-900">General Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Company Name</label>
                  <input
                    type="text"
                    value={settings.companyName}
                    onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                    className="w-full max-w-sm px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-900 focus:border-violet-300 focus:ring-2 focus:ring-violet-100 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Timezone</label>
                  <select
                    value={settings.timezone}
                    onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                    className="w-full max-w-sm px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-900 focus:border-violet-300 focus:ring-2 focus:ring-violet-100 outline-none transition-all bg-white"
                  >
                    <option>UTC-5 (Eastern)</option>
                    <option>UTC-6 (Central)</option>
                    <option>UTC-7 (Mountain)</option>
                    <option>UTC-8 (Pacific)</option>
                    <option>UTC+0 (London)</option>
                    <option>UTC+1 (Berlin)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Language</label>
                  <select
                    value={settings.language}
                    onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                    className="w-full max-w-sm px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-900 focus:border-violet-300 focus:ring-2 focus:ring-violet-100 outline-none transition-all bg-white"
                  >
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="space-y-5">
              <h3 className="text-base font-semibold text-slate-900">Notification Preferences</h3>
              <div className="space-y-4">
                {[
                  { key: 'emailNotifications', label: 'Email notifications', desc: 'Receive alerts via email' },
                  { key: 'pushNotifications', label: 'Push notifications', desc: 'Browser push notifications' },
                  { key: 'weeklyDigest', label: 'Weekly digest', desc: 'Summary email every Monday' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-medium text-slate-900">{item.label}</p>
                      <p className="text-xs text-slate-500">{item.desc}</p>
                    </div>
                    <Toggle
                      checked={settings[item.key as keyof typeof settings] as boolean}
                      onChange={() => setSettings({ ...settings, [item.key]: !settings[item.key as keyof typeof settings] })}
                      label={item.label}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'security' && (
            <div className="space-y-5">
              <h3 className="text-base font-semibold text-slate-900">Security</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium text-slate-900">Two-factor authentication</p>
                    <p className="text-xs text-slate-500">Add an extra layer of security</p>
                  </div>
                  <Toggle
                    checked={settings.twoFactor}
                    onChange={() => setSettings({ ...settings, twoFactor: !settings.twoFactor })}
                    label="Two-factor authentication"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Session timeout (minutes)</label>
                  <input
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) => setSettings({ ...settings, sessionTimeout: e.target.value })}
                    className="w-24 px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-900 focus:border-violet-300 focus:ring-2 focus:ring-violet-100 outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          {activeSection === 'appearance' && (
            <div className="space-y-5">
              <h3 className="text-base font-semibold text-slate-900">Appearance</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Interface Density</label>
                  <div className="flex gap-2">
                    {['compact', 'comfortable', 'spacious'].map((d) => (
                      <button
                        key={d}
                        onClick={() => setSettings({ ...settings, density: d })}
                        className={`px-4 py-2 rounded-lg text-sm border transition-colors capitalize
                          ${settings.density === d ? 'bg-violet-50 border-violet-200 text-violet-700 font-medium' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Save button */}
          <div className="mt-6 pt-4 border-t border-slate-100">
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
      </div>
    </motion.div>
  );
}

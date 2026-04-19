import { CreditCard, Download, Trash2, Shield, User, Smartphone, Globe } from 'lucide-react';
import { motion } from 'motion/react';

export default function Settings() {
  const exportFormats = [
    { label: 'JSON Data', format: '.json', description: 'Complete machine-readable recipe structure.' },
    { label: 'Markdown', format: '.md', description: 'Clean formatted text, perfect for Obsidian or Notion.' },
    { label: 'Plain Text', format: '.txt', description: 'Utilitarian format for simple copy-pasting.' }
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-10 pb-20">
      <div className="space-y-1">
        <h1 className="text-3xl md:text-4xl font-bold font-display">Account Settings</h1>
        <p className="text-slate-500">Manage your vault, preferences, and data portability.</p>
      </div>

      <div className="space-y-6">
        {/* Profile Section */}
        <section className="card space-y-6">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
               <User className="w-5 h-5 text-primary" />
             </div>
             <h3 className="font-bold text-lg">Your Profile</h3>
          </div>
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-slate-200 rounded-3xl overflow-hidden flex items-center justify-center text-slate-400 font-display font-bold text-2xl">
              HM
            </div>
            <div className="space-y-1">
              <p className="font-bold text-slate-900">Your Name</p>
              <p className="text-sm text-slate-500">your@email.com</p>
              <div className="flex gap-2 mt-2">
                <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase">Google Account</span>
              </div>
            </div>
          </div>
        </section>

        {/* Export Data */}
        <section className="card space-y-6">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
               <Download className="w-5 h-5 text-primary" />
             </div>
             <div className="flex-1">
                <h3 className="font-bold text-lg">Export Library</h3>
                <p className="text-xs text-slate-400 font-medium">Download your entire collection for your own archives.</p>
             </div>
          </div>
          
          <div className="grid sm:grid-cols-3 gap-4 pt-2">
            {exportFormats.map(item => (
              <button 
                key={item.format}
                className="card p-4 hover:border-primary/30 transition-all text-left group"
              >
                <p className="font-bold text-slate-900 group-hover:text-primary transition-colors">{item.label}</p>
                <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-bold">{item.format}</p>
              </button>
            ))}
          </div>
        </section>

        {/* Preferences */}
        <section className="card space-y-6">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
               <Smartphone className="w-5 h-5 text-primary" />
             </div>
             <h3 className="font-bold text-lg">App Preferences</h3>
          </div>
          
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
               <div className="space-y-0.5">
                  <p className="font-bold text-sm text-slate-900">Theme Preference</p>
                  <p className="text-xs text-slate-400">Match your system appearance.</p>
               </div>
               <select className="bg-white border border-slate-200 rounded-xl text-xs font-bold px-4 py-2 uppercase tracking-wide">
                 <option>System Default</option>
                 <option>Light Warm</option>
                 <option>Midnight</option>
               </select>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
               <div className="space-y-0.5">
                  <p className="font-bold text-sm text-slate-900">Default Source</p>
                  <p className="text-xs text-slate-400">Default platform for new captures.</p>
               </div>
               <select className="bg-white border border-slate-200 rounded-xl text-xs font-bold px-4 py-2 uppercase tracking-wide">
                 <option>ChatGPT</option>
                 <option>Gemini</option>
                 <option>Claude</option>
               </select>
            </div>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="card border-red-100 bg-red-50/10 space-y-6">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center text-red-500">
               <Trash2 className="w-5 h-5" />
             </div>
             <h3 className="font-bold text-lg text-slate-900">Danger Zone</h3>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border border-red-100 rounded-2xl bg-white/50">
             <div className="space-y-0.5">
                <p className="font-bold text-sm text-slate-900">Purge Library</p>
                <p className="text-xs text-slate-400">Irreversibly delete all recipes from your vault.</p>
             </div>
             <button className="text-red-500 font-bold text-xs uppercase tracking-widest hover:underline px-4 py-2">
               Execute Purge
             </button>
          </div>
        </section>
      </div>
    </div>
  );
}

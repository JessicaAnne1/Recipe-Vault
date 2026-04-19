import React, { useState } from 'react';
import { ChefHat, Mail, ArrowRight, Lock, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

export default function SignIn() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const navigate = useNavigate();

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth
    navigate('/capture');
  };

  const benefits = [
    "Cloud sync across devices",
    "Preserve original AI text",
    "Export to multiple formats",
    "Smart searchable library"
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF9] flex overflow-hidden">
      {/* Visual Panel (Desktop) */}
      <div className="hidden lg:flex flex-1 bg-primary relative p-20 flex-col justify-between overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-saffron/20 rounded-full blur-2xl -ml-32 -mb-32" />
        
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg">
            <ChefHat className="text-primary w-7 h-7" />
          </div>
          <span className="font-display font-bold text-3xl tracking-tight text-white">Recipe Vault</span>
        </div>

        <div className="relative z-10 space-y-10">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl font-display font-bold text-white leading-tight max-w-xl"
          >
            Your recipes, structured and organized forever.
          </motion.h2>

          <div className="space-y-4">
            {benefits.map((benefit, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i }}
                className="flex items-center gap-3 text-white/90 font-medium"
              >
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                {benefit}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-white/50 text-sm font-medium">
          © 2026 Recipe Vault MVP. All rights reserved.
        </div>
      </div>

      {/* Auth Form Panel */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 bg-white">
        <div className="w-full max-w-md space-y-10">
          <div className="text-center lg:text-left space-y-2">
            <div className="lg:hidden flex items-center justify-center gap-2 mb-6">
              <ChefHat className="text-primary w-8 h-8" />
              <span className="font-display font-bold text-2xl tracking-tight text-slate-900">Recipe Vault</span>
            </div>
            <h1 className="text-3xl font-bold font-display text-slate-950">
              {mode === 'signin' ? 'Welcome Back' : 'Get Started'}
            </h1>
            <p className="text-slate-500">
              {mode === 'signin' ? 'Unlock your structured culinary library.' : 'Start turning your AI chats into a recipe legacy.'}
            </p>
          </div>

          <div className="space-y-6">
            <button className="btn-secondary w-full py-4 text-lg bg-white border-2 border-slate-100 hover:border-slate-200 transition-all flex items-center justify-center gap-3 shadow-sm active:scale-[0.98]">
              <img src="https://www.google.com/favicon.ico" className="w-5 h-5 grayscale opacity-70" alt="Google" />
              Continue with Google
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase font-bold tracking-widest">
                <span className="bg-white px-4 text-slate-400">Or email</span>
              </div>
            </div>

            <form onSubmit={handleAuth} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-tight">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="input-field pl-12 h-14"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-tight">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    className="input-field pl-12 h-14"
                  />
                </div>
              </div>
              
              <button type="submit" className="btn-primary w-full py-4 text-lg mt-2">
                {mode === 'signin' ? 'Access Vault' : 'Create Vault'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </form>
          </div>

          <p className="text-center text-slate-500 text-sm">
            {mode === 'signin' ? "Not using Recipe Vault yet? " : "Already have an account? "}
            <button 
              onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
              className="text-primary font-bold hover:underline"
            >
              {mode === 'signin' ? 'Sign up for free' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

import { useNavigate } from 'react-router-dom';
import { ChefHat, ArrowRight, Sparkles, Database, Search } from 'lucide-react';
import { motion } from 'motion/react';

const steps = [
  {
    title: 'Paste raw AI text',
    description: 'Copy and paste messy recipe text from ChatGPT, Claude, or Gemini.',
    icon: Sparkles
  },
  {
    title: 'Instantly structure',
    description: 'Our AI engine parses ingredients and steps into a clean, durable format.',
    icon: Database
  },
  {
    title: 'Retrieve later',
    description: 'Find any recipe by keyword, ingredient, or tag in seconds.',
    icon: Search
  }
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="bg-bg min-h-screen">
      {/* Navbar */}
      <nav className="max-w-7xl mx-auto px-4 py-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <ChefHat className="text-white w-6 h-6" />
          </div>
          <span className="font-display font-bold text-2xl tracking-tight text-ink">Recipe Vault</span>
        </div>
        <button 
          onClick={() => navigate('/signin')}
          className="font-medium text-slate-600 hover:text-primary transition-colors"
        >
          Sign In
        </button>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 md:py-32 flex flex-col items-center text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
           className="space-y-6 max-w-3xl"
        >
          <span className="badge-ai badge !px-4 !py-1.5 !rounded-full !text-sm">
            MVP Is Here
          </span>
          <h1 className="text-5xl md:text-7xl font-display font-semibold text-ink leading-[1.1] tracking-tight">
            Turn AI Chat output into your <span className="text-primary italic">Durable Library</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Stop losing great recipes in endless chat threads. Paste messy AI text, clean it up instantly, and build your structured culinary treasure vault.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button 
              onClick={() => navigate('/capture')}
              className="btn-primary text-lg px-8 py-4 w-full sm:w-auto group"
            >
              Start Capturing <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => navigate('/library')}
              className="btn-secondary text-lg px-8 py-4 w-full sm:w-auto"
            >
              View Library
            </button>
          </div>
        </motion.div>
      </section>

      {/* How it works */}
      <section className="bg-white py-24 border-y border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-ink">How it works</h2>
            <p className="text-slate-500">From messy chat output to structured kitchen knowledge.</p>
          </div>
          <div className="grid md:grid-row lg:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div 
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card group hover:border-primary/30 transition-all"
                >
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                    <Icon className="w-6 h-6 text-slate-400 group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Social Proof Strip */}
      <section className="py-12 bg-bg">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-around gap-8 opacity-50 grayscale">
          <div className="text-center">
            <div className="text-2xl font-display font-bold text-ink">100%</div>
            <div className="text-xs uppercase font-bold tracking-widest text-slate-500">Free to Start</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">AI Driven</div>
            <div className="text-xs uppercase font-bold tracking-widest text-slate-500">Model agnostic</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">Export</div>
            <div className="text-xs uppercase font-bold tracking-widest text-slate-500">JSON & Markdown</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100 text-center">
        <p className="text-slate-400 text-sm">© 2026 Recipe Vault. Built for the AI-First Home Cook.</p>
      </footer>
    </div>
  );
}

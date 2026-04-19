import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ChefHat, Library, PlusCircle, Settings, LogOut } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: 'Capture', href: '/capture', icon: PlusCircle },
    { label: 'Library', href: '/library', icon: Library },
    { label: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <header className="md:hidden flex items-center justify-between p-4 border-bottom bg-white sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <ChefHat className="text-white w-5 h-5" />
          </div>
          <span className="font-display font-bold text-xl">Recipe Vault</span>
        </Link>
      </header>

      {/* Sidebar Navigation (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 border-r border-border bg-white sticky top-0 h-screen p-6">
        <Link to="/" className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <ChefHat className="text-white w-6 h-6" />
          </div>
          <span className="font-display font-bold text-2xl tracking-tight text-ink">Recipe Vault</span>
        </Link>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition-all group",
                  isActive 
                    ? "bg-primary text-white shadow-md shadow-primary/20" 
                    : "text-slate-600 hover:bg-slate-100"
                )}
              >
                <Icon className={cn("w-5 h-5", isActive ? "text-white" : "text-slate-400 group-hover:text-primary transition-colors")} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="pt-6 border-t border-slate-200">
          <button className="flex items-center gap-3 px-4 py-3 rounded-2xl font-medium text-slate-600 hover:bg-slate-100 w-full text-left transition-all group">
            <LogOut className="w-5 h-5 text-slate-400 group-hover:text-red-500 transition-colors" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-bg">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto w-full p-4 md:p-10">
            <Outlet />
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden flex items-center justify-around p-3 border-t bg-white/80 backdrop-blur-md sticky bottom-0 z-50">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all",
                isActive ? "text-primary" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <Icon className={cn("w-6 h-6", isActive ? "fill-primary/10" : "")} />
              <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Filter, Tag, Calendar, UtensilsCrossed } from 'lucide-react';
import { RecipeCardSummary } from '../types';
import { cn, formatDate } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function Library() {
  const [recipes, setRecipes] = useState<RecipeCardSummary[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = () => {
      // Mock loading from storage
      const stored = localStorage.getItem('my_recipes');
      if (stored) {
        setRecipes(JSON.parse(stored));
      }
      setIsLoading(false);
    };
    fetchRecipes();
  }, []);

  const allTags = Array.from(new Set(recipes.flatMap(r => r.tags || []))) as string[];

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         recipe.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => (recipe.tags || []).includes(tag));
    return matchesSearch && matchesTags;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl md:text-4xl font-semibold font-display text-ink">Recipe Library</h1>
          <p className="text-slate-500">Your structured AI recipe collection.</p>
        </div>
        <button 
          onClick={() => navigate('/capture')}
          className="btn-primary"
        >
          <Plus className="w-5 h-5" />
          New Capture
        </button>
      </div>

      {/* Search & Filter */}
      <div className="space-y-4">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, ingredient, or tags..."
            className="input-field pl-12 h-14 text-lg"
          />
        </div>

        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all border",
                  selectedTags.includes(tag)
                    ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
                    : "bg-white text-slate-500 border-slate-200 hover:border-slate-400"
                )}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Library Grid */}
      {isLoading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="card h-64 animate-pulse bg-slate-100/50" />
          ))}
        </div>
      ) : filteredRecipes.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredRecipes.map((recipe, index) => (
              <motion.div
                layout
                key={recipe.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => navigate(`/recipe/${recipe.id}`)}
                className="card group cursor-pointer hover:border-primary/30 transition-all flex flex-col"
              >
                <div className="flex-1 space-y-4">
                  <div className="flex items-start justify-between">
                    <span className="badge">
                      {recipe.category || 'Recipe'}
                    </span>
                    <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                      <Calendar className="w-3 h-3" />
                      {formatDate(recipe.updatedAt as string)}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-xl font-display font-semibold text-ink group-hover:text-primary transition-colors line-clamp-2">
                      {recipe.title}
                    </h3>
                    <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed h-10">
                      {recipe.summary}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {(recipe.tags || []).slice(0, 3).map(tag => (
                      <span key={tag} className="badge !px-2 !py-0.5 !text-[9px]">
                        {tag}
                      </span>
                    ))}
                    {(recipe.tags || []).length > 3 && (
                      <span className="text-[10px] font-bold text-slate-300 uppercase">+{(recipe.tags || []).length - 3}</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="card text-center py-20 flex flex-col items-center space-y-4 border-dashed bg-slate-50/50">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center border border-slate-100 shadow-sm">
            <UtensilsCrossed className="w-8 h-8 text-slate-200" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold">No recipes found</h3>
            <p className="text-slate-400 max-w-sm mx-auto">
              {searchQuery ? `We couldn't find any recipes matching "${searchQuery}".` : "Your recipe vault is currently empty. Start by capturing your first AI-generated recipe."}
            </p>
          </div>
          <button 
            onClick={() => { setSearchQuery(''); setSelectedTags([]); navigate('/capture'); }}
            className="btn-primary"
          >
            {searchQuery ? "Clear Search" : "Capture First Recipe"}
          </button>
        </div>
      )}
    </div>
  );
}

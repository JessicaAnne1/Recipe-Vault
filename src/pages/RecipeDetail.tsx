import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Edit2, Share2, Users, Flame, Clock, Printer, ChefHat, CheckCircle2 } from 'lucide-react';
import { Recipe } from '../types';
import { cn, formatDate } from '../lib/utils';
import { motion } from 'motion/react';

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [activeTab, setActiveTab] = useState<'ingredients' | 'steps'>('ingredients');

  useEffect(() => {
    // Mock loading from storage
    const stored = localStorage.getItem('my_recipes');
    if (stored) {
      const all = JSON.parse(stored);
      const found = all.find((r: Recipe) => r.id === id);
      if (found) {
        setRecipe(found);
      } else {
        navigate('/library');
      }
    } else {
      navigate('/library');
    }
  }, [id, navigate]);

  if (!recipe) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <button 
          onClick={() => navigate('/library')}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors bg-white px-4 py-2 rounded-xl border border-slate-100 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Library
        </button>
        <div className="flex gap-2">
          <button className="btn-secondary px-4 py-2 text-sm">
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
          <button 
            onClick={() => navigate(`/recipe/${id}/edit`)}
            className="btn-primary px-4 py-2 text-sm"
          >
            <Edit2 className="w-4 h-4" />
            <span className="hidden sm:inline">Edit Recipe</span>
          </button>
        </div>
      </div>

      {/* Recipe Hero */}
      <div className="card overflow-hidden p-0 rounded-[32px]">
        <div className="p-8 border-b border-border bg-gradient-to-br from-white to-[#FFF9F8]">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="badge-ai badge">
                Parsed from {recipe.sourcePlatform || 'AI'}
              </span>
              <span className="badge">
                {recipe.category || 'Recipe'}
              </span>
              <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                {recipe.tags.map(tag => (
                  <span key={tag} className="badge">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-display text-ink uppercase tracking-tight">
              {recipe.title}
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed max-w-3xl">
              {recipe.summary}
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-100 border-b border-border">
          <div className="p-6 text-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-1">Servings</p>
            <p className="text-lg font-bold text-ink">{recipe.servings || 'N/A'}</p>
          </div>
          <div className="p-6 text-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-1">Dietary</p>
            <p className="text-lg font-bold text-ink truncate px-4">{recipe.dietaryFlags?.join(', ') || 'None'}</p>
          </div>
          <div className="p-6 text-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-1">Source</p>
            <p className="text-lg font-bold text-ink capitalize">{recipe.sourcePlatform || 'Manual'}</p>
          </div>
          <div className="p-6 text-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-1">Saved On</p>
            <p className="text-lg font-bold text-ink">{formatDate(recipe.updatedAt)}</p>
          </div>
        </div>

        {/* Main Content Split */}
        <div className="p-8 grid md:grid-cols-5 gap-12">
          {/* Left Column: Ingredients & Nutrition */}
          <div className="md:col-span-2 space-y-12">
            {/* Ingredients Section */}
            <section className="space-y-6">
              <h3 className="text-[14px] font-bold text-slate-400 uppercase tracking-[0.1em]">Ingredients</h3>
              <div className="space-y-1">
                {recipe.ingredients.map((ing, i) => (
                  <div key={i} className="py-2 border-b border-slate-50 flex justify-between items-start text-sm">
                    <span className="text-ink font-medium">{ing.item}</span>
                    <span className="text-slate-500 font-bold whitespace-nowrap ml-4">{ing.quantity} {ing.unit}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Nutrition Information (Left Side Under Ingredients) */}
            {recipe.nutrition && (
              <section className="space-y-6 pt-6 border-t border-slate-50">
                <h3 className="text-[14px] font-bold text-slate-400 uppercase tracking-[0.1em]">Nutrition Information</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Calories', value: recipe.nutrition.calories, unit: 'kcal' },
                    { label: 'Protein', value: recipe.nutrition.protein, unit: 'g' },
                    { label: 'Carbs', value: recipe.nutrition.carbs, unit: 'g' },
                    { label: 'Fat', value: recipe.nutrition.fat, unit: 'g' },
                    { label: 'Fibre', value: recipe.nutrition.fibre, unit: 'g' }
                  ].map((macro) => {
                    const numServings = parseInt(recipe.servings?.toString() || '1') || 1;
                    return (
                      <div key={macro.label} className="flex items-center justify-between group">
                        <div className="space-y-0.5">
                          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{macro.label}</p>
                          <p className="text-[9px] text-slate-300 font-bold uppercase">Per Recipe: {Math.round(macro.value * numServings)}{macro.unit}</p>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-bold text-ink">{macro.value}</span>
                          <span className="text-[10px] text-slate-400 ml-1">{macro.unit}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}
          </div>

          {/* Steps Section (Right Column) */}
          <section className="md:col-span-3 space-y-6">
            <h3 className="text-[14px] font-bold text-slate-400 uppercase tracking-[0.1em]">Instructions</h3>
            <div className="space-y-8">
              {recipe.steps.map((step, i) => (
                <div key={i} className="flex gap-6 text-sm leading-relaxed group">
                  <div className="step-number mt-0.5 group-hover:bg-primary transition-colors">
                    {step.order}
                  </div>
                  <div className="flex-1 space-y-4">
                    <p className="text-ink text-base">
                      {step.text}
                    </p>
                    <div className="h-px bg-slate-50 w-full" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

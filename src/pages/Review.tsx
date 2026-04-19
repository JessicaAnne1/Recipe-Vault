import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Edit3, Tag, Users, Clock, Flame } from 'lucide-react';
import { Recipe, IngredientItem } from '../types';
import { cn } from '../lib/utils';

export default function Review() {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const temp = sessionStorage.getItem('temp_recipe');
    if (!temp) {
      navigate('/capture');
      return;
    }
    setRecipe(JSON.parse(temp));
  }, [navigate]);

  if (!recipe) return null;

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // This would save to Firestore
      // For now, mock save
      console.log("Saving recipe...", recipe);
      
      // Save to local storage for demo if firestore not ready
      const library = JSON.parse(localStorage.getItem('my_recipes') || '[]');
      const newRecipe = { ...recipe, id: `rec_${Date.now()}` };
      library.push(newRecipe);
      localStorage.setItem('my_recipes', JSON.stringify(library));

      setTimeout(() => {
        setIsSaving(false);
        sessionStorage.removeItem('temp_recipe');
        navigate('/library');
      }, 1000);
    } catch (error) {
      console.error("Save failed", error);
      setIsSaving(false);
    }
  };

  const updateField = (field: keyof Recipe, value: any) => {
    if (!recipe) return;
    setRecipe({ ...recipe, [field]: value });
  };

  const updateIngredient = (index: number, field: keyof IngredientItem, value: any) => {
    if (!recipe) return;
    const newIngredients = [...recipe.ingredients];
    newIngredients[index] = { ...newIngredients[index], [field]: value };
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  const updateNutrition = (field: keyof any, value: any) => {
    if (!recipe) return;
    setRecipe({
      ...recipe,
      nutrition: {
        ...(recipe.nutrition || { calories: 0, protein: 0, carbs: 0, fat: 0, fibre: 0 }),
        [field]: value
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-32">
      <div className="flex items-center justify-between">
        <button 
          onClick={() => navigate('/capture')}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Capture
        </button>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-[1fr_340px] gap-8">
        <div className="space-y-8">
          {/* Card Preview Area */}
          <div className="card overflow-hidden p-0 rounded-[32px]">
            <div className="p-8 border-b border-border bg-gradient-to-br from-white to-[#FFF9F8]">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="badge badge-ai">
                  Parsed from {recipe.sourcePlatform || 'AI'}
                </span>
                <span className="badge">
                  {recipe.category || 'Dinner'}
                </span>
                <span className="badge">
                  {recipe.servings || '4'} Servings
                </span>
              </div>
              <input
                type="text"
                value={recipe.title}
                onChange={(e) => updateField('title', e.target.value)}
                className="text-4xl font-display font-semibold text-ink bg-transparent border-none focus:ring-0 p-0 w-full placeholder:text-slate-200"
                placeholder="Recipe Title"
              />
              <textarea
                value={recipe.summary}
                onChange={(e) => updateField('summary', e.target.value)}
                className="mt-2 text-slate-500 bg-transparent border-none focus:ring-0 p-0 w-full resize-none h-16 placeholder:text-slate-200 leading-relaxed"
                placeholder="A short description of this recipe..."
              />
            </div>

            <div className="p-8 grid md:grid-cols-2 gap-10">
              {/* Ingredients Section */}
              <section className="space-y-4">
                <h3 className="text-[14px] font-bold text-slate-400 uppercase tracking-[0.1em]">Ingredients</h3>
                <div className="space-y-1">
                  {recipe.ingredients.map((ing, i) => (
                    <div key={i} className="py-2 border-b border-slate-50 flex justify-between items-center text-sm">
                      <input
                        value={ing.raw}
                        onChange={(e) => updateIngredient(i, 'raw', e.target.value)}
                        className="bg-transparent border-none p-0 focus:ring-0 flex-1"
                      />
                    </div>
                  ))}
                </div>
              </section>

              {/* Steps Section */}
              <section className="space-y-4">
                <h3 className="text-[14px] font-bold text-slate-400 uppercase tracking-[0.1em]">Directions</h3>
                <div className="space-y-6">
                  {recipe.steps.map((step, i) => (
                    <div key={i} className="flex gap-4 text-sm leading-relaxed">
                      <div className="step-number flex-shrink-0">
                        {step.order}
                      </div>
                      <textarea
                        value={step.text}
                        onChange={(e) => {
                          const newSteps = [...recipe.steps];
                          newSteps[i] = { ...newSteps[i], text: e.target.value };
                          updateField('steps', newSteps);
                        }}
                        className="flex-1 bg-transparent border-none p-0 focus:ring-0 resize-none min-h-[40px]"
                      />
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Sidebar Controls */}
        <aside className="space-y-6">
          <div className="card space-y-6">
            <h3 className="text-[14px] font-bold text-ink uppercase tracking-[0.1em]">Nutrition (Per Serve)</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1 col-span-2">
                <label className="text-[11px] font-bold text-slate-400 uppercase">Calories (kcal)</label>
                <input 
                  type="number" 
                  value={recipe.nutrition?.calories || 0}
                  onChange={(e) => updateNutrition('calories', parseFloat(e.target.value))}
                  className="input-field !py-2 !px-3"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase">Protein (g)</label>
                <input 
                  type="number" 
                  value={recipe.nutrition?.protein || 0}
                  onChange={(e) => updateNutrition('protein', parseFloat(e.target.value))}
                  className="input-field !py-2 !px-3"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase">Carbs (g)</label>
                <input 
                  type="number" 
                  value={recipe.nutrition?.carbs || 0}
                  onChange={(e) => updateNutrition('carbs', parseFloat(e.target.value))}
                  className="input-field !py-2 !px-3"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase">Fat (g)</label>
                <input 
                  type="number" 
                  value={recipe.nutrition?.fat || 0}
                  onChange={(e) => updateNutrition('fat', parseFloat(e.target.value))}
                  className="input-field !py-2 !px-3"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase">Fibre (g)</label>
                <input 
                  type="number" 
                  value={recipe.nutrition?.fibre || 0}
                  onChange={(e) => updateNutrition('fibre', parseFloat(e.target.value))}
                  className="input-field !py-2 !px-3"
                />
              </div>
            </div>
          </div>

          <div className="card space-y-6">
            <h3 className="text-[14px] font-bold text-ink uppercase tracking-[0.1em]">Review Details</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[13px] font-semibold text-slate-600 block">Category</label>
                <input 
                  type="text" 
                  value={recipe.category || ''}
                  onChange={(e) => updateField('category', e.target.value)}
                  className="input-field"
                  placeholder="e.g. Weeknight Dinner"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[13px] font-semibold text-slate-600 block">Servings</label>
                <input 
                  type="text" 
                  value={recipe.servings || ''}
                  onChange={(e) => updateField('servings', e.target.value)}
                  className="input-field"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[13px] font-semibold text-slate-600 block">Tags</label>
                <div className="flex flex-wrap gap-2">
                  {recipe.tags.map((tag, i) => (
                    <span key={i} className="bg-primary text-white px-3 py-1 rounded-lg text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                  <button className="bg-[#F1F5F9] text-slate-600 px-3 py-1 rounded-lg text-xs font-medium border border-dashed border-slate-400">
                    + Add Tag
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="primary-btn-styled w-full"
            >
              {isSaving ? 'Saving...' : 'Save to My Vault'}
            </button>
            <button 
              onClick={() => navigate('/capture')}
              className="secondary-btn-styled w-full"
            >
              Discard & Re-parse
            </button>
          </div>
        </aside>
      </div>

      {/* Floating Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 md:left-64 p-6 bg-gradient-to-t from-bg via-bg to-transparent z-40">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4 bg-white/80 backdrop-blur-xl p-4 rounded-3xl border border-slate-200 shadow-2xl">
          <div className="hidden sm:block px-4">
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Storage</p>
            <p className="text-sm font-medium text-slate-700">Will be saved to Library</p>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <button 
              onClick={() => navigate('/capture')}
              className="btn-secondary flex-1 sm:flex-none"
            >
              Discard
            </button>
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="btn-primary flex-1 sm:flex-none px-10"
            >
              {isSaving ? 'Saving...' : (
                <>
                  <Save className="w-5 h-5" />
                  Save and Vault
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

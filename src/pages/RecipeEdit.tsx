import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Trash2, Plus, Minus, Tag, LayoutPanelLeft } from 'lucide-react';
import { Recipe, IngredientItem, StepItem } from '../types';
import { cn } from '../lib/utils';

export default function RecipeEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
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

  const handleSave = () => {
    const stored = localStorage.getItem('my_recipes');
    if (stored) {
      const all = JSON.parse(stored);
      const index = all.findIndex((r: Recipe) => r.id === id);
      all[index] = { ...recipe, updatedAt: new Date().toISOString(), version: (recipe.version || 1) + 1 };
      localStorage.setItem('my_recipes', JSON.stringify(all));
      navigate(`/recipe/${id}`);
    }
  };

  const updateField = (field: keyof Recipe, value: any) => {
    setRecipe({ ...recipe, [field]: value });
  };

  const updateIngredient = (index: number, field: keyof IngredientItem, value: any) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients[index] = { ...newIngredients[index], [field]: value };
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  const addIngredient = () => {
    setRecipe({
      ...recipe,
      ingredients: [...recipe.ingredients, { raw: '', item: '', quantity: '', unit: '', prep: '' }]
    });
  };

  const removeIngredient = (index: number) => {
    setRecipe({
      ...recipe,
      ingredients: recipe.ingredients.filter((_, i) => i !== index)
    });
  };

  const addStep = () => {
    setRecipe({
      ...recipe,
      steps: [...recipe.steps, { order: recipe.steps.length + 1, text: '' }]
    });
  };

  const removeStep = (index: number) => {
    setRecipe({
      ...recipe,
      steps: recipe.steps.filter((_, i) => i !== index).map((s, i) => ({ ...s, order: i + 1 }))
    });
  };

  return (
    <div className="space-y-8 pb-32 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <button 
          onClick={() => navigate(`/recipe/${id}`)}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors bg-white px-4 py-2 rounded-xl border border-slate-100 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Cancel
        </button>
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
           <LayoutPanelLeft className="w-4 h-4" />
           Version {recipe.version}
        </div>
      </div>

      <div className="space-y-10">
        {/* Core Info */}
        <section className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 uppercase tracking-tight">Recipe Title</label>
            <input
              type="text"
              value={recipe.title}
              onChange={(e) => updateField('title', e.target.value)}
              className="input-field text-2xl font-bold py-6 px-6"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 uppercase tracking-tight">Summary</label>
            <textarea
              value={recipe.summary}
              onChange={(e) => updateField('summary', e.target.value)}
              className="input-field h-32 py-4 px-6 resize-none"
            />
          </div>
        </section>

        {/* Ingredients Editor */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Ingredients</h3>
            <button 
              onClick={addIngredient}
              className="btn-secondary py-2 h-10 text-xs px-4"
            >
              <Plus className="w-4 h-4" />
              Add Ingredient
            </button>
          </div>
          <div className="space-y-3">
            {recipe.ingredients.map((ing, i) => (
              <div key={i} className="flex gap-4">
                <input
                  value={ing.raw}
                  onChange={(e) => updateIngredient(i, 'raw', e.target.value)}
                  className="input-field flex-1"
                  placeholder="e.g. 2 cups flour, sifted"
                />
                <button 
                  onClick={() => removeIngredient(i)}
                  className="p-3 text-slate-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Steps Editor */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Instructions</h3>
            <button 
              onClick={addStep}
              className="btn-secondary py-2 h-10 text-xs px-4"
            >
              <Plus className="w-4 h-4" />
              Add Step
            </button>
          </div>
          <div className="space-y-6">
            {recipe.steps.map((step, i) => (
              <div key={i} className="flex gap-4 group">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center font-bold text-slate-400">
                  {step.order}
                </div>
                <textarea
                  value={step.text}
                  onChange={(e) => {
                    const newSteps = [...recipe.steps];
                    newSteps[i] = { ...newSteps[i], text: e.target.value };
                    updateField('steps', newSteps);
                  }}
                  className="input-field flex-1 min-h-[80px] py-4 px-6 resize-none"
                />
                <button 
                  onClick={() => removeStep(i)}
                  className="p-3 text-slate-300 hover:text-red-500 transition-colors h-14"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer Actions */}
      <div className="fixed bottom-0 left-0 right-0 md:left-64 p-6 bg-gradient-to-t from-[#FDFBF9] via-[#FDFBF9] to-transparent z-40">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4 bg-white/80 backdrop-blur-xl p-4 rounded-3xl border border-slate-200 shadow-2xl">
          <div className="hidden sm:block px-4">
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Iterate Confidently</p>
            <p className="text-sm font-medium text-slate-700">Edits update the existing card.</p>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <button 
              onClick={() => navigate(`/recipe/${id}`)}
              className="btn-secondary flex-1 sm:flex-none"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              className="btn-primary flex-1 sm:flex-none px-10"
            >
              <Save className="w-5 h-5" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

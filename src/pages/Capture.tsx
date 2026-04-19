import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, History, Info } from 'lucide-react';
import { motion } from 'motion/react';
import { GoogleGenAI, Type } from "@google/genai";
import { Recipe } from '../types';

export default function Capture() {
  const [text, setText] = useState('');
  const [source, setSource] = useState('chatgpt');
  const [isParsing, setIsParsing] = useState(false);
  const navigate = useNavigate();

  const handleParse = async () => {
    if (!text.trim()) return;
    setIsParsing(true);
    
    // In a real app, this would use the Gemini API via a service
    // For now, I'll implement the shell and the logic to call Gemini
    try {
      console.log('API key present:', !!import.meta.env.VITE_GEMINI_API_KEY);
      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
      const prompt = `
        You are a precise culinary data extractor. 
        Parse the following messy recipe text into the requested JSON format.
        
        CRITICAL RULES:
        1. Extract ONLY the recipe data.
        2. Ingredients should be clean components (e.g. "2 cloves garlic, minced" -> raw: "2 cloves garlic, minced", item: "garlic", quantity: "2", unit: "cloves", prep: "minced").
        3. Steps should be logical cooking instructions.
        4. Summary should be one or two concise sentences.
        5. Nutrition should be calculated PER SERVING. If not found, estimate logically.
        6. DO NOT repeat the input text back in the output.
        7. STICK STRICTLY to the schema.
        
        Original Text to Parse:
        ${text}
      `;

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              summary: { type: Type.STRING },
              category: { type: Type.STRING },
              tags: { type: Type.ARRAY, items: { type: Type.STRING } },
              dietaryFlags: { type: Type.ARRAY, items: { type: Type.STRING } },
              servings: { type: Type.STRING },
              ingredients: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    raw: { type: Type.STRING },
                    quantity: { type: Type.STRING, nullable: true },
                    unit: { type: Type.STRING, nullable: true },
                    item: { type: Type.STRING },
                    prep: { type: Type.STRING, nullable: true }
                  }
                }
              },
              steps: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    order: { type: Type.NUMBER },
                    text: { type: Type.STRING }
                  }
                }
              },
              nutrition: {
                type: Type.OBJECT,
                properties: {
                  calories: { type: Type.NUMBER },
                  protein: { type: Type.NUMBER },
                  carbs: { type: Type.NUMBER },
                  fat: { type: Type.NUMBER },
                  fibre: { type: Type.NUMBER }
                }
              }
            }
          }
        }
      });

      const responseText = response.text || '';
      if (!responseText) throw new Error("Empty response from AI");

      let parsedRecipe: Partial<Recipe>;
      try {
        parsedRecipe = JSON.parse(responseText);
      } catch {
        throw new Error("AI returned invalid JSON. Please try again.");
      }
      // Store in session storage or state management to carry to /review
      sessionStorage.setItem('temp_recipe', JSON.stringify({
        ...parsedRecipe,
        rawText: text,
        sourcePlatform: source,
        version: 1,
        updatedAt: new Date().toISOString()
      }));
      
      navigate('/review');
    } catch (error) {
      console.error("Parsing failed", error);
      alert("Failed to parse recipe. Please check your text and try again.");
    } finally {
      setIsParsing(false);
    }
  };

  const examples = [
    "1. One-Pan Lemon Chicken Orzo...",
    "2. Easy Chocolate Chip Cookies...",
    "3. Spicy Chickpea Curry with Coconut..."
  ];

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-semibold font-display text-ink">Capture Recipe</h1>
        <p className="text-slate-500">Paste your raw recipe output from any AI chat below.</p>
      </div>

      <div className="card space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-slate-700 uppercase tracking-tight">Source Platform</label>
            <div className="flex bg-slate-100 p-1 rounded-xl">
              {['chatgpt', 'claude', 'gemini', 'other'].map((platform) => (
                <button
                  key={platform}
                  onClick={() => setSource(platform)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                    source === platform 
                      ? 'bg-white text-primary shadow-sm' 
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste recipe instructions from ChatGPT, Gemini, or Claude..."
            className="input-field h-80 p-6 resize-none shadow-inner leading-relaxed"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
           <div className="flex items-center gap-2 text-slate-400">
             <Info className="w-4 h-4" />
             <span className="text-xs font-medium">Character count: {text.length}</span>
           </div>
           
           <button
             onClick={handleParse}
             disabled={!text.trim() || isParsing}
             className="btn-primary w-full sm:w-auto min-w-[160px]"
           >
             {isParsing ? (
               <>
                 <motion.div
                   animate={{ rotate: 360 }}
                   transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                 >
                   <Sparkles className="w-5 h-5" />
                 </motion.div>
                 Parsing...
               </>
             ) : (
               <>
                 <Sparkles className="w-5 h-5" />
                 Parse Recipe
               </>
             )}
           </button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <History className="w-4 h-4" />
          Tips for best results
        </h3>
        <ul className="text-sm text-slate-500 space-y-2 list-disc pl-5">
          <li>Try to include both the ingredients and the step-by-step instructions.</li>
          <li>Formatting doesn't matter much—our AI can handle the mess.</li>
          <li>You can paste multiple messages if they are part of the same recipe.</li>
        </ul>
      </div>
    </div>
  );
}

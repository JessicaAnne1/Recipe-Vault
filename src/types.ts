export interface IngredientItem {
  raw: string;
  quantity: number | string | null;
  unit: string | null;
  item: string;
  prep: string | null;
}

export interface StepItem {
  order: number;
  text: string;
}

export interface Nutrition {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fibre: number;
}

export interface Recipe {
  id?: string;
  title: string;
  summary: string;
  sourcePlatform?: string;
  category?: string;
  tags: string[];
  dietaryFlags?: string[];
  servings?: number | string;
  ingredients: IngredientItem[];
  steps: StepItem[];
  nutrition?: Nutrition;
  rawText: string;
  version: number;
  updatedAt: string;
  userId: string;
  imageUrl?: string | null;
}

export type RecipeCardSummary = Pick<Recipe, 'id' | 'title' | 'category' | 'tags' | 'summary' | 'imageUrl' | 'updatedAt'>;

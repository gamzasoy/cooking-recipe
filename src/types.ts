export const CATEGORIES = ['한식', '양식', '중식', '일식', '디저트'] as const;
export type Category = (typeof CATEGORIES)[number];

export type Difficulty = '쉬움' | '보통' | '어려움';

export interface Ingredient {
  name: string;
  /** null이면 "약간", "적당량"처럼 수량이 없는 재료 */
  amount: number | null;
  unit: string;
}

export interface Step {
  text: string;
  timerSeconds?: number;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  emoji: string;
  category: Category;
  difficulty: Difficulty;
  cookTimeMinutes: number;
  baseServings: number;
  ingredients: Ingredient[];
  steps: Step[];
  tags: string[];
}

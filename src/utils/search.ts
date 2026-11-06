import type { Category, Recipe } from '../types';

const normalize = (s: string) => s.toLowerCase().replace(/\s+/g, '');

export function filterRecipes(
  recipes: Recipe[],
  query: string,
  category: Category | null,
): Recipe[] {
  const q = normalize(query);
  return recipes.filter((r) => {
    if (category && r.category !== category) return false;
    if (!q) return true;
    const haystack = [r.title, ...r.ingredients.map((i) => i.name), ...r.tags];
    return haystack.some((text) => normalize(text).includes(q));
  });
}

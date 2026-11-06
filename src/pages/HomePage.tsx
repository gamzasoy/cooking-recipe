import { useMemo, useState } from 'react';
import { recipes } from '../data/recipes';
import type { Category } from '../types';
import { filterRecipes } from '../utils/search';
import { SearchBar } from '../components/SearchBar';
import { CategoryFilter } from '../components/CategoryFilter';
import { RecipeGrid } from '../components/RecipeCard';

export function HomePage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<Category | null>(null);
  const results = useMemo(() => filterRecipes(recipes, query, category), [query, category]);

  return (
    <main className="page">
      <section className="hero">
        <h1>오늘은 뭐 해먹지?</h1>
        <p>{recipes.length}개의 레시피 중에서 골라보세요.</p>
      </section>
      <SearchBar value={query} onChange={setQuery} />
      <CategoryFilter value={category} onChange={setCategory} />
      {results.length > 0 ? (
        <RecipeGrid recipes={results} />
      ) : (
        <p className="empty">검색 결과가 없어요. 다른 재료나 이름으로 찾아보세요.</p>
      )}
    </main>
  );
}

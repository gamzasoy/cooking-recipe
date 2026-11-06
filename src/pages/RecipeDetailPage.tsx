import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getRecipeById } from '../data/recipes';
import { FavoriteButton } from '../components/FavoriteButton';
import { ServingsControl } from '../components/ServingsControl';
import { IngredientList } from '../components/IngredientList';
import { StepList } from '../components/StepList';
import type { Recipe } from '../types';

export function RecipeDetailPage() {
  const { id = '' } = useParams();
  const recipe = getRecipeById(id);
  if (!recipe) {
    return (
      <main className="page">
        <p className="empty">레시피를 찾을 수 없어요. <Link to="/">홈으로</Link></p>
      </main>
    );
  }
  return <RecipeDetail key={recipe.id} recipe={recipe} />;
}

function RecipeDetail({ recipe }: { recipe: Recipe }) {
  const [servings, setServings] = useState(recipe.baseServings);
  return (
    <main className="page detail">
      <Link to="/" className="back">← 목록으로</Link>
      <div className={`detail-hero cat-${recipe.category}`} aria-hidden="true">{recipe.emoji}</div>
      <div className="detail-head">
        <div>
          <span className="card-category">{recipe.category}</span>
          <h1>{recipe.title}</h1>
        </div>
        <FavoriteButton recipeId={recipe.id} title={recipe.title} large />
      </div>
      <p className="desc">{recipe.description}</p>
      <ul className="facts">
        <li>⏱ {recipe.cookTimeMinutes}분</li>
        <li>📊 {recipe.difficulty}</li>
        <li>🍽 기본 {recipe.baseServings}인분</li>
      </ul>
      <div className="tags">
        {recipe.tags.map((t) => <span key={t}>#{t}</span>)}
      </div>

      <section className="panel">
        <div className="panel-head">
          <h2>재료</h2>
          <ServingsControl value={servings} onChange={setServings} />
        </div>
        <IngredientList ingredients={recipe.ingredients} baseServings={recipe.baseServings} servings={servings} />
      </section>

      <section className="panel">
        <h2>조리 순서</h2>
        <StepList steps={recipe.steps} />
      </section>
    </main>
  );
}

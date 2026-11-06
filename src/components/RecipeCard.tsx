import { Link } from 'react-router-dom';
import type { Recipe } from '../types';
import { FavoriteButton } from './FavoriteButton';

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link to={`/recipe/${recipe.id}`} className="card">
      <div className={`card-thumb cat-${recipe.category}`} aria-hidden="true">
        {recipe.emoji}
      </div>
      <FavoriteButton recipeId={recipe.id} title={recipe.title} />
      <div className="card-body">
        <span className="card-category">{recipe.category}</span>
        <h3 className="card-title">{recipe.title}</h3>
        <p className="card-meta">
          ⏱ {recipe.cookTimeMinutes}분 · {recipe.difficulty}
        </p>
      </div>
    </Link>
  );
}

export function RecipeGrid({ recipes }: { recipes: Recipe[] }) {
  return (
    <div className="grid">
      {recipes.map((r) => (
        <RecipeCard key={r.id} recipe={r} />
      ))}
    </div>
  );
}

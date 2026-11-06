import type { Ingredient } from '../types';
import { formatIngredient } from '../utils/scale';

export function IngredientList({ ingredients, baseServings, servings }: { ingredients: Ingredient[]; baseServings: number; servings: number }) {
  return (
    <ul className="ingredients">
      {ingredients.map((ing) => (
        <li key={ing.name}>
          <span>{ing.name}</span>
          <span className="amount">{formatIngredient(ing, baseServings, servings)}</span>
        </li>
      ))}
    </ul>
  );
}

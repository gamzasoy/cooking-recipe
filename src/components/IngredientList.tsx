import type { Ingredient } from '../types';
import { formatIngredient } from '../utils/scale';

/** 재료를 group 별로 묶는다. 묶음 순서는 처음 등장한 순서를 따른다. */
function groupIngredients(ingredients: Ingredient[]): [string | undefined, Ingredient[]][] {
  const groups = new Map<string | undefined, Ingredient[]>();
  for (const ing of ingredients) {
    const list = groups.get(ing.group) ?? [];
    list.push(ing);
    groups.set(ing.group, list);
  }
  return [...groups.entries()];
}

export function IngredientList({ ingredients, baseServings, servings }: { ingredients: Ingredient[]; baseServings: number; servings: number }) {
  return (
    <div className="ingredient-groups">
      {groupIngredients(ingredients).map(([group, items]) => (
        <div key={group ?? '__default'}>
          {group && <h3 className="ingredient-group">{group}</h3>}
          <ul className="ingredients">
            {items.map((ing, i) => (
              <li key={`${ing.name}-${i}`}>
                <span>{ing.name}</span>
                <span className="amount">{formatIngredient(ing, baseServings, servings)}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

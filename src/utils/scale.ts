import type { Ingredient } from '../types';

const METRIC_UNITS = new Set(['g', 'kg', 'ml', 'l']);
/** 표시할 수 있는 분수 (¼, ⅓, ½, ⅔, ¾) */
const FRACTIONS: [number, string][] = [
  [0, ''],
  [1 / 4, '¼'],
  [1 / 3, '⅓'],
  [1 / 2, '½'],
  [2 / 3, '⅔'],
  [3 / 4, '¾'],
  [1, ''],
];

export function scaleAmount(amount: number, baseServings: number, targetServings: number): number {
  return (amount * targetServings) / baseServings;
}

/** 단위에 맞게 보기 좋은 숫자 문자열로 변환한다. */
export function formatAmount(value: number, unit: string): string {
  if (METRIC_UNITS.has(unit.toLowerCase())) {
    if (value >= 100) return String(Math.round(value / 5) * 5);
    if (value >= 10) return String(Math.round(value));
    // 10 미만은 소수 첫째 자리까지 (예: 0.5g)
    return String(Math.max(Math.round(value * 10) / 10, 0.1));
  }
  // 개, 큰술 등은 가장 가까운 분수로 표기 (최소 ¼)
  let whole = Math.floor(value);
  const rest = value - whole;
  let [frac, fracStr] = FRACTIONS.reduce((best, cur) =>
    Math.abs(cur[0] - rest) < Math.abs(best[0] - rest) ? cur : best,
  );
  if (frac === 1) {
    whole += 1;
    frac = 0;
  }
  if (whole === 0 && frac === 0) return '¼';
  return whole > 0 ? `${whole}${fracStr}` : fracStr;
}

export function formatIngredient(
  ingredient: Ingredient,
  baseServings: number,
  targetServings: number,
): string {
  if (ingredient.amount === null) return ingredient.unit;
  const scaled = scaleAmount(ingredient.amount, baseServings, targetServings);
  return `${formatAmount(scaled, ingredient.unit)}${ingredient.unit}`;
}

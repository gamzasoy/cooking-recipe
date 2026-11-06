import type { Ingredient } from '../types';

const METRIC_UNITS = new Set(['g', 'kg', 'ml', 'l']);
const FRACTIONS: Record<number, string> = { 0.25: '¼', 0.5: '½', 0.75: '¾' };

export function scaleAmount(amount: number, baseServings: number, targetServings: number): number {
  return (amount * targetServings) / baseServings;
}

/** 단위에 맞게 보기 좋은 숫자 문자열로 변환한다. */
export function formatAmount(value: number, unit: string): string {
  if (METRIC_UNITS.has(unit.toLowerCase())) {
    const rounded = value >= 100 ? Math.round(value / 5) * 5 : Math.round(value);
    return String(Math.max(rounded, 1));
  }
  // 개, 큰술 등은 ¼ 단위로 반올림 (최소 ¼)
  const quarter = Math.max(Math.round(value * 4) / 4, 0.25);
  const whole = Math.floor(quarter);
  const frac = quarter - whole;
  if (frac === 0) return String(whole);
  const fracStr = FRACTIONS[frac];
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

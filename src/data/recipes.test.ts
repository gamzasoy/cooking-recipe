import { recipes } from './recipes';

describe('recipes data', () => {
  it('id가 모두 고유하다', () => {
    expect(new Set(recipes.map((r) => r.id)).size).toBe(recipes.length);
  });
  it('모든 레시피에 재료와 단계가 있다', () => {
    for (const r of recipes) {
      expect(r.ingredients.length).toBeGreaterThan(0);
      expect(r.steps.length).toBeGreaterThan(0);
      expect(r.baseServings).toBeGreaterThan(0);
    }
  });
});

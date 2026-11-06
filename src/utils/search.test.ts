import { recipes } from '../data/recipes';
import { filterRecipes } from './search';

describe('filterRecipes', () => {
  it('검색어가 없으면 전체를 반환한다', () => {
    expect(filterRecipes(recipes, '', null)).toHaveLength(recipes.length);
  });
  it('제목으로 검색한다 (공백 무시)', () => {
    expect(filterRecipes(recipes, '김치 찌개', null).map((r) => r.id)).toEqual(['kimchi-jjigae']);
  });
  it('재료명으로 검색한다', () => {
    const ids = filterRecipes(recipes, '춘장', null).map((r) => r.id);
    expect(ids).toEqual(['jjajang-bap']);
  });
  it('카테고리로 필터한다', () => {
    const result = filterRecipes(recipes, '', '디저트');
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((r) => r.category === '디저트')).toBe(true);
  });
  it('검색어와 카테고리를 함께 적용한다', () => {
    expect(filterRecipes(recipes, '달걀', '일식').map((r) => r.id)).toEqual(['oyakodon']);
  });
});

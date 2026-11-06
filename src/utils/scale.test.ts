import { formatAmount, formatIngredient, scaleAmount } from './scale';

describe('scaleAmount', () => {
  it('인분 비율대로 양을 조절한다', () => {
    expect(scaleAmount(200, 2, 4)).toBe(400);
    expect(scaleAmount(1, 2, 3)).toBe(1.5);
  });
});

describe('formatAmount', () => {
  it('g/ml는 정수로, 100 이상은 5 단위로 반올림한다', () => {
    expect(formatAmount(33.3, 'g')).toBe('33');
    expect(formatAmount(266.6, 'ml')).toBe('265');
  });
  it('그 외 단위는 ¼ 단위 분수로 표기한다', () => {
    expect(formatAmount(1.5, '큰술')).toBe('1½');
    expect(formatAmount(0.25, '개')).toBe('¼');
    expect(formatAmount(0.1, '개')).toBe('¼');
    expect(formatAmount(3, '개')).toBe('3');
    expect(formatAmount(0.75, '모')).toBe('¾');
  });
});

describe('formatIngredient', () => {
  it('수량 없는 재료는 단위 텍스트를 그대로 보여준다', () => {
    expect(formatIngredient({ name: '소금', amount: null, unit: '약간' }, 2, 6)).toBe('약간');
  });
  it('양과 단위를 함께 표기한다', () => {
    expect(formatIngredient({ name: '두부', amount: 0.5, unit: '모' }, 2, 4)).toBe('1모');
  });
});

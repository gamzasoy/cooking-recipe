import { CATEGORIES, type Category } from '../types';

export function CategoryFilter({ value, onChange }: { value: Category | null; onChange: (c: Category | null) => void }) {
  const options: (Category | null)[] = [null, ...CATEGORIES];
  return (
    <div className="chips" role="group" aria-label="카테고리">
      {options.map((c) => (
        <button
          key={c ?? 'all'}
          type="button"
          className={`chip${value === c ? ' active' : ''}`}
          aria-pressed={value === c}
          onClick={() => onChange(c)}
        >
          {c ?? '전체'}
        </button>
      ))}
    </div>
  );
}

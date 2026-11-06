export const MIN_SERVINGS = 1;
export const MAX_SERVINGS = 10;

export function ServingsControl({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  return (
    <div className="servings">
      <button type="button" aria-label="인분 줄이기" disabled={value <= MIN_SERVINGS} onClick={() => onChange(value - 1)}>
        −
      </button>
      <span aria-live="polite" data-testid="servings">
        {value}인분
      </span>
      <button type="button" aria-label="인분 늘리기" disabled={value >= MAX_SERVINGS} onClick={() => onChange(value + 1)}>
        +
      </button>
    </div>
  );
}

export function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="search">
      <span className="search-icon" aria-hidden="true">🔍</span>
      <input
        type="search"
        placeholder="요리 이름, 재료, 태그로 검색"
        aria-label="레시피 검색"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

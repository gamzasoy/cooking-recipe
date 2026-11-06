import { useFavorites } from '../hooks/useFavorites';

export function FavoriteButton({ recipeId, title, large = false }: { recipeId: string; title: string; large?: boolean }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(recipeId);
  return (
    <button
      type="button"
      className={`fav-btn${active ? ' active' : ''}${large ? ' large' : ''}`}
      aria-pressed={active}
      aria-label={active ? `${title} 즐겨찾기 해제` : `${title} 즐겨찾기 추가`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(recipeId);
      }}
    >
      {active ? '♥' : '♡'}
    </button>
  );
}

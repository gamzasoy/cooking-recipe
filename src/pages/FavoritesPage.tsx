import { Link } from 'react-router-dom';
import { recipes } from '../data/recipes';
import { useFavorites } from '../hooks/useFavorites';
import { RecipeGrid } from '../components/RecipeCard';

export function FavoritesPage() {
  const { favorites } = useFavorites();
  const list = recipes.filter((r) => favorites.includes(r.id));
  return (
    <main className="page">
      <h1 className="page-title">즐겨찾기</h1>
      {list.length > 0 ? (
        <RecipeGrid recipes={list} />
      ) : (
        <p className="empty">
          아직 즐겨찾기한 레시피가 없어요. <Link to="/">레시피 둘러보기</Link>
        </p>
      )}
    </main>
  );
}

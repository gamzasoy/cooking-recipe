import { NavLink } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';

export function NavBar() {
  const { favorites } = useFavorites();
  return (
    <header className="nav">
      <div className="nav-inner">
        <NavLink to="/" className="brand">🍳 오늘의 레시피</NavLink>
        <nav className="nav-links">
          <NavLink to="/" end>홈</NavLink>
          <NavLink to="/favorites">
            즐겨찾기{favorites.length > 0 && <span className="badge">{favorites.length}</span>}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

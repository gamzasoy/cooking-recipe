import { HashRouter, Route, Routes } from 'react-router-dom';
import { FavoritesProvider } from './hooks/useFavorites';
import { NavBar } from './components/NavBar';
import { HomePage } from './pages/HomePage';
import { RecipeDetailPage } from './pages/RecipeDetailPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { ScrollToTop } from './components/ScrollToTop';

export function AppRoutes() {
  return (
    <FavoritesProvider>
      <ScrollToTop />
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipe/:id" element={<RecipeDetailPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </FavoritesProvider>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  );
}

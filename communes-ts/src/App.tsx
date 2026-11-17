import { NavLink, Route, Routes } from 'react-router'
import Accueil from './pages/Accueil.tsx'
import Detail from './pages/Detail.tsx'
import Favoris from './pages/Favoris.tsx'
import Introuvable from './pages/Introuvable.tsx'
import { useFavoris } from './useFavoris.ts'
import './App.css'

function App() {
  const { favoris, estFavori, basculer } = useFavoris()

  return (
    <main>
      <nav>
        <NavLink to="/">Recherche</NavLink>
        <NavLink to="/favoris">Favoris ({favoris.length})</NavLink>
      </nav>

      <Routes>
        <Route
          path="/"
          element={<Accueil estFavori={estFavori} basculer={basculer} />}
        />
        <Route
          path="/favoris"
          element={<Favoris favoris={favoris} basculer={basculer} />}
        />
        <Route path="/commune/:code" element={<Detail />} />
        <Route path="*" element={<Introuvable />} />
      </Routes>
    </main>
  )
}

export default App
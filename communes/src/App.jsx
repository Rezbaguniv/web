import { useEffect, useState } from 'react'
import { NavLink, Route, Routes } from 'react-router'
import Accueil from './pages/Accueil.jsx'
import Detail from './pages/Detail.jsx'
import Favoris from './pages/Favoris.jsx'
import Introuvable from './pages/Introuvable.jsx'

import './App.css'

function App() {
  const [favoris, setFavoris] = useState(() => {
    const sauvegarde = localStorage.getItem('favoris')
    return sauvegarde ? JSON.parse(sauvegarde) : []
  })

  useEffect(() => {
    localStorage.setItem('favoris', JSON.stringify(favoris))
  }, [favoris])

  function estFavori(commune) {
    return favoris.some((f) => f.code === commune.code)
  }

  function basculer(commune) {
    if (estFavori(commune)) {
      setFavoris(favoris.filter((f) => f.code !== commune.code))
    } else {
      setFavoris([...favoris, commune])
    }
  }

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
        <Route 
          path="/commune/:code" 
          element={<Detail />} 
        />
        <Route path="*" element={<Introuvable />} />

      </Routes>
    </main>
  )
}

export default App
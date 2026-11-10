import { useEffect, useState } from 'react'
import CarteCommune from './CarteCommune.jsx'
import './App.css'

function App() {
  const [recherche, setRecherche] = useState('')
  const [communes, setCommunes] = useState([])
  const [chargement, setChargement] = useState(false)
  const [erreur, setErreur] = useState('')
  const [favoris, setFavoris] = useState(() => {
    const sauvegarde = localStorage.getItem('favoris')
    return sauvegarde ? JSON.parse(sauvegarde) : []
  })

  useEffect(() => {
    localStorage.setItem('favoris', JSON.stringify(favoris))
  }, [favoris])

  async function chercher(event) {
    event.preventDefault()
    if (recherche.trim() === '') return
    setChargement(true)
    setErreur('')
    try {
      const url = `https://geo.api.gouv.fr/communes?nom=${encodeURIComponent(recherche)}&fields=nom,code,population,departement&boost=population&limit=10`
      const reponse = await fetch(url)
      if (!reponse.ok) throw new Error('Réponse ' + reponse.status)
      const donnees = await reponse.json()
      setCommunes(donnees)
    } catch {
      setErreur('Impossible de charger les communes. Vérifiez votre connexion, puis réessayez.')
      setCommunes([])
    } finally {
      setChargement(false)
    }
  }

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
      <h1>Communes de France</h1>

      <form onSubmit={chercher}>
        <input
          value={recherche}
          onChange={(event) => setRecherche(event.target.value)}
          placeholder="Nom d'une commune"
        />
        <button type="submit">Rechercher</button>
      </form>

      {chargement && <p>Chargement…</p>}
      {erreur && <p className="erreur">{erreur}</p>}

      {communes.map((c) => (
        <CarteCommune
          key={c.code}
          nom={c.nom}
          population={c.population}
          departement={c.departement}
          favori={estFavori(c)}
          onBasculer={() => basculer(c)}
        />
      ))}

      <h2>Mes favoris</h2>
      {favoris.length === 0 && <p>Aucun favori pour le moment.</p>}
      {favoris.map((c) => (
        <CarteCommune
          key={c.code}
          nom={c.nom}
          population={c.population}
          departement={c.departement}
          favori={true}
          onBasculer={() => basculer(c)}
        />
      ))}
    </main>
  )
}

export default App
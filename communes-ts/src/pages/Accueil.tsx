import { useState } from 'react'
import type { SubmitEvent } from 'react'
import CarteCommune from '../CarteCommune.tsx'
import type { Commune } from '../types.ts'

type Props = {
  estFavori: (commune: Commune) => boolean
  basculer: (commune: Commune) => void
}

function Accueil({ estFavori, basculer }: Props) {
  const [recherche, setRecherche] = useState('')
  const [communes, setCommunes] = useState<Commune[]>([])
  const [chargement, setChargement] = useState(false)
  const [erreur, setErreur] = useState('')

  async function chercher(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    if (recherche.trim() === '') return
    setChargement(true)
    setErreur('')
    try {
      const url = `https://geo.api.gouv.fr/communes?nom=${encodeURIComponent(recherche)}&fields=nom,code,population,departement&boost=population&limit=10`
      const reponse = await fetch(url)
      if (!reponse.ok) throw new Error('Réponse ' + reponse.status)
      const donnees: Commune[] = await reponse.json()
      setCommunes(donnees)
    } catch {
      setErreur('Impossible de charger les communes. Vérifiez votre connexion, puis réessayez.')
      setCommunes([])
    } finally {
      setChargement(false)
    }
  }

  return (
    <section>
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
          code={c.code}
          nom={c.nom}
          population={c.population}
          departement={c.departement}
          favori={estFavori(c)}
          onBasculer={() => basculer(c)}
        />
      ))}
    </section>
  )
}

export default Accueil
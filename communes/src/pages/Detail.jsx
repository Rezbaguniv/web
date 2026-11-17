import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'

function Detail() {
  const { code } = useParams()
  const [commune, setCommune] = useState(null)
  const [erreur, setErreur] = useState('')

  useEffect(() => {
    async function charger() {
      try {
        const url = `https://geo.api.gouv.fr/communes/${code}?fields=nom,code,population,departement,region,codesPostaux,surface`
        const reponse = await fetch(url)
        if (!reponse.ok) throw new Error('Réponse ' + reponse.status)
        const donnees = await reponse.json()
        setCommune(donnees)
      } catch {
        setErreur('Commune introuvable, ou service indisponible.')
      }
    }
    charger()
  }, [code])

  if (erreur) {
    return (
      <section>
        <p className="erreur">{erreur}</p>
        <Link to="/">← Retour à la recherche</Link>
      </section>
    )
  }

  if (!commune) {
    return <p>Chargement…</p>
  }

  return (
    <section>
      <p>
        <Link to="/">← Retour à la recherche</Link>
      </p>
      <h1>{commune.nom}</h1>
      <ul>
        <li>
          Département : {commune.departement?.nom} ({commune.departement?.code})
        </li>
        <li>Région : {commune.region?.nom}</li>
        <li>Population : {commune.population?.toLocaleString('fr-FR')} habitants</li>
        <li>Surface : {Math.round(commune.surface / 100)} km²</li>
        <li>Codes postaux : {commune.codesPostaux?.join(', ')}</li>
      </ul>
    </section>
  )
}

export default Detail
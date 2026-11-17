import { Link } from 'react-router'
import type { Departement } from './types.ts'

type Props = {
  code: string
  nom: string
  population?: number
  departement?: Departement
  favori: boolean
  onBasculer: () => void
}

function CarteCommune({ code, nom, population, departement, favori, onBasculer }: Props) {
  const habitants =
    population === undefined
      ? 'population inconnue'
      : `${population.toLocaleString('fr-FR')} habitants`

  return (
    <article className="carte">
      <h2>{nom}</h2>
      <p>
        {departement?.nom} · {habitants}
      </p>
      <div className="carte-actions">
        <button onClick={onBasculer}>
          {favori ? '★ Retirer des favoris' : '☆ Ajouter aux favoris'}
        </button>
        <Link to={`/commune/${code}`}>Voir le détail</Link>
      </div>
    </article>
  )
}

export default CarteCommune
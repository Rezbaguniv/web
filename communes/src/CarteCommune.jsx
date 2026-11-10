function CarteCommune({ nom, population, departement, favori, onBasculer }) {
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
      <button onClick={onBasculer}>
        {favori ? '★ Retirer des favoris' : '☆ Ajouter aux favoris'}
      </button>
    </article>
  )
}

export default CarteCommune
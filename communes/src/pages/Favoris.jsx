import CarteCommune from '../CarteCommune.jsx'

function Favoris({ favoris, basculer }) {
  return (
    <section>
      <h1>Mes favoris</h1>

      {favoris.length === 0 && <p>Aucun favori pour le moment.</p>}

      {favoris.map((c) => (
        <CarteCommune
          key={c.code}
          code={c.code}
          nom={c.nom}
          population={c.population}
          departement={c.departement}
          favori={true}
          onBasculer={() => basculer(c)}
        />
      ))}
    </section>
  )
}

export default Favoris
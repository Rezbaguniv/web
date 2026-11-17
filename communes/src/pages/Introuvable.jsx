import { Link } from 'react-router'

function Introuvable() {
  return (
    <section>
      <h1>Page introuvable</h1>
      <p>Cette adresse ne correspond à aucune page du site.</p>
      <Link to="/">← Retour à la recherche</Link>
    </section>
  )
}

export default Introuvable
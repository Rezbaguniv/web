import { useState } from 'react'

function Carte({ emoji, titre, description, onSupprimer }) {
  const [likes, setLikes] = useState(0)

  return (
    <article className="carte">
      <span className="carte-emoji">{emoji}</span>
      <h2>{titre}</h2>
      <p>{description}</p>
      <div className="carte-actions">
        <button onClick={() => setLikes(likes + 1)}>👍 {likes}</button>
        <button onClick={onSupprimer}>Supprimer</button>
      </div>
    </article>
  )
}

export default Carte
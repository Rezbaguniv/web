import { useEffect, useState } from 'react'
import Carte from './Carte.jsx'
import './App.css'

const technosDepart = [
  { id: 1, emoji: '🌐', titre: 'HTML', description: 'La structure de la page.' },
  { id: 2, emoji: '🎨', titre: 'CSS', description: "L'apparence de la page." },
  { id: 3, emoji: '⚙️', titre: 'JavaScript', description: 'Le comportement de la page.' },
]

function App() {
  const prenom = 'Gabin'
  const [technos, setTechnos] = useState(() => {
    const sauvegarde = localStorage.getItem('technos')
    return sauvegarde ? JSON.parse(sauvegarde) : technosDepart
  })
  const [titre, setTitre] = useState('')
  const [description, setDescription] = useState('')
  const [recherche, setRecherche] = useState('')
  
  useEffect(() => {
    localStorage.setItem('technos', JSON.stringify(technos))
  }, [technos])

  function ajouter(event) {
    event.preventDefault()
    if (titre.trim() === '') return
    const nouvelle = { id: Date.now(), emoji: '⭐', titre: titre, description: description }
    setTechnos([...technos, nouvelle])
    setTitre('')
    setDescription('')
  }

  function supprimer(id) {
    setTechnos(technos.filter((t) => t.id !== id))
  }

  const visibles = technos.filter((t) =>
    t.titre.toLowerCase().includes(recherche.toLowerCase()),
  )

  return (
    <main>
      <h1>Bonjour, je suis {prenom}</h1>
      <p>Voici les technologies que j'apprends.</p>

      <form onSubmit={ajouter}>
        <input
          value={titre}
          onChange={(event) => setTitre(event.target.value)}
          placeholder="Titre"
        />
        <input
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Description"
        />
        <button type="submit">Ajouter</button>
      </form>

      <input
        className="recherche"
        value={recherche}
        onChange={(event) => setRecherche(event.target.value)}
        placeholder="Rechercher une technologie"
      />

      {visibles.length === 0 && <p>Aucune technologie à afficher.</p>}

      {visibles.map((t) => (
        <Carte
          key={t.id}
          emoji={t.emoji}
          titre={t.titre}
          description={t.description}
          onSupprimer={() => supprimer(t.id)}
        />
      ))}
    </main>
  )
}

export default App
import Carte from './Carte.jsx'
import './App.css'

function App() {
  const prenom = 'Gabin'

  return (
    <main>
      <h1>Bonjour, je suis {prenom}</h1>
      <p>Ceci est ma première page React.</p>
      <Carte emoji="🌐" titre="HTML" description="La structure de la page." />
      <Carte emoji="🎨" titre="CSS" description="L'apparence de la page." />
      <Carte emoji="⚙️" titre="JavaScript" description="Le comportement de la page." />
    </main>
  )
}

export default App
import { useEffect, useState } from 'react'
import type { Commune } from './types.ts'

export function useFavoris() {
  const [favoris, setFavoris] = useState<Commune[]>(() => {
    const sauvegarde = localStorage.getItem('favoris')
    return sauvegarde ? JSON.parse(sauvegarde) : []
  })

  useEffect(() => {
    localStorage.setItem('favoris', JSON.stringify(favoris))
  }, [favoris])

  function estFavori(commune: Commune) {
    return favoris.some((f) => f.code === commune.code)
  }

  function basculer(commune: Commune) {
    if (estFavori(commune)) {
      setFavoris(favoris.filter((f) => f.code !== commune.code))
    } else {
      setFavoris([...favoris, commune])
    }
  }

  return { favoris, estFavori, basculer }
}
export type Departement = {
  code: string
  nom: string
}

export type Region = {
  code: string
  nom: string
}

export type Commune = {
  nom: string
  code: string
  population?: number
  codesPostaux?: string[]
  surface?: number
  departement?: Departement
  region?: Region
}


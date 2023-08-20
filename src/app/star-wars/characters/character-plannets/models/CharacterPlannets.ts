export interface CharacterPlannets {
  message: string
  result: Result
}

export interface Result {
  properties: Properties
  description: string
  _id: string
  uid: string
  __v: number
}

export interface Properties {
  diameter: string
  rotation_period: string
  orbital_period: string
  gravity: string
  population: string
  climate: string
  terrain: string
  surface_water: string
  created: string
  edited: string
  name: string
  url: string
}

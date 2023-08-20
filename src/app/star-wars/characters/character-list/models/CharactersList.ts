export interface CharactersList {
    message: string
    total_records: number
    total_pages: number
    previous: any
    next: string
    results: Character[]
  }
  
  export interface Character {
    uid: string
    name: string
    url: string
  }
  
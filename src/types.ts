export type TCard = {
  id: string
  title: string
  list: {
    id: string
    text: string
    checked?: boolean
  }[]
}

export type TBoard = {
  id: string
  title: string
  cards: TCard[]
}

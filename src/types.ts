export type TItem = {
  id: string
  text: string
  checked?: boolean
}

export type TCard = {
  id: string
  title: string
  list: TItem[]
}

export type TBoard = {
  id: string
  title: string
  cards: TCard[]
}

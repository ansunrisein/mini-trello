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

export type TBoardAction = {
  type: string
  board: TBoard
  card?: TCard
  title?: TBoard['title']
}

export type TBoardState = {
  boards: TBoard[]
}

export type DispatchType = (args: TBoardAction) => TBoardAction

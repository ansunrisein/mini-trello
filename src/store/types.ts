import {TBoard, TCard} from '@mt/types'
import {
  ADD_BOARD,
  ADD_BOARD_CARD,
  ADD_LIST_ITEM,
  CHANGE_BOARD_CARD,
  CHANGE_BOARD_TITLE,
  REMOVE_BOARD,
  REMOVE_BOARD_CARD,
} from '@mt/store/actionTypes'

export type TAction =
  | TAddBoard
  | TChangeBoardTitle
  | TRemoveBoard
  | TAddBoardCard
  | TRemoveBoardCard
  | TChangeBoardCard
  | TAddListItem

export type TBoardState = {
  boards: TBoard[]
}

export type TAddBoard = {
  type: typeof ADD_BOARD
}

export type TChangeBoardTitle = {
  type: typeof CHANGE_BOARD_TITLE
  board: TBoard
  title: TBoard['title']
}

export type TRemoveBoard = {
  type: typeof REMOVE_BOARD
  board: TBoard
}

export type TAddBoardCard = {
  type: typeof ADD_BOARD_CARD
  board: TBoard
}

export type TRemoveBoardCard = {
  type: typeof REMOVE_BOARD_CARD
  board: TBoard
  card: TCard
}

export type TChangeBoardCard = {
  type: typeof CHANGE_BOARD_CARD
  board: TBoard
  card: TCard
}

export type TAddListItem = {
  type: typeof ADD_LIST_ITEM
  board: TBoard
  card: TCard
}

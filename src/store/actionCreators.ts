import {TBoard, TCard} from '@mt/types'
import {
  ADD_BOARD,
  ADD_BOARD_CARD,
  ADD_LIST_ITEM,
  CHANGE_BOARD_CARD,
  CHANGE_BOARD_TITLE,
  MOVE_LIST_ITEM,
  REMOVE_BOARD,
  REMOVE_BOARD_CARD,
} from '@mt/store/actionTypes'
import {
  TAddBoard,
  TAddBoardCard,
  TAddListItem,
  TChangeBoardCard,
  TChangeBoardTitle,
  TMoveListItem,
  TRemoveBoard,
  TRemoveBoardCard,
} from '@mt/store/types'

export const addBoard = (): TAddBoard => ({
  type: ADD_BOARD,
})

export const removeBoard = (board: TBoard): TRemoveBoard => ({
  type: REMOVE_BOARD,
  board,
})

export const changeBoardTitle = (board: TBoard, title: TBoard['title']): TChangeBoardTitle => ({
  type: CHANGE_BOARD_TITLE,
  title,
  board,
})

export const addBoardCard = (board: TBoard): TAddBoardCard => ({
  type: ADD_BOARD_CARD,
  board,
})

export const removeBoardCard = (board: TBoard, card: TCard): TRemoveBoardCard => ({
  type: REMOVE_BOARD_CARD,
  board,
  card,
})

export const changeBoardCard = (board: TBoard, card: TCard): TChangeBoardCard => ({
  type: CHANGE_BOARD_CARD,
  board,
  card,
})

export const addListItem = (board: TBoard, card: TCard): TAddListItem => ({
  type: ADD_LIST_ITEM,
  board,
  card,
})

export const moveListItem = (
  boardId: TBoard['id'],
  distId: TCard['id'],
  srcId: TCard['id'],
  itemId: string,
  index: number,
): TMoveListItem => ({
  type: MOVE_LIST_ITEM,
  boardId,
  distId,
  srcId,
  itemId,
  index,
})

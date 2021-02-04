import {TBoard, TBoardAction, TCard} from '@mt/types'
import {
  ADD_BOARD,
  ADD_BOARD_CARD,
  ADD_LIST_ITEM,
  CHANGE_BOARD_CARD,
  CHANGE_BOARD_TITLE,
  REMOVE_BOARD,
  REMOVE_BOARD_CARD,
} from '@mt/store/actionTypes'

export const addBoard = (): {type: string} => ({
  type: ADD_BOARD,
})

export const removeBoard = (board: TBoard): TBoardAction => ({
  type: REMOVE_BOARD,
  board,
})

export const changeBoardTitle = (board: TBoard, title: TBoard['title']): TBoardAction => ({
  type: CHANGE_BOARD_TITLE,
  title,
  board,
})

export const addBoardCard = (board: TBoard): TBoardAction => ({
  type: ADD_BOARD_CARD,
  board,
})

export const removeBoardCard = (board: TBoard, card: TCard): TBoardAction => ({
  type: REMOVE_BOARD_CARD,
  board,
  card,
})

export const changeBoardCard = (board: TBoard, card: TCard): TBoardAction => ({
  type: CHANGE_BOARD_CARD,
  board,
  card,
})

export const addListItem = (board: TBoard, card: TCard): TBoardAction => ({
  type: ADD_LIST_ITEM,
  board,
  card,
})

import {v4} from 'uuid'
import {TBoardAction, TBoardState} from '@mt/types'
import {
  ADD_BOARD,
  ADD_BOARD_CARD,
  ADD_LIST_ITEM,
  CHANGE_BOARD_CARD,
  CHANGE_BOARD_TITLE,
  REMOVE_BOARD,
  REMOVE_BOARD_CARD,
} from './actionTypes'

export const initialState: TBoardState = {
  boards: [],
}

export const reducer = (state: TBoardState = initialState, action: TBoardAction): TBoardState => {
  switch (action.type) {
    case ADD_BOARD:
      return {
        boards: [
          ...state.boards,
          {
            id: v4(),
            title: 'My board' + state.boards.length,
            cards: [],
          },
        ],
      }
    case CHANGE_BOARD_TITLE:
      return {
        boards: state.boards.map(board =>
          action.board.id === board.id ? {...board, title: action.title || board.title} : board,
        ),
      }
    case REMOVE_BOARD:
      return {
        boards: state.boards.filter(e => e.id !== action.board.id),
      }
    case ADD_BOARD_CARD:
      return {
        boards: state.boards.map(board =>
          board.id === action.board.id
            ? {
                ...board,
                cards: [
                  ...board.cards,
                  {id: v4(), title: '', list: [{id: v4(), text: '', checked: false}]},
                ],
              }
            : board,
        ),
      }
    case CHANGE_BOARD_CARD:
      return {
        boards: state.boards.map(board =>
          board.id === action.board.id
            ? {
                ...board,
                cards: board.cards.map(card =>
                  card.id === action.card?.id
                    ? {
                        id: card.id,
                        title: action.card.title || card.title,
                        list:
                          action.card.list.length !== 1
                            ? action.card.list.filter(e => !!e.text)
                            : action.card.list,
                      }
                    : card,
                ),
              }
            : board,
        ),
      }
    case REMOVE_BOARD_CARD:
      return {
        boards: state.boards.map(e =>
          e.id === action.board.id
            ? {
                ...action.board,
                cards: action.board.cards.filter(e => e.id !== action.card?.id),
              }
            : e,
        ),
      }
    case ADD_LIST_ITEM:
      return {
        boards: state.boards.map(board =>
          board.id === action.board.id
            ? {
                ...board,
                cards: board.cards.map(card =>
                  card.id === action.card?.id
                    ? {
                        ...card,
                        list: [
                          ...(action.card.list.length !== 1
                            ? action.card.list.filter(e => !!e.text)
                            : action.card.list),
                          {id: v4(), text: '', checked: false},
                        ],
                      }
                    : card,
                ),
              }
            : board,
        ),
      }
    default:
      return state
  }
}

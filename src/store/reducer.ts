import {v4} from 'uuid'
import * as R from 'ramda'
import {TBoard, TCard, TItem} from '@mt/types'
import {TAction, TBoardState} from './types'
import {adjustBoardById, adjustCardById, idEq} from './helpers'
import {
  ADD_BOARD,
  ADD_BOARD_CARD,
  ADD_LIST_ITEM,
  CHANGE_BOARD_CARD,
  CHANGE_BOARD_TITLE,
  MOVE_LIST_ITEM,
  REMOVE_BOARD,
  REMOVE_BOARD_CARD,
} from './actionTypes'

export const initialState: TBoardState = {
  boards: [],
}

export const reducer = (state: TBoardState = initialState, action: TAction): TBoardState => {
  switch (action.type) {
    case ADD_BOARD:
      return R.evolve(
        {
          boards: R.append<TBoard>({
            id: v4(),
            title: 'My board' + state.boards.length,
            cards: [],
          }),
        },
        state,
      )
    case CHANGE_BOARD_TITLE:
      return adjustBoardById(
        action.board.id,
        R.evolve({
          title: title => action.title || title,
        }),
        state,
      )
    case REMOVE_BOARD:
      return R.evolve(
        {
          boards: R.reject(idEq(action.board.id)),
        },
        state,
      )
    case ADD_BOARD_CARD:
      return adjustBoardById(
        action.board.id,
        R.evolve({
          cards: R.append<TCard>({
            id: v4(),
            title: '',
            list: [{id: v4(), text: '', checked: false}],
          }),
        }),
        state,
      )
    case CHANGE_BOARD_CARD:
      return adjustBoardById(
        action.board.id,
        adjustCardById(
          action.card.id,
          R.evolve({
            title: title => action.card.title || title,
            list: () =>
              action.card.list.length !== 1
                ? action.card.list.filter(e => !!e.text)
                : action.card.list,
          }),
        ),
        state,
      )
    case REMOVE_BOARD_CARD:
      return adjustBoardById(
        action.board.id,
        R.evolve({
          cards: R.reject(idEq(action.card.id)),
        }),
        state,
      )
    case ADD_LIST_ITEM:
      return adjustBoardById(
        action.board.id,
        adjustCardById(
          action.card.id,
          R.evolve({
            list: (list: TItem[]) => [
              ...(list.length !== 1 ? list.filter(e => !!e.text) : list),
              {id: v4(), text: '', checked: false},
            ],
          }),
        ),
        state,
      )
    case MOVE_LIST_ITEM: {
      const item = state.boards
        .find(idEq(action.boardId))
        ?.cards.find(idEq(action.srcId))
        ?.list.find(idEq(action.itemId))

      if (item && action.srcId === action.distId) {
        return adjustBoardById(
          action.boardId,
          adjustCardById(
            action.srcId,
            R.evolve({
              list: (list: TItem[]) => R.move(R.indexOf(item, list), action.index, list),
            }),
          ),
          state,
        )
      } else if (item) {
        return adjustBoardById(
          action.boardId,
          R.evolve({
            cards: R.map((card: TCard) =>
              [action.srcId, action.distId].includes(card.id)
                ? R.evolve(
                    {
                      list:
                        card.id === action.srcId
                          ? R.reject<TItem>(idEq(action.itemId))
                          : R.insert(action.index, item),
                    },
                    card,
                  )
                : card,
            ),
          }),
          state,
        )
      }
      return state
    }
    default:
      return state
  }
}

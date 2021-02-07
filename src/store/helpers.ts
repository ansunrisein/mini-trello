import * as R from 'ramda'
import {TBoard, TCard} from '@mt/types'

export const adjustIf = <T>(
  predicate: (e: T) => boolean,
  update: (e: T) => T,
): ((arr: T[]) => T[]) => R.map(R.when(predicate, update))

export const idEq = R.propEq('id')

export const adjustBoardById = <T extends {boards: TBoard[]}>(
  id: TBoard['id'],
  update: (board: TBoard) => TBoard,
  state: T,
): T =>
  R.evolve(
    {
      boards: adjustIf<TBoard>(idEq(id), update),
    },
    state,
  ) as T

export const adjustCardById = (id: TCard['id'], update: (card: TCard) => TCard) => (
  board: TBoard,
): TBoard =>
  R.evolve(
    {
      cards: adjustIf<TCard>(idEq(id), update),
    },
    board,
  )

import React from 'react'
import {useSelector} from 'react-redux'
import {useParams} from 'react-router'
import {Board} from '@mt/components'
import {TBoardState} from '@mt/store/types'

export const BoardPage: React.FC = () => {
  const {id} = useParams<{id: string}>()
  const board = useSelector((state: TBoardState) => state.boards.find(e => e.id === id))

  if (!board) {
    return <>Not Found</>
  }

  return <Board board={board} />
}

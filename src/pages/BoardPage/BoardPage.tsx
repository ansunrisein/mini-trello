import React from 'react'
import {useSelector} from 'react-redux'
import {useParams} from 'react-router'
import {TBoardState} from '@mt/types'
import {Board} from '@mt/components'

export const BoardPage: React.FC = () => {
  const {id} = useParams<{id: string}>()
  const board = useSelector((state: TBoardState) => state.boards.find(e => e.id === id))

  if (!board) return <>Not Found</>

  return <Board board={board} />
}

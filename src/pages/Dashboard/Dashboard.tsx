import React from 'react'
import {connect, useSelector} from 'react-redux'
import {Flex} from 'reflexbox'
import {Link} from 'react-router-dom'
import {TBoard} from '@mt/types'
import {TBoardState} from '@mt/store/types'
import {addBoard, removeBoard} from '@mt/store'
import {Button} from '@mt/ui'
import styles from './Dashboard.module.scss'

export type DashboardProps = {
  addNewBoard: () => void
  removeBoard: (board: TBoard) => () => void
}

export const DashboardComponent: React.FC<DashboardProps> = ({addNewBoard, removeBoard}) => {
  const boards = useSelector((state: TBoardState) => state.boards)

  return (
    <Flex flexDirection="column">
      <Button className={styles.add} primary onClick={addNewBoard}>
        Add board
      </Button>
      <div className={styles.grid}>
        {boards.map(e => (
          <Flex
            justifyContent="space-between"
            alignItems="center"
            flexShrink={0}
            className={styles.board}
            key={e.id}
          >
            <Link to={`/board/${e.id}`}>
              <h1 className={styles.title}>{e.title}</h1>
            </Link>
            <Button className={styles.remove} onClick={removeBoard(e)}>
              Remove
            </Button>
          </Flex>
        ))}
      </div>
    </Flex>
  )
}

export const Dashboard = connect(null, dispatch => ({
  addNewBoard: () => dispatch(addBoard()),
  removeBoard: (board: TBoard) => () => dispatch(removeBoard(board)),
}))(DashboardComponent)

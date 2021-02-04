import React, {useCallback} from 'react'
import {Box, Flex} from 'reflexbox'
import {useForm} from 'react-hook-form'
import {connect} from 'react-redux'
import c from 'classnames'
import {DragDropContext, DropResult} from 'react-beautiful-dnd'
import {TBoard, TCard} from '@mt/types'
import {
  addBoardCard,
  addListItem,
  changeBoardCard,
  changeBoardTitle,
  moveListItem,
  removeBoardCard,
} from '@mt/store'
import {Card} from '@mt/components'
import {Button, Input} from '@mt/ui'
import styles from './Board.module.scss'

export type BoardProps = {
  board: TBoard
  addCard: () => void
  changeCard: (card: TCard) => void
  removeCard: (card: TCard) => () => void
  changeBoardTitle: (title: TBoard['title']) => void
  addListItem: (card: TCard) => void
  moveListItem: (distId: TCard['id'], srcId: TCard['id'], itemId: string, index: number) => void
}

export const BoardComponent: React.FC<BoardProps> = ({
  board,
  addCard,
  changeCard,
  removeCard,
  changeBoardTitle,
  addListItem,
  moveListItem,
}) => {
  const {register, watch} = useForm({mode: 'onChange', defaultValues: {title: board.title}})

  const onChangeTitle = useCallback(() => {
    changeBoardTitle(watch().title)
  }, [changeBoardTitle, watch])

  const onDragEnd = ({draggableId, source, destination}: DropResult) => {
    if (destination)
      moveListItem(destination.droppableId, source.droppableId, draggableId, destination.index)
  }

  return (
    <Flex flexDirection="column">
      <form>
        <Input
          name="title"
          className={styles.title}
          ref={register({required: true})}
          onChange={onChangeTitle}
        />
      </form>
      <Button
        primary
        onClick={addCard}
        className={c(
          styles.add,
          (!board.cards.length || board.cards[board.cards.length - 1].title) && styles.active,
        )}
      >
        Add card
      </Button>
      <DragDropContext onDragEnd={onDragEnd}>
        <Flex marginTop="1rem" className={styles.list}>
          {board.cards.map(e => (
            <Box flexShrink={0} key={e.id}>
              <Card
                card={e}
                onChange={changeCard}
                onListItemAdd={addListItem}
                onRemove={removeCard(e)}
              />
            </Box>
          ))}
        </Flex>
      </DragDropContext>
    </Flex>
  )
}

export const Board = connect(null, (dispatch, {board}: any) => ({
  changeBoardTitle: (title: TBoard['title']) => dispatch(changeBoardTitle(board, title)),
  addCard: () => dispatch(addBoardCard(board)),
  changeCard: (card: TCard) => dispatch(changeBoardCard(board, card)),
  removeCard: (card: TCard) => () => dispatch(removeBoardCard(board, card)),
  addListItem: (card: TCard) => dispatch(addListItem(board, card)),
  moveListItem: (distId: TCard['id'], srcId: TCard['id'], itemId: string, index: number) =>
    dispatch(moveListItem(board.id, distId, srcId, itemId, index)),
}))(BoardComponent)

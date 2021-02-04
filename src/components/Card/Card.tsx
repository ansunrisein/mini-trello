import React, {useCallback, useEffect} from 'react'
import {useForm} from 'react-hook-form'
import {Flex} from 'reflexbox'
import c from 'classnames'
import {Draggable, Droppable} from 'react-beautiful-dnd'
import {TCard} from '@mt/types'
import {Button, Checkbox, Input} from '@mt/ui'
import {useOnEnter} from '@mt/hooks'
import styles from './Card.module.scss'

export type CardProps = {
  card: TCard
  onChange?: (card: TCard) => void
  onRemove?: () => void
  onListItemAdd?: (card: TCard) => void
}

export const Card: React.FC<CardProps> = ({card, onChange, onListItemAdd, onRemove}) => {
  const {register, watch, reset} = useForm({mode: 'onChange', defaultValues: card})

  useEffect(() => reset(card), [card, reset])

  const save = useCallback(() => {
    onChange?.({...card, ...watch()})
  }, [card, onChange, watch])

  const onEnter = useOnEnter(() => onListItemAdd?.(card))

  return (
    <Droppable droppableId={card.id}>
      {provided => (
        <Flex flexDirection="column" as="form" marginRight="1rem" className={styles.container}>
          <Input
            placeholder="Title..."
            primary
            name="title"
            ref={register({required: true})}
            className={styles.title}
            onChange={save}
          />
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {card.list.map((e, i) => (
              <Draggable key={e.id} draggableId={e.id} index={i}>
                {provided => (
                  <Flex
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    as="li"
                    justifyContent="space-between"
                    alignItems="center"
                    className={styles.item}
                  >
                    <input name={`list[${i}].id`} hidden readOnly ref={register()} value={e.id} />
                    <Input
                      name={`list[${i}].text`}
                      className={c(styles.text, e.checked && styles.checked)}
                      ref={register({required: true})}
                      onChange={save}
                      onKeyDown={onEnter}
                      placeholder="Item"
                      autoFocus
                    />
                    {e.text && (
                      <Checkbox
                        ref={register()}
                        name={`list[${i}].checked`}
                        onChange={save}
                        className={styles.checkbox}
                      />
                    )}
                  </Flex>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
          <Button onClick={() => onRemove?.()} className={styles.cross}>
            X
          </Button>
        </Flex>
      )}
    </Droppable>
  )
}

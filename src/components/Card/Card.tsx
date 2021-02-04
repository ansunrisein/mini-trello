import React, {useCallback} from 'react'
import {useForm} from 'react-hook-form'
import {Flex} from 'reflexbox'
import c from 'classnames'
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
  const {register, watch} = useForm({mode: 'onChange', defaultValues: card})

  const save = useCallback(() => {
    onChange?.({...card, ...watch()})
  }, [card, onChange, watch])

  const onEnter = useOnEnter(() => onListItemAdd?.(card))

  return (
    <Flex flexDirection="column" as="form" marginRight="1rem" className={styles.container}>
      <Input
        placeholder="Title..."
        primary
        name="title"
        ref={register({required: true})}
        className={styles.title}
        onChange={save}
      />
      <ul>
        {card.list.map((e, i) => (
          <Flex
            as="li"
            key={e.id}
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
        ))}
      </ul>
      <Button onClick={save} className={styles.save}>
        Save
      </Button>
      <Button onClick={() => onRemove?.()} className={styles.cross}>
        X
      </Button>
    </Flex>
  )
}

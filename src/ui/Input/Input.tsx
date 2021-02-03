import React, {forwardRef} from 'react'
import c from 'classnames'
import styles from './Input.module.scss'

export type InputProps = {
  primary?: boolean
} & JSX.IntrinsicElements['input']

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({primary, className, ...props}, ref) => (
    <input className={c(styles.input, className, primary && styles.primary)} {...props} ref={ref} />
  ),
)

Input.displayName = 'Input'

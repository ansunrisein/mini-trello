import React from 'react'
import c from 'classnames'
import styles from './Button.module.scss'

export type ButtonProps = {
  primary?: boolean
} & JSX.IntrinsicElements['button']

export const Button: React.FC<ButtonProps> = ({
  type = 'button',
  children,
  primary,
  className,
  ...props
}) => (
  <button className={c(styles.button, className, primary && styles.primary)} type={type} {...props}>
    {children}
  </button>
)

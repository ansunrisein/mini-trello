import React, {ButtonHTMLAttributes} from 'react'
import c from 'classnames'
import {useTheme} from '@mt/ui/Theme'
import {Light} from './Light'
import {Dark} from './Dark'
import styles from './ThemeSwitcher.module.scss'

export type ThemeSwitcherProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({className, ...props}) => {
  const {theme, setTheme} = useTheme()

  const onClick = () => setTheme(theme => (theme === 'dark' ? 'light' : 'dark'))

  return (
    <button onClick={onClick} className={c(className, styles.button)} {...props}>
      {theme === 'light' ? <Dark className={styles.icon} /> : <Light className={styles.icon} />}
    </button>
  )
}

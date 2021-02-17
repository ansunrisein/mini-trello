import React from 'react'
import {Link} from 'react-router-dom'
import {ThemeContainer, ThemeSwitcher} from '@mt/ui'
import styles from './Template.module.scss'

export const Template: React.FC = ({children}) => (
  <ThemeContainer>
    <div className={styles.background}>
      <header className={styles.header}>
        <Link to="/">
          <span className={styles.title}>Mini trello</span>
        </Link>
      </header>
      <div className={styles.children}>{children}</div>
      <ThemeSwitcher className={styles.switcher} />
    </div>
  </ThemeContainer>
)

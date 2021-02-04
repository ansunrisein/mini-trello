import React from 'react'
import {Link} from 'react-router-dom'
import styles from './Template.module.scss'

export const Template: React.FC = ({children}) => (
  <div className={styles.background}>
    <header className={styles.header}>
      <Link to="/">
        <span className={styles.title}>Mini trello</span>
      </Link>
    </header>
    <div className={styles.children}>{children}</div>
  </div>
)

import React from 'react'
import {ThemeContext, ThemeProvider} from './ThemeContext'

export const ThemeContainer: React.FC = ({children}) => (
  <ThemeProvider>
    <ThemeContext.Consumer>
      {({theme}) => <div className={`theme-${theme}`}>{children}</div>}
    </ThemeContext.Consumer>
  </ThemeProvider>
)

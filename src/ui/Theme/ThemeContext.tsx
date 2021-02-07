import React, {createContext, useContext, useState} from 'react'

export type Theme = 'dark' | 'light'
export type ThemeContextValue = {
  theme: Theme
  setTheme: React.Dispatch<React.SetStateAction<Theme>>
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: 'dark',
  setTheme: () => void 0,
})

export const ThemeProvider: React.FC = ({children}) => {
  const [theme, setTheme] = useState<Theme>('dark')

  const value = {
    theme,
    setTheme,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = (): ThemeContextValue => useContext(ThemeContext)

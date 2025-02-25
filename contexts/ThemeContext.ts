import { createContext } from "react"

export type AppTheme = 'light' | 'dark'
export type ThemeContextType = {
    theme: AppTheme
    setTheme: (theme: AppTheme) => void
}

export const AppThemeContext = createContext<ThemeContextType>({} as ThemeContextType)

import { useColorScheme, View } from 'react-native'
import { MD3DarkTheme, MD3LightTheme, PaperProvider, ThemeProvider, adaptNavigationTheme } from "react-native-paper"
import { createStaticNavigation, DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme, NavigationIndependentTree } from "@react-navigation/native"
import merge from "deepmerge"

import { Colors } from "../constants/Colors"
import { AppTheme, AppThemeContext } from '@/contexts/ThemeContext'
import { useState, useContext } from 'react'
import HomePage from './home'
import LoginPage from './authentication/login'
import RegisterPage from './authentication/register'
import useAuthStore from '@/stores/authStore'
import ForgotPasswordPage from './authentication/forgot-password'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const customDarkTheme = { ...MD3DarkTheme, colors: Colors.dark }
const customLightTheme = { ...MD3LightTheme, colors: Colors.light }

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedLightTheme = merge(LightTheme, customLightTheme)
const CombinedDarkTheme = merge(DarkTheme, customDarkTheme)

const loggedOutScreens = {
  register: RegisterPage,
  login: LoginPage,
  forgotPassword: ForgotPasswordPage
}

const loggedInScreens = {
  home: HomePage
}

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const [theme, setTheme] = useState<AppTheme>('light')
  const isDarkTheme = theme === 'dark'
  const paperTheme = isDarkTheme ? CombinedDarkTheme : CombinedLightTheme
  const { user } = useAuthStore()

  const RootStack = createNativeStackNavigator({
    groups: {
      loggedIn: {
        if: () => user != null,
        screens: loggedInScreens,
        screenOptions: {
          headerShown: false,
          statusBarStyle: 'dark',
          statusBarColor: 'transparent',
          navigationBarColor: '#ffffff'
        }
      },
      loggedOut: {
        if: () => user == null,
        screens: loggedOutScreens,
        screenOptions: {
          headerShown: false,
          statusBarStyle: 'dark',
          statusBarColor: 'transparent',
          navigationBarColor: '#ffffff'
        }
      }
    }
  })
  const Navigation = createStaticNavigation(RootStack)

  return (
    <AppThemeContext.Provider value={{theme, setTheme}}>
      <PaperProvider theme={paperTheme}>
        <NavigationIndependentTree>
          <Navigation theme={paperTheme} />
        </NavigationIndependentTree>
      </PaperProvider>
    </AppThemeContext.Provider>
  )
}
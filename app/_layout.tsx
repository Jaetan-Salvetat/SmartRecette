import { MD3DarkTheme, MD3LightTheme, PaperProvider, ProgressBar, ThemeProvider, adaptNavigationTheme } from "react-native-paper"
import { createStaticNavigation, DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme, NavigationIndependentTree, Theme } from "@react-navigation/native"
import merge from "deepmerge"

import { Colors } from "../constants/Colors"
import { AppTheme, AppThemeContext } from '@/contexts/ThemeContext'
import { useState, useContext, useEffect } from 'react'
import HomePage from './home'
import LoginPage from './authentication/login'
import RegisterPage from './authentication/register'
import useAuthStore from '@/stores/authStore'
import ForgotPasswordPage from './authentication/forgot-password'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CreateManuallyPage from './create-manually'
import TakePhotoPage from "./take-photo"

const customDarkTheme = { ...MD3DarkTheme, colors: Colors.dark }
const customLightTheme = { ...MD3LightTheme, colors: Colors.light }

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedLightTheme = merge(LightTheme, customLightTheme)
const CombinedDarkTheme = merge(DarkTheme, customDarkTheme)

const loggedOutScreens = {
  login: LoginPage,
  register: RegisterPage,
  forgotPassword: ForgotPasswordPage
}

const loggedInScreens = {
  home: HomePage,
  createManually: CreateManuallyPage,
  takePhoto: TakePhotoPage
}

export default function RootLayout() {
  const [theme, setTheme] = useState<AppTheme>('light')
  const isDarkTheme = theme === 'dark'
  const paperTheme = isDarkTheme ? CombinedDarkTheme : CombinedLightTheme
  const { user, loadAuth } = useAuthStore()

  useEffect(() => {
    loadAuth()
  }, [])

  const RootStack = createNativeStackNavigator({
    groups: {
      loggedIn: {
        if: () => user !== null,
        screens: loggedInScreens,
        screenOptions: {
          headerShown: false,
          statusBarStyle: 'dark',
          navigationBarColor: 'transparent'
        }
      },
      loggedOut: {
        if: () => user === null,
        screens: loggedOutScreens,
        screenOptions: {
          headerShown: false,
          statusBarStyle: 'dark',
          navigationBarColor: 'transparent'
        }
      }
    }
  })
  const Navigation = createStaticNavigation(RootStack)

  return (
    <AppThemeContext.Provider value={{theme, setTheme}}>
      <PaperProvider theme={paperTheme}>
        <NavigationIndependentTree>
          <Navigation theme={paperTheme as Theme} />
        </NavigationIndependentTree>
      </PaperProvider>
    </AppThemeContext.Provider>
  )
}
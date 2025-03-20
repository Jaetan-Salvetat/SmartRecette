import React, { useState, useEffect } from "react"
import { View, StyleSheet } from "react-native"
import { Portal, ActivityIndicator, Modal } from "react-native-paper"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import useRecipeStore from "@/stores/recipeStore"
import HomeEmptyState from "@/components/home/HomeEmptyState"
import HomeRecipesList from "@/components/home/HomeRecipesList"
import HomeFabs from "@/components/home/HomeFabs"
import HomeHeader from "@/components/home/HomeHeader"
import LogoutDialog from "@/components/LogoutDialog"
import { useNavigation } from "expo-router"
import useAuthStore from "@/stores/authStore"


export default function HomePage() {
const navigation = useNavigation()
  const insets = useSafeAreaInsets()
  const { recipes, isLoading, loadRecipes } = useRecipeStore()
  const { user } = useAuthStore()
  const [searchQuery, setSearchQuery] = useState("")
  const [isFabOpen, setIsFabOpen] = useState(false)
  const [logoutDialogVisible, setLogoutDialogVisible] = useState(false)

  useEffect(() => {
    if (user) {
      loadRecipes(user.$id)
    }
  }, [user])

  const filteredRecipes = searchQuery
    ? recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : recipes

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
        <HomeHeader
            setLogoutDialogVisible={setLogoutDialogVisible}
            setSearchQuery={setSearchQuery}
            searchQuery={searchQuery}
        />

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      ) : recipes.length === 0 ? (
        <HomeEmptyState navigation={navigation} />
      ) : (
        <HomeRecipesList filteredRecipes={filteredRecipes} searchQuery={searchQuery} />
      )}

      <HomeFabs
        isFabOpen={isFabOpen}
        setIsFabOpen={setIsFabOpen}
        navigation={navigation}
      />
      <LogoutDialog
        logoutDialogVisible={logoutDialogVisible}
        setLogoutDialogVisible={setLogoutDialogVisible}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5"
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})
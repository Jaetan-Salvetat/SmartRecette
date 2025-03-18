import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native"
import { Portal, ActivityIndicator } from "react-native-paper"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import useRecipeStore from "@/stores/recipeStore"
import HomeEmptyState from "@/components/home/HomeEmptyState";
import HomeRecipesList from "@/components/home/HomeRecipesList";
import HomeFabs from "@/components/home/HomeFabs";
import HomeHeader from "@/components/home/HomeHeader";
import LogoutDialog from "@/components/LogoutDialog";

export default function HomePage() {
  const insets = useSafeAreaInsets()
  const { recipes, isLoading, loadRecipes } = useRecipeStore()
  const [searchQuery, setSearchQuery] = useState("")
  const [isFabOpen, setIsFabOpen] = useState(false)
  const [logoutDialogVisible, setLogoutDialogVisible] = useState(false)

  useEffect(() => {
    loadRecipes()
  }, [])

  const filteredRecipes = searchQuery
    ? recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : recipes

  const handlePhotoCapture = () => {
    setIsFabOpen(false);
  }

  const handleManualCreation = () => {
    setIsFabOpen(false);
  }

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
        <HomeEmptyState handlePhotoCapture={handlePhotoCapture} />
      ) : (
        <HomeRecipesList filteredRecipes={filteredRecipes} searchQuery={searchQuery} />
      )}

      <Portal>
        <HomeFabs
          handlePhotoCapture={handlePhotoCapture}
          handleManualCreation={handleManualCreation}
          isFabOpen={isFabOpen}
          setIsFabOpen={setIsFabOpen}
        />

        <LogoutDialog
          logoutDialogVisible={logoutDialogVisible}
          setLogoutDialogVisible={setLogoutDialogVisible}
        />
      </Portal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
})
import React from "react"
import { StyleSheet, KeyboardAvoidingView, Platform } from "react-native"
import { useNavigation } from "expo-router"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Recipe } from "@/models/Recipe"
import useRecipeStore from "@/stores/recipeStore"
import CreateManuallyHeader from "@/components/recipe/recipe-form/CreateManuallyHeader"
import RecipeForm from "@/components/recipe/recipe-form/RecipeForm"
import useAuthStore from "@/stores/authStore"

export default function CreateManuallyPage() {
    const navigation = useNavigation()
    const insets = useSafeAreaInsets()
    const { addRecipe, isLoading } = useRecipeStore()
    const { user } = useAuthStore()

    const handleSaveRecipe = async (recipe: Recipe) => {
        try {
            recipe.user = user!.$id
            await addRecipe(recipe)
            navigation.goBack()
        } catch (error) {
            console.error("Error adding recipe:", error)
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={[styles.container, { paddingTop: insets.top }]}
        >
            <CreateManuallyHeader />
            <RecipeForm 
                handleOnSave={handleSaveRecipe}
                isLoading={isLoading}
            />
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5"
    }
})
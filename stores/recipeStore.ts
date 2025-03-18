import { create } from 'zustand'
import { database } from './appwrite'

import { Recipe } from '@/models/Recipe'
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry'
import { ID, Models } from 'react-native-appwrite'

const recipeId = process.env.EXPO_PUBLIC_APPWRITE_RECIPE_COLLECTION_ID || ''
const ingredientId = process.env.EXPO_PUBLIC_APPWRITE_INGREDIENT_COLLECTION_ID || ''
const tagId = process.env.EXPO_PUBLIC_APPWRITE_TAG_COLLECTION_ID || ''
const databaseId = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID || ''

interface RecipeStore {
    recipes: Recipe[]
    isLoading: boolean

    loadRecipes: () => Promise<void>
    addRecipe: (recipe: Recipe) => Promise<void>
    updateRecipe: (recipe: Recipe) => Promise<void>
    deleteRecipe: (recipe: Recipe) => Promise<void>
}

const useRecipeStore = create<RecipeStore>((set, get) => ({
    recipes: [],
    isLoading: false,
    loadRecipes: async () => {
        set({ isLoading: true })
        try {
            const recipes = await database.listDocuments(databaseId, recipeId)
            set({ recipes: documentsToRecipes(recipes.documents), isLoading: false })
        } catch (error) {
            set({ isLoading: false })
        }
    },
    addRecipe: async (recipe: Recipe) => {
        set({ isLoading: true })
        try {
            await database.createDocument(databaseId, recipeId, ID.unique(), recipe)
            await get().loadRecipes()
        } catch (error) {
            console.error(error)
            set({ isLoading: false })
        }
    },
    updateRecipe: async (recipe: Recipe) => {
        set({ isLoading: true })
        try {
            await database.updateDocument(databaseId, recipeId, recipe.$id, recipe)
            await get().loadRecipes()
        } catch (error) {
            console.error(error)
            set({ isLoading: false })
        }
    },
    deleteRecipe: async (recipe: Recipe) => {
        set({ isLoading: true })
        try {
            await database.deleteDocument(databaseId, recipeId, recipe.$id)
            await get().loadRecipes()
        } catch (error) {
            console.error(error)
            set({ isLoading: false })
        }
    },
}))

function documentsToRecipes(documents: Models.Document[]): Recipe[] {
    return documents.map((document) => ({
        $id: document.$id,
        name: document.name,
        description: document.description,
        prepTime: document.prepTime,
        isPublic: document.isPublic,
        ingredients: document.ingredients,
        instructions: document.instructions,
        tags: document.tags
    }))
}

export default useRecipeStore
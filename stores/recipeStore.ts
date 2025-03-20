import { create } from 'zustand'
import { database } from './appwrite'

import { Recipe } from '@/models/Recipe'
import { ID, Models, Query } from 'react-native-appwrite'

const recipeId = process.env.EXPO_PUBLIC_APPWRITE_RECIPE_COLLECTION_ID || ''
const databaseId = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID || ''

interface RecipeStore {
    recipes: Recipe[]
    isLoading: boolean

    loadRecipes: (userId: string) => Promise<void>
    addRecipe: (recipe: Recipe) => Promise<Recipe>
    updateRecipe: (recipe: Recipe) => Promise<void>
    deleteRecipe: (recipe: Recipe) => Promise<void>
}

const useRecipeStore = create<RecipeStore>((set, get) => ({
    recipes: [],
    isLoading: false,
    loadRecipes: async (userId: string) => {
        set({ isLoading: true })
        try {
            const recipes = await database.listDocuments(databaseId, recipeId, [Query.equal('user', userId)])
            set({ recipes: documentsToRecipes(recipes.documents), isLoading: false })
        } catch (error) {
            set({ isLoading: false })
        }
    },
    addRecipe: async (recipe: Recipe) => {
        set({ isLoading: true })
        try {
            const newRecipe = await database.createDocument(
                databaseId,
                recipeId,
                ID.unique(),
                {...recipe, $id: null}
            )
            
            await get().loadRecipes(recipe.user)
            return documentToRecipe(newRecipe)
        } catch (error) {
            console.error(error)
            set({ isLoading: false })
            throw error
        }
    },
    updateRecipe: async (recipe: Recipe) => {
        set({ isLoading: true })
        try {
            await database.updateDocument(databaseId, recipeId, recipe.$id!, recipe)
            await get().loadRecipes(recipe.user)
        } catch (error) {
            console.error(error)
            set({ isLoading: false })
        }
    },
    deleteRecipe: async (recipe: Recipe) => {
        set({ isLoading: true })
        try {
            await database.deleteDocument(databaseId, recipeId, recipe.$id!)
            await get().loadRecipes(recipe.user)
        } catch (error) {
            console.error(error)
            set({ isLoading: false })
        }
    }
}))

function documentsToRecipes(documents: Models.Document[]): Recipe[] {
    return documents.map((document) => ({
        $id: document.$id,
        title: document.title,
        description: document.description,
        prepTime: document.prepTime,
        servings: document.servings,
        ingredients: document.ingredients,
        instructions: document.instructions,
        tags: document.tags,
        imageUrl: document.imageUrl,
        user: document.user
    }))
}

function documentToRecipe(document: Models.Document): Recipe {
    return {
        $id: document.$id,
        title: document.title,
        description: document.description,
        prepTime: document.prepTime,
        servings: document.servings,
        ingredients: document.ingredients,
        instructions: document.instructions,
        tags: document.tags,
        imageUrl: document.imageUrl,
        user: document.user
    }
}

export default useRecipeStore
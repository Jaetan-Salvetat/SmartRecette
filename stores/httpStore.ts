import { Ingredient, Recipe } from "@/models/Recipe"
import { create } from "zustand"

interface HttpStore {
    isLoading: boolean
    getRecipeFromImage: (image1: string, image2: string) => Promise<Recipe>
}

const useHttpStore = create<HttpStore>((set) => ({
    isLoading: false,
    getRecipeFromImage: async (image1: string, image2: string) => {
        set({ isLoading: true })
        try {
            const fileExtension = image1.split('.').pop()
            const mimeType = fileExtension === 'jpg' || fileExtension === 'jpeg' ? 'image/jpeg' : 'image/png'
            const formData = new FormData()
            formData.append('image1', {
                uri: image1,
                type: mimeType,
                name: `image1.${fileExtension}`
            } as any)
            
            formData.append('image2', {
                uri: image2,
                type: mimeType,
                name: `image2.${fileExtension}`
            } as any)
            
            const response = await fetch('https://smart-recette.jaetan.fr/recipes/test', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                body: formData
            })
            const data = await response.json()
            const recipe = data.recipe_content
            
            return {
                $id: null,
                title: recipe.title,
                description: recipe.description,
                prepTime: recipe.prepTime,
                servings: recipe.servings,
                isPublic: recipe.isPublic,
                imageUrl: recipe.imageUrl,
                user: recipe.user,
                ingredients: recipe.ingredients.map((ing: Ingredient) => ({
                    $id: null,
                    name: ing.name,
                    quantity: ing.quantity,
                    unit: ing.unit
                })),
                instructions: recipe.instructions,
                tags: recipe.tags
            }
        } catch (error) {
            console.error(error)
            throw Error("Failed to get recipe from image: " + error)
        } finally {
            set({ isLoading: false })
        }
    }
}))

export default useHttpStore
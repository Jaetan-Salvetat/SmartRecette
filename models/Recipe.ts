import { Models } from "react-native-appwrite"

interface Recipe {
    $id: string
    title: string
    description: string
    prepTime: number
    isPublic: boolean
    imageUrl: string
    ingredients: Ingredient[]
    instructions: string[]
    tags: Tag[]
}

interface Ingredient {
    $id: string
    name: string
    quantity: number
    unit: string
}

interface Tag {
    $id: string
    name: string
}

export { Recipe, Ingredient, Tag }
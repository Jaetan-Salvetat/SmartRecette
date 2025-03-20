interface Recipe {
    $id: string | null
    title: string
    description: string
    prepTime: number
    imageUrl: string | null
    servings: number
    user: string
    ingredients: Ingredient[]
    instructions: string[]
    tags: string[]
}

interface Ingredient {
    $id: string | null
    name: string
    quantity: number | null
    unit: string | null
}

export { Recipe, Ingredient }
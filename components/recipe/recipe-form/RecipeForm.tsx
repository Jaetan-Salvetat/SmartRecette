import React, { useEffect, useState } from "react"
import { StyleSheet, ScrollView } from "react-native"
import { Button } from "react-native-paper"
import { ID } from "react-native-appwrite"
import { Recipe, Ingredient } from "@/models/Recipe"
import RecipeGeneralInfoForm from "@/components/recipe/recipe-form/RecipeGeneralInfoForm"
import IngredientsForm from "@/components/recipe/recipe-form/IngredientsForm"
import InstructionsForm from "@/components/recipe/recipe-form/InstructionsForm"
import TagsForm from "@/components/recipe/recipe-form/TagsForm"
import useAuthStore from "@/stores/authStore"

interface RecipeFormProps {
    recipe?: Recipe | null
    handleOnSave: (recipe: Recipe) => void
    isLoading?: boolean
}

export default function RecipeForm({ recipe, handleOnSave, isLoading = false }: RecipeFormProps) {
    const { user } = useAuthStore()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [prepTime, setPrepTime] = useState("")
    const [instructions, setInstructions] = useState<string[]>([])
    const [ingredients, setIngredients] = useState<Ingredient[]>([])
    const [tags, setTags] = useState<string[]>([])
    const [newTagName, setNewTagName] = useState("");
    const [tagDialogVisible, setTagDialogVisible] = useState(false)
    const [errors, setErrors] = useState({
        title: false,
        prepTime: false,
    })

    useEffect(() => {
        console.log("recipe", recipe);
        
        if (recipe) {
            setTitle(recipe.title)
            setDescription(recipe.description)
            setPrepTime(recipe.prepTime.toString())
            setIngredients(recipe.ingredients)
            setInstructions(recipe.instructions)
            setTags(recipe.tags)
        }
    }, [recipe])

    const validateForm = () => {
        const newErrors = {
            title: title.trim() === "",
            prepTime: isNaN(Number(prepTime)) || Number(prepTime) <= 0,
        }
        
        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error)
    }

    const handleAddIngredient = () => {
        setIngredients([...ingredients, {
            $id: ID.unique(),
            name: "",
            quantity: 0,
            unit: ""
        }])
    }

    const handleRemoveIngredient = (index: number) => {
        const newIngredients = [...ingredients]
        newIngredients.splice(index, 1)
        setIngredients(newIngredients)
    }

    const handleIngredientChange = (index: number, field: keyof Ingredient, value: string | number) => {
        const newIngredients = [...ingredients]
        if (field === 'quantity') {
            newIngredients[index][field] = Number(value) || 0;
        } else {
            newIngredients[index][field] = value as string
        }
        setIngredients(newIngredients)
    }

    const handleAddInstruction = () => {
        setInstructions([...instructions, ""])
    }

    const handleRemoveInstruction = (index: number) => {
        const newInstructions = [...instructions]
        newInstructions.splice(index, 1)
        setInstructions(newInstructions)
    }

    const handleInstructionChange = (index: number, value: string) => {
        const newInstructions = [...instructions]
        newInstructions[index] = value
        setInstructions(newInstructions)
    }

    const handleAddTag = () => {
        if (newTagName.trim() !== "") {
            setTags([...tags, newTagName.trim()])
            setNewTagName("")
            setTagDialogVisible(false)
        }
    }

    const handleRemoveTag = (tag: string) => {
        setTags(tags.filter(tag => tag !== tag))
    }

    const handleSubmit = () => {
        if (!validateForm()) return

        const filteredIngredients = ingredients.filter(ing => ing.name.trim() !== "")
        const filteredInstructions = instructions.filter(inst => inst.trim() !== "")

        const recipeToSave: Recipe = {
            $id: recipe?.$id || ID.unique(),
            title: title.trim(),
            description: description.trim(),
            prepTime: Number(prepTime),
            servings: Number(2),
            isPublic: recipe?.isPublic ?? true,
            imageUrl: recipe?.imageUrl || null,
            user: user!.$id,
            ingredients: filteredIngredients,
            instructions: filteredInstructions,
            tags: tags
        }

        handleOnSave(recipeToSave)
    }

    return (
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
            <RecipeGeneralInfoForm
                title={title}
                description={description}
                prepTime={prepTime}
                errors={errors}
                setTitle={setTitle}
                setDescription={setDescription}
                setPrepTime={setPrepTime}
            />

            <IngredientsForm
                ingredients={ingredients}
                handleRemoveIngredient={handleRemoveIngredient}
                handleIngredientChange={handleIngredientChange}
                handleAddIngredient={handleAddIngredient}
            />

            <InstructionsForm
                instructions={instructions}
                handleAddInstruction={handleAddInstruction}
                handleRemoveInstruction={handleRemoveInstruction}
                handleInstructionChange={handleInstructionChange}
            />

            <TagsForm
                tags={tags}
                handleRemoveTag={handleRemoveTag}
                setTagDialogVisible={setTagDialogVisible}
                tagDialogVisible={tagDialogVisible}
                newTagName={newTagName}
                setNewTagName={setNewTagName}
                handleAddTag={handleAddTag}
            />

            <Button
                mode="contained"
                onPress={handleSubmit}
                style={styles.submitButton}
            >
                Enregistrer la recette
            </Button>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    content: {
        padding: 16,
        paddingBottom: 100,
    },
    submitButton: {
        marginTop: 30,
        marginBottom: 20,
    }
})
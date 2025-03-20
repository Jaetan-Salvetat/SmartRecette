import { Text, TextInput, IconButton, Button } from "react-native-paper"
import { StyleSheet, View } from "react-native"
import { Ingredient } from "@/models/Recipe"

interface IngredientsFormProps {
    ingredients: Ingredient[]
    handleIngredientChange: (index: number, field: keyof Ingredient, value: string | number) => void
    handleRemoveIngredient: (index: number) => void
    handleAddIngredient: () => void
}

export default function IngredientsForm({
    ingredients,
    handleIngredientChange,
    handleRemoveIngredient,
    handleAddIngredient
}: IngredientsFormProps) {
    return <>
        <Text variant="headlineSmall" style={styles.sectionTitle}>Ingrédients</Text>
            
            {ingredients.map((ingredient, index) => (
                <View key={ingredient.name} style={styles.ingredientRow}>
                    <TextInput
                        label="Nom"
                        value={ingredient.name}
                        onChangeText={(value) => handleIngredientChange(index, 'name', value)}
                        mode="outlined"
                        style={styles.ingredientName}
                    />
                    <TextInput
                        label="Quantité"
                        value={ingredient.quantity?.toString() || ""}
                        onChangeText={(value) => handleIngredientChange(index, 'quantity', value)}
                        mode="outlined"
                        keyboardType="numeric"
                        style={styles.ingredientQuantity}
                    />
                    <TextInput
                        label="Unité"
                        value={ingredient.unit || ""}
                        onChangeText={(value) => handleIngredientChange(index, 'unit', value)}
                        mode="outlined"
                        style={styles.ingredientUnit}
                    />
                    <IconButton
                        icon="delete"
                        onPress={() => handleRemoveIngredient(index)}
                        disabled={ingredients.length === 1}
                    />
                </View>
            ))}

        <Button
            mode="outlined"
            icon="plus"
            onPress={handleAddIngredient}
            style={styles.addButton}
        >
            Ajouter un ingrédient
        </Button>
    </>
}

const styles = StyleSheet.create({
    sectionTitle: {
        marginTop: 20,
        marginBottom: 10,
    },
    ingredientRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    ingredientName: {
        flex: 2,
        marginRight: 8,
    },
    ingredientQuantity: {
        flex: 1,
        marginRight: 8,
    },
    ingredientUnit: {
        flex: 1,
        marginRight: 8,
    },
    addButton: {
        marginVertical: 10,
    },
})
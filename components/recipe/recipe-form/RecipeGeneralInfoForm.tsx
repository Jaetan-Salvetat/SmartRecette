import { TextInput, HelperText, Text } from "react-native-paper"
import { StyleSheet } from "react-native"

interface RecipeGeneralInfoFormProps {
    title: string
    description: string
    prepTime: string
    errors: {
        title: boolean
        prepTime: boolean
    }
    setTitle: (title: string) => void
    setDescription: (description: string) => void
    setPrepTime: (prepTime: string) => void
}

export default function RecipeGeneralInfoForm({
    title,
    description,
    prepTime,
    errors,
    setTitle,
    setDescription,
    setPrepTime
}: RecipeGeneralInfoFormProps) {
    return <>
        <Text variant="headlineSmall" style={styles.sectionTitle}>Informations générales</Text>

        <TextInput
            label="Titre de la recette"
            value={title}
            onChangeText={setTitle}
            mode="outlined"
            error={errors.title}
            style={styles.input}
        />
        {errors.title && <HelperText type="error">Le titre est requis</HelperText>}

        <TextInput
            label="Description"
            value={description}
            onChangeText={setDescription}
            mode="outlined"
            multiline
            numberOfLines={3}
            style={styles.input}
        />

        <TextInput
            label="Temps de préparation (minutes)"
            value={prepTime}
            onChangeText={setPrepTime}
            mode="outlined"
            keyboardType="numeric"
            error={errors.prepTime}
            style={styles.input}
        />
        {errors.prepTime && <HelperText type="error">Entrez un temps de préparation valide</HelperText>}
    </>
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 12,
    },
    sectionTitle: {
        marginTop: 20,
        marginBottom: 10,
    }
})
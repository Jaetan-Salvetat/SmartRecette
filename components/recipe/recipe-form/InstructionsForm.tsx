import { View, StyleSheet } from "react-native"
import { Text, TextInput, IconButton, Button } from "react-native-paper"

interface InstructionsFormProps {
    instructions: string[]
    handleAddInstruction: () => void
    handleRemoveInstruction: (index: number) => void
    handleInstructionChange: (index: number, value: string) => void
}

export default function InstructionsForm({
    instructions,
    handleAddInstruction,
    handleRemoveInstruction,
    handleInstructionChange
}: InstructionsFormProps) {
    return <>
        <Text variant="headlineSmall" style={styles.sectionTitle}>Instructions</Text>
        
        {instructions.map((instruction, index) => (
            <View key={index} style={styles.instructionContainer}>
                <View style={styles.instructionHeader}>
                    <Text variant="titleMedium">Étape {index + 1}</Text>
                    <IconButton
                        icon="delete"
                        onPress={() => handleRemoveInstruction(index)}
                        disabled={instructions.length === 1}
                    />
                </View>
                <TextInput
                    value={instruction}
                    onChangeText={(value) => handleInstructionChange(index, value)}
                    mode="outlined"
                    multiline
                    numberOfLines={2}
                />
            </View>
        ))}

    <Button
            mode="outlined"
            icon="plus"
            onPress={handleAddInstruction}
            style={styles.addButton}
        >
            Ajouter une instruction
        </Button>
    </>
}

const styles = StyleSheet.create({
    sectionTitle: {
        marginTop: 20,
        marginBottom: 10,
    },
    addButton: {
        marginVertical: 10,
    },
    instructionContainer: {
        marginBottom: 10,
    },
    instructionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    }
})
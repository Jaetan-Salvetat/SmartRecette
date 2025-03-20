import { View, StyleSheet } from "react-native"
import { Button, Chip, Dialog, Portal, Text, TextInput } from "react-native-paper"

interface TagsFormProps {
    tags: string[]
    handleRemoveTag: (tag: string) => void
    setTagDialogVisible: (visible: boolean) => void
    tagDialogVisible: boolean
    newTagName: string
    setNewTagName: (value: string) => void
    handleAddTag: () => void
}

export default function TagsForm({
    tags,
    handleRemoveTag,
    setTagDialogVisible,
    tagDialogVisible,
    newTagName,
    setNewTagName,
    handleAddTag
}: TagsFormProps) {
    return <>
        <Text variant="headlineSmall" style={styles.sectionTitle}>Tags</Text>
                
        <View style={styles.tagsContainer}>
            {tags.map((tag) => (
                <Chip
                    key={tag}
                    style={styles.tag}
                    onClose={() => handleRemoveTag(tag)}
                >
                    {tag}
                </Chip>
            ))}
            <Chip
                icon="plus"
                onPress={() => setTagDialogVisible(true)}
                style={styles.addTagChip}
            >
                Ajouter
            </Chip>
        </View>


        <Portal>
            <Dialog visible={tagDialogVisible} onDismiss={() => setTagDialogVisible(false)}>
                <Dialog.Title>Ajouter un tag</Dialog.Title>
                <Dialog.Content>
                    <TextInput
                        label="Nom du tag"
                        value={newTagName}
                        onChangeText={setNewTagName}
                        mode="outlined"
                    />
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={() => setTagDialogVisible(false)}>Annuler</Button>
                    <Button onPress={handleAddTag}>Ajouter</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    </>
}

const styles = StyleSheet.create({
    sectionTitle: {
        marginTop: 20,
        marginBottom: 10,
    },
    tagsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 8,
    },
    tag: {
        margin: 4,
    },
    addTagChip: {
        margin: 4,
        backgroundColor: "transparent",
    }
})
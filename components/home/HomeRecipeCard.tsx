import { Recipe } from "@/models/Recipe"
import { useState } from "react"
import { View, StyleSheet } from "react-native"
import { Card, Text, Dialog, Button, Portal } from "react-native-paper"

const placeholderUri = "https://d2tbovyd0ghy3r.cloudfront.net/illustrations/empty-product-img.png?&format=webp&width=1584&quality=80"

export default function HomeRecipeCard({ item, onDelete }: { item: Recipe, onDelete: (recipe: Recipe) => void }) {
  const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false)
  
  return <>
      <Card style={styles.card} mode="elevated" onLongPress={() => setIsDeleteDialogVisible(true)}>
        <Card.Cover source={{ uri: item.imageUrl || placeholderUri }} />
        <Card.Title title={item.title} />
        <Card.Content>
            <View style={styles.recipeInfo}>
            <Text variant="bodyMedium">{item.prepTime} min</Text>
            </View>
        </Card.Content>
      </Card>

      <Portal>
        <Dialog visible={isDeleteDialogVisible} onDismiss={() => setIsDeleteDialogVisible(false)}>
          <Dialog.Title>Supprimer la recette</Dialog.Title>
          <Dialog.Content>
            <Text>Êtes-vous sûr de vouloir supprimer la recette "{item.title}" ?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setIsDeleteDialogVisible(false)}>Annuler</Button>
            <Button onPress={() => onDelete(item)}>Supprimer</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
  </>
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    maxWidth: "47%",
  },
  recipeInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  publicChip: {
    backgroundColor: "#4caf50",
    marginRight: 10,
  },
})
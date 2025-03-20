import { Recipe } from "@/models/Recipe"
import { View, StyleSheet } from "react-native"
import { Card, Chip, IconButton, Text } from "react-native-paper"

const placeholderUri = "https://d2tbovyd0ghy3r.cloudfront.net/illustrations/empty-product-img.png?&format=webp&width=1584&quality=80"

export default function HomeRecipeCard({ item }: { item: Recipe }) {
    return <>
        <Card style={styles.card} mode="elevated">
            <Card.Cover source={{ uri: item.imageUrl || placeholderUri }} />
            <Card.Title title={item.title} />
            <Card.Content>
                <View style={styles.recipeInfo}>
                <Text variant="bodyMedium">{item.prepTime} min</Text>
                </View>
            </Card.Content>
        </Card>
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
import { Recipe } from "@/models/Recipe";
import { View, StyleSheet } from "react-native";
import { Card, Chip, IconButton, Text } from "react-native-paper";

export default function HomeRecipeCard({ item }: { item: Recipe }) {
    return <>
        <Card style={styles.card} mode="elevated">
            {item.imageUrl ? (
                <Card.Cover source={{ uri: item.imageUrl }} />
            ) : (
                <View style={styles.placeholderImage}>
                <IconButton icon="food" size={40} />
                </View>
            )}
            <Card.Title
                title={item.title}
                right={() =>
                item.isPublic ? (
                    <Chip
                    icon="share"
                    compact
                    style={styles.publicChip}
                    textStyle={{ color: "white" }}
                    >
                    Public
                    </Chip>
                ) : null
                }
            />
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
    placeholderImage: {
      height: 120,
      backgroundColor: "#e0e0e0",
      justifyContent: "center",
      alignItems: "center",
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
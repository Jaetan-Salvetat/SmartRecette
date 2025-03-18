import { FlatList, View, StyleSheet } from "react-native"
import { Text } from "react-native-paper"
import HomeRecipeCard from "@/components/home/HomeRecipeCard"
import { Recipe } from "@/models/Recipe"

interface HomeRecipesListProps {
    filteredRecipes: Recipe[]
    searchQuery: string
}

export default function HomeRecipesList({ filteredRecipes, searchQuery }: HomeRecipesListProps) {
    return <>
        <FlatList
          data={filteredRecipes}
          renderItem={HomeRecipeCard}
          keyExtractor={(item) => item.$id}
          numColumns={2}
          contentContainerStyle={styles.recipeList}
          ListEmptyComponent={
            searchQuery ? (
              <View style={styles.noResults}>
                <Text>Aucun résultat pour "{searchQuery}"</Text>
              </View>
            ) : null
          }
        />
    </>
}

const styles = StyleSheet.create({
    recipeList: {
      padding: 8,
    },
    noResults: {
      padding: 20,
      alignItems: "center",
    },
  })
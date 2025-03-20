import { ScrollView, StyleSheet } from "react-native"
import { IconButton, Text, Button } from "react-native-paper"
import { NavigationProp, NavigationState } from "@react-navigation/native"

interface HomeEmptyStateProps {
  navigation: Omit<NavigationProp<ReactNavigation.RootParamList>, "getState"> & {
    getState(): NavigationState | undefined;
  }
}

export default function HomeEmptyState({ navigation }: HomeEmptyStateProps) {
    return <>
        <ScrollView contentContainerStyle={styles.emptyContainer}>
            <IconButton icon="notebook" size={60} />
            <Text variant="headlineMedium" style={styles.emptyTitle}>
                Aucune recette
            </Text>
            <Text variant="bodyLarge" style={styles.emptyText}>
                Commencez à numériser vos recettes HelloFresh
            </Text>
            <Button
                mode="contained"
                icon="camera"
                onPress={() => navigation.navigate("takePhoto" as never)}
                style={styles.emptyButton}
            >
                Ajouter ma première recette
            </Button>
        </ScrollView>
    </>
}

const styles = StyleSheet.create({
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 40,
    },
    emptyTitle: {
      marginTop: 16,
      textAlign: "center",
    },
    emptyText: {
      marginTop: 8,
      textAlign: "center",
      opacity: 0.6,
      marginBottom: 24,
    },
    emptyButton: {
      marginTop: 16,
    }
  })
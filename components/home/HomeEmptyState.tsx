import { ScrollView, StyleSheet } from "react-native"
import { IconButton, Text, Button } from "react-native-paper"

interface HomeEmptyStateProps {
    handlePhotoCapture: () => void
}

export default function HomeEmptyState({ handlePhotoCapture }: HomeEmptyStateProps) {
    return <>
        <ScrollView contentContainerStyle={styles.emptyContainer}>
            <IconButton icon="notebook" size={60} />
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
                onPress={handlePhotoCapture}
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
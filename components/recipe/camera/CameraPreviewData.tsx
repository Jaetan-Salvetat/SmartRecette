import { View, Image, StyleSheet } from "react-native"
import { Text, Button } from "react-native-paper"

interface CameraPreviewDataProps {
    frontPhoto: string
    backPhoto: string
    resetPhotos: () => void
    saveRecipe: () => void
    isLoading: boolean
}

export default function CameraPreviewData({ frontPhoto, backPhoto, resetPhotos, saveRecipe, isLoading }: CameraPreviewDataProps) {
    return <>
        <View style={styles.previewContainer}>
          <Text style={styles.previewTitle}>Vos photos de recette</Text>
          
          <View style={styles.photosContainer}>
            <View style={styles.photoCard}>
              <Text style={styles.photoLabel}>Recto</Text>
              <Image source={{ uri: frontPhoto }} style={styles.previewImage} />
            </View>
            
            <View style={styles.photoCard}>
              <Text style={styles.photoLabel}>Verso</Text>
              <Image source={{ uri: backPhoto }} style={styles.previewImage} />
            </View>
          </View>
          
          <View style={styles.actionsContainer}>
            <Button 
              mode="outlined" 
              icon="refresh" 
              onPress={resetPhotos} 
              style={styles.actionButton}
            >
              Reprendre
            </Button>
            <Button 
              mode="contained" 
              icon="check" 
              onPress={saveRecipe}
              style={styles.actionButton}
              loading={isLoading}
              disabled={isLoading}
            >
              Enregistrer
            </Button>
          </View>
        </View>
    </>
}

const styles = StyleSheet.create({
    previewContainer: {
      flex: 1,
      padding: 20
    },
    previewTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center'
    },
    photosContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20
    },
    photoCard: {
      width: '48%',
      borderRadius: 8,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: '#ddd'
    },
    photoLabel: {
      backgroundColor: '#f0f0f0',
      padding: 8,
      textAlign: 'center',
      fontWeight: 'bold'
    },
    previewImage: {
      width: '100%',
      height: 200,
      resizeMode: 'cover'
    },
    actionsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20
    },
    actionButton: {
      flex: 1,
      marginHorizontal: 5
    }
  })
import React from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Icon, Text } from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { PhotoType } from './CameraContainer'

interface CameraGetLocalImageProps {
  onImageSelected: (uri: string) => void
  currentPhotoType: PhotoType
  isLoading: boolean
}

export default function CameraGetLocalImage({ onImageSelected, currentPhotoType, isLoading }: CameraGetLocalImageProps) {
  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
      
      if (status !== 'granted') {
        alert('Permission d\'accès à la galerie refusée')
        return
      }
      
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      })
      
      if (!result.canceled && result.assets && result.assets.length > 0) {
        onImageSelected(result.assets[0].uri)
      }
    } catch (error) {
      console.error('Erreur lors de la sélection d\'image :', error)
      alert('Une erreur est survenue lors de la sélection de l\'image')
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.galleryButton} 
        onPress={pickImage}
        disabled={isLoading}
      >
        <Icon source="library" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  galleryButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fff'
  },
  buttonText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 14
  }
})
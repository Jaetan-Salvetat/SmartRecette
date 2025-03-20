import React, { useState, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import { CameraView } from 'expo-camera'
import { useNavigation } from 'expo-router'
import useRecipeStore from '@/stores/recipeStore'
import useHttpStore from '@/stores/httpStore'
import useAuthStore from '@/stores/authStore'
import CameraHeader from '@/components/recipe/camera/CameraHeader'
import CameraPreviewData from '@/components/recipe/camera/CameraPreviewData'
import CameraBottomBar from '@/components/recipe/camera/CameraBottomBar'
import LoadingDialog from '@/components/LoadingDialog'
import CameraContainer, { PhotoType } from '@/components/recipe/camera/CameraContainer'


export default function TakePhotoPage() {
  const navigation = useNavigation()
  const { addRecipe } = useRecipeStore()
  const [isCameraReady, setIsCameraReady] = useState(false)
  const [frontPhoto, setFrontPhoto] = useState<string | null>(null)
  const [backPhoto, setBackPhoto] = useState<string | null>(null)
  const [currentPhotoType, setCurrentPhotoType] = useState<PhotoType>('front')
  const [isLoading, setIsLoading] = useState(false)
  const cameraRef = useRef<CameraView | null>(null)
  const { getRecipeFromImage } = useHttpStore()
  const { user } = useAuthStore()

  const takePicture = async () => {
    if (cameraRef.current && isCameraReady) {
      setIsLoading(true)
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 1,
          skipProcessing: false
        })
        
        if (currentPhotoType === 'front') {
          setFrontPhoto(photo?.uri || null)
          setCurrentPhotoType('back')
        } else {
          setBackPhoto(photo?.uri || null)
        }
      } catch (error) {
        console.error('Erreur lors de la prise de photo:', error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const resetPhotos = () => {
    setFrontPhoto(null)
    setBackPhoto(null)
    setCurrentPhotoType('front')
  }

  const saveRecipe = async () => {
    setIsLoading(true)
    try {
      console.log('Sauvegarde des photos:', frontPhoto, backPhoto)
      let recipe = await getRecipeFromImage(frontPhoto!, backPhoto!)
      recipe.user = user!.$id
      await addRecipe(recipe)
      navigation.goBack()
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const appbarTitle = currentPhotoType === 'front' ? 'Photo recto' : 
    frontPhoto && !backPhoto ? 'Photo verso' : 'Prévisualisation'

  const dialogText = frontPhoto && backPhoto ? 'Sauvegarde en cours...' : 'Traitement de la photo...'

  return (
    <View style={styles.container}>
        <CameraHeader appbarTitle={appbarTitle} />

        {frontPhoto && backPhoto ? (
            <CameraPreviewData 
            frontPhoto={frontPhoto} 
            backPhoto={backPhoto} 
            resetPhotos={resetPhotos} 
            saveRecipe={saveRecipe} 
            isLoading={isLoading}
            />
        ) : (
          <>
            <CameraContainer
                currentPhotoType={currentPhotoType}
                setIsCameraReady={setIsCameraReady}
                cameraRef={cameraRef}
                setIsLoading={setIsLoading}
                takePicture={takePicture}
                resetPhotos={resetPhotos}
                saveRecipe={saveRecipe}
                isLoading={isLoading}
            />
            <CameraBottomBar 
                frontPhoto={frontPhoto}
                takePicture={takePicture}
                isCameraReady={isCameraReady}
                isLoading={isLoading}
            />
          </>
        )}
      
        <LoadingDialog isLoading={isLoading} text={dialogText} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

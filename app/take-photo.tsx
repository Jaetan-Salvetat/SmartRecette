import React, { useState, useRef, useMemo } from 'react'
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
import BottomSheet, { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import RecipeForm from '@/components/recipe/recipe-form/RecipeForm'
import { Recipe } from '@/models/Recipe'

export default function TakePhotoPage() {
    const [recipe, setRecipe] = useState<Recipe | null>(null)
    const sheetRef = useRef<BottomSheet>(null)
    const sheetSnapPoints = useMemo(() => ['100%'], [])
    const navigation = useNavigation()
    const { addRecipe } = useRecipeStore()
    const [isCameraReady, setIsCameraReady] = useState(false)
    const [isError, setIsError] = useState(false)
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

    const handleSheetVisibility = async () => {
        setIsLoading(true)
        try {
            const newRecipe = await getRecipeFromImage(frontPhoto!, backPhoto!)
            setRecipe(newRecipe)
            console.log("newRecipe", newRecipe);
            
            sheetRef.current?.expand()
        } catch (error) {
            setIsError(true)
        } finally {
            setIsLoading(false)
        }
    }

    const onImageSelected = (uri: string) => {
        if (currentPhotoType === 'front') {
            setFrontPhoto(uri)
            setCurrentPhotoType('back')
        } else {
            setBackPhoto(uri)
        }
    }

    const appbarTitle = currentPhotoType === 'front' ? 'Photo recto' :
        frontPhoto && !backPhoto ? 'Photo verso' : 'Prévisualisation'

    const dialogText = frontPhoto && backPhoto ? 'Sauvegarde en cours...' : 'Traitement de la photo...'

    return <>
        <GestureHandlerRootView>
            <View style={styles.container}>
                <CameraHeader appbarTitle={appbarTitle} />

                {frontPhoto && backPhoto ? (
                    <CameraPreviewData
                        frontPhoto={frontPhoto}
                        backPhoto={backPhoto}
                        resetPhotos={resetPhotos}
                        continueFlow={handleSheetVisibility}
                        isLoading={isLoading}
                        isError={isError}
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
                            currentPhotoType={currentPhotoType}
                            onImageSelected={onImageSelected}
                        />
                    </>
                )}

                <LoadingDialog isLoading={isLoading} text={dialogText} />

                <BottomSheet ref={sheetRef} enablePanDownToClose={true} snapPoints={sheetSnapPoints} index={-1}>
                    <BottomSheetScrollView style={styles.container}>
                        <RecipeForm
                            recipe={recipe}
                            handleOnSave={saveRecipe}
                            isLoading={isLoading}
                        />
                    </BottomSheetScrollView>
                </BottomSheet>
            </View>
        </GestureHandlerRootView>
    </>
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

import { Recipe } from "@/models/Recipe"
import { CameraView } from "expo-camera"
import { View, StyleSheet } from "react-native"
import { Text } from "react-native-paper"

export type PhotoType = 'front' | 'back'

interface CameraContainerProps {
    currentPhotoType: PhotoType
    setIsCameraReady: (isReady: boolean) => void
    cameraRef: React.RefObject<CameraView>
}


export default function CameraContainer({
    currentPhotoType,
    setIsCameraReady,
    cameraRef
}: CameraContainerProps) {
    return <>
        <CameraView
            ref={cameraRef}
            style={styles.camera}
            mode="picture"
            facing="back"
            onCameraReady={() => setIsCameraReady(true)}
          >
            <View style={styles.cameraContent}>
              <View style={styles.instructionsOverlay}>
                <Text style={styles.instructionsText}>
                  {currentPhotoType === 'front' 
                    ? 'Prenez en photo le recto de la recette' 
                    : 'Prenez en photo le verso de la recette'}
                </Text>
              </View>
            </View>
          </CameraView>
    </>
}

const styles = StyleSheet.create({
  camera: {
    flex: 1
  },
  cameraContent: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end'
  },
  instructionsOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  instructionsText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 16,
    borderRadius: 8
  }
})
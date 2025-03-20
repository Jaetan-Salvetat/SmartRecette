import { TouchableOpacity, View, Image, ActivityIndicator, StyleSheet } from "react-native"
import { Text } from "react-native-paper"
import { PhotoType } from "./CameraContainer"
import CameraGetLocalImage from "./CameraGetLocalImage"

interface CameraBottomBarProps {
    frontPhoto: string | null
    takePicture: () => void
    isCameraReady: boolean
    isLoading: boolean
    currentPhotoType: PhotoType
    onImageSelected: (uri: string) => void
}

export default function CameraBottomBar({ frontPhoto, takePicture, isCameraReady, isLoading,currentPhotoType, onImageSelected }: CameraBottomBarProps) {
  return <>
    <View style={styles.footer}>
        {frontPhoto && (
            <TouchableOpacity style={styles.thumbnailContainer}>
            <Image source={{ uri: frontPhoto }} style={styles.thumbnail} />
            <Text style={styles.thumbnailLabel}>Recto</Text>
            </TouchableOpacity>
        ) || (
            <View style={styles.thumbnailContainer} />
        )}
        
        <TouchableOpacity
            style={styles.captureButton}
            onPress={takePicture}
            disabled={!isCameraReady || isLoading}
        >
            {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
            ) : (
            <View style={styles.captureButtonInner} />
            )}
        </TouchableOpacity>
        
        <CameraGetLocalImage
            onImageSelected={onImageSelected}
            currentPhotoType={currentPhotoType}
            isLoading={isLoading}
        />
    </View>
  </>
}

const styles = StyleSheet.create({
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#000'
    },
    captureButton: {
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: '#FFF',
      justifyContent: 'center',
      alignItems: 'center'
    },
    captureButtonInner: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: '#fff',
      borderWidth: 2,
      borderColor: '#000'
    },
    thumbnailContainer: {
      width: 60,
      height: 60,
      borderRadius: 8,
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center'
    },
    thumbnail: {
      width: '100%',
      height: '100%'
    },
    thumbnailLabel: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      color: '#fff',
      textAlign: 'center',
      fontSize: 10,
      padding: 2
    }
  })
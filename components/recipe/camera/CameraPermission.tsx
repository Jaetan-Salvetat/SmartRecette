import { useNavigation } from "expo-router"
import { View, Text, StyleSheet } from "react-native"
import { ActivityIndicator, Button } from "react-native-paper"
import { Camera } from "expo-camera"
import { useState, useEffect } from "react"

export default function CameraPermission() {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null)
    const navigation = useNavigation()
    
    useEffect(() => {
        (async () => {
          const { status } = await Camera.requestCameraPermissionsAsync()
          setHasPermission(status === 'granted')
        })()
      }, [])

      if (hasPermission === null) {
        return <ActivityIndicator animating={true} size="large" style={styles.loader} />
      }
    
      if (!hasPermission) {
        return (
          <View style={styles.container}>
            <Text style={styles.errorText}>L'accès à la caméra n'a pas été autorisé</Text>
            <Button mode="contained" onPress={() => navigation.goBack()}>
              Retour
            </Button>
          </View>
        )
      }

    return <></>
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff'
    },
    errorText: {
        margin: 20,
        fontSize: 16,
        textAlign: 'center'
      },
      loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }
})
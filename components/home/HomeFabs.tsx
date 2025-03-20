import { FAB } from "react-native-paper"
import { StyleSheet } from "react-native"
import { useNavigation } from "expo-router"
import { NavigationProp, NavigationState } from "@react-navigation/native"

interface HomeFabsProps {
    isFabOpen: boolean
    setIsFabOpen: (open: boolean) => void
    navigation: Omit<NavigationProp<ReactNavigation.RootParamList>, "getState"> & {
        getState(): NavigationState | undefined;
    }
}

export default function HomeFabs({ isFabOpen, setIsFabOpen, navigation }: HomeFabsProps) {

    const handleCreateManuallyNavigation = () => {
        navigation.navigate("createManually" as never)
    }

    const handlePhotoCapture = () => {
        navigation.navigate("takePhoto" as never)
    }

    return <>
        <FAB.Group
            open={isFabOpen}
            visible
            icon={isFabOpen ? "close" : "plus"}
            actions={[
            {
                icon: "pencil",
                label: "Créer manuellement",
                onPress: handleCreateManuallyNavigation,
            },
            {
                icon: "camera",
                label: "Prendre une photo",
                onPress: handlePhotoCapture,
            },
            ]}
            onStateChange={({ open }) => setIsFabOpen(open)}
            style={styles.fab}
        />
    </>
}

const styles = StyleSheet.create({
    fab: {
      position: "absolute",
      margin: 16,
      right: 0,
      bottom: 0,
    },
  })
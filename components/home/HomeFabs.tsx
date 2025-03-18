import { FAB } from "react-native-paper"
import { StyleSheet } from "react-native"

interface HomeFabsProps {
    handlePhotoCapture: () => void
    handleManualCreation: () => void
    isFabOpen: boolean
    setIsFabOpen: (open: boolean) => void
}

export default function HomeFabs({ handlePhotoCapture, handleManualCreation, isFabOpen, setIsFabOpen }: HomeFabsProps) {
    return <>
        <FAB.Group
            open={isFabOpen}
            visible
            icon={isFabOpen ? "close" : "plus"}
            actions={[
            {
                icon: "pencil",
                label: "Créer manuellement",
                onPress: handleManualCreation,
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
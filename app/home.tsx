import { View, StyleSheet } from "react-native"
import { Text, Button } from "react-native-paper"
import useAuthStore from "@/stores/authStore"

export default function HomePage() {
    const { logout } = useAuthStore()

    const handleLogout = async () => {
        try {
            await logout()
        } catch (error) {
            console.error("Erreur lors de la déconnexion:", error)
        }
    }

    return (
        <View style={styles.container}>
            <Text variant="headlineLarge" style={styles.title}>Home</Text>
            
            <Button
                mode="outlined"
                onPress={handleLogout}
                style={styles.logoutButton}
                icon="logout"
            >
                Se déconnecter
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        marginBottom: 20,
    },
    logoutButton: {
        marginTop: 'auto',
    }
})
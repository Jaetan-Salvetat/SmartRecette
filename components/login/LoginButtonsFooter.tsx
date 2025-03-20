import useAuthStore from "@/stores/authStore"
import { useNavigation } from "expo-router"
import { Button } from "react-native-paper"
import { StyleSheet } from "react-native"

interface LoginButtonsFooterProps {
    handleLogin: () => void
}

export default function LoginButtonsFooter({ handleLogin }: LoginButtonsFooterProps) {
    const navigation = useNavigation()
    const { isLoading } = useAuthStore()
    
    return <>
        <Button
            mode="contained"
            onPress={handleLogin}
            loading={isLoading}
            disabled={isLoading}
            style={styles.button}
        >
            Se connecter
        </Button>

        <Button
            mode="text"
            onPress={() => navigation.navigate('register' as never)}
            style={styles.linkButton}
        >
            Pas encore de compte ? S'inscrire
        </Button>
    </>
}

const styles = StyleSheet.create({
    button: {
        marginTop: 16
    },
    linkButton: {
        marginTop: 8
    }
})
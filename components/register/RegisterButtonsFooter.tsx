import useAuthStore from "@/stores/authStore";
import { useNavigation } from "expo-router";
import { Button } from "react-native-paper";
import { StyleSheet } from "react-native";

interface RegisterButtonsFooterProps {
    handleRegister: () => void
}

export default function RegisterButtonsFooter({ handleRegister }: RegisterButtonsFooterProps) {
    const navigation = useNavigation()
    const { isLoading } = useAuthStore()

    return <>
        <Button
            mode="contained"
            onPress={handleRegister}
            loading={isLoading}
            style={styles.button}
            disabled={isLoading}
        >
            S'inscrire
        </Button>

        <Button
            onPress={() => navigation.navigate('login' as never)}
            style={styles.linkButton}
        >
            Déjà un compte ? Se connecter
        </Button>
    </>
}

const styles = StyleSheet.create({
	button: {
		marginTop: 16,
		padding: 4
	},
	linkButton: {
		marginTop: 8
	}
})
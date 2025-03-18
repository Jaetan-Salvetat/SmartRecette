import { View, StyleSheet } from "react-native";
import { HelperText, Text } from "react-native-paper";
import useAuthStore from "@/stores/authStore";

export default function RegisterHeader() {
    const { error } = useAuthStore()

    return <>
        <View style={styles.header}>
            <Text variant="headlineLarge">Créer un compte</Text>
            <Text variant="bodyLarge" style={styles.subtitle}>
                Rejoignez SmartRecette pour découvrir et partager des recettes
            </Text>
        </View>

        <HelperText type="error" visible={!!error}>
            {error}
        </HelperText>
    </>
}

const styles = StyleSheet.create({
	header: {
		alignItems: 'center',
		marginBottom: 32
	},
	subtitle: {
		marginTop: 8,
		textAlign: 'center',
		opacity: 0.7
	}
})
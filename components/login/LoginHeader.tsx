import { View, StyleSheet } from "react-native"
import { Text, HelperText } from "react-native-paper"

import useAuthStore from "@/stores/authStore"

export default function LoginHeader() {
    const { error } = useAuthStore()

    return <>
        <View style={styles.header}>
            <Text variant="headlineLarge">Connexion</Text>
            <Text variant="bodyLarge" style={styles.subtitle}>
                Connectez-vous pour accéder à vos recettes
            </Text>
        </View>

        <HelperText type="error" visible={!!error}>
            {error}
        </HelperText>
    </>
}

const styles = StyleSheet.create({

    header: {
        alignItems: "center",
        marginBottom: 32
    },
    subtitle: {
        marginTop: 8,
        textAlign: "center",
        opacity: 0.7
    },
})
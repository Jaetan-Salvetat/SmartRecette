import { View, ScrollView, StyleSheet } from "react-native"
import { TextInput, Button, Text, HelperText } from "react-native-paper"
import { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import useAuthStore from "@/stores/authStore"
import { EMAIL_REGEX } from "@/constants/validations"
import PasswordInput from "@/components/PasswordInput"

export default function LoginPage() {
    const navigation = useNavigation()
    const { login, isLoading, error } = useAuthStore()
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const [errors, setErrors] = useState({
        email: "",
        password: ""
    })

    const validateForm = () => {
        const newErrors = {
            email: "",
            password: ""
        }

        if (!formData.email) {
            newErrors.email = "L'email est requis"
        } else if (!EMAIL_REGEX.test(formData.email)) {
            newErrors.email = "L'email n'est pas valide"
        }

        if (!formData.password) {
            newErrors.password = "Le mot de passe est requis"
        }

        setErrors(newErrors)
        return !Object.values(newErrors).some(error => error !== "")
    }

    const handleLogin = async () => {
        if (!validateForm()) return

        try {
            await login(formData.email, formData.password)
        } catch (error) {
            console.error(error)
            setErrors({
                ...errors,
                password: "Email ou mot de passe incorrect"
            })
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text variant="headlineLarge">Connexion</Text>
                <Text variant="bodyLarge" style={styles.subtitle}>
                    Connectez-vous pour accéder à vos recettes
                </Text>
            </View>

            <HelperText type="error" visible={!!error}>
                {error}
            </HelperText>

            <TextInput
                label="Email"
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
                error={!!errors.email}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
                mode="outlined"
            />
            <HelperText type="error" visible={!!errors.email}>
                {errors.email}
            </HelperText>

            <PasswordInput
                value={formData.password}
                onChangeText={(text) => setFormData({ ...formData, password: text })}
                error={errors.password}
                style={styles.input}
            />

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
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        justifyContent: "center"
    },
    header: {
        alignItems: "center",
        marginBottom: 32
    },
    subtitle: {
        marginTop: 8,
        textAlign: "center",
        opacity: 0.7
    },
    input: {
        marginBottom: 4
    },
    button: {
        marginTop: 16
    },
    linkButton: {
        marginTop: 8
    }
})

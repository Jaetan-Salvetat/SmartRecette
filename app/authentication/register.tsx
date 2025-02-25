import { View, ScrollView, StyleSheet } from "react-native"
import { TextInput, Button, Text, HelperText, IconButton } from "react-native-paper"
import { useContext, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import useAuthStore from "@/stores/authStore"

export default function RegisterPage() {
	const navigation = useNavigation()
	const { register } = useAuthStore()
	const [loading, setLoading] = useState(false)
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: ""
	})
	const [errors, setErrors] = useState({
		email: "",
		password: "",
		confirmPassword: ""
	})

	const validateForm = () => {
		const newErrors = {
			email: "",
			password: "",
			confirmPassword: ""
		}

		if (!formData.email) {
			newErrors.email = "L'email est requis"
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "L'email n'est pas valide"
		}

		if (!formData.password) {
			newErrors.password = "Le mot de passe est requis"
		} else if (formData.password.length < 6) {
			newErrors.password = "Le mot de passe doit contenir au moins 6 caractères"
		}

		if (formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = "Les mots de passe ne correspondent pas"
		}

		setErrors(newErrors)
		return !Object.values(newErrors).some(error => error !== "")
	}

	const handleRegister = async () => {
		if (!validateForm()) return

		setLoading(true)
		try {
			await register(formData.email, formData.password, formData.confirmPassword)
			// La navigation sera automatiquement gérée par le changement d'état d'authentification
		} catch (error) {
			console.error(error)
			// Gérer l'erreur ici
		} finally {
			setLoading(false)
		}
	}

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={styles.header}>
				<Text variant="headlineLarge">Créer un compte</Text>
				<Text variant="bodyLarge" style={styles.subtitle}>
					Rejoignez SmartRecette pour découvrir et partager des recettes
				</Text>
			</View>

				<TextInput
					label="Email"
					value={formData.email}
					onChangeText={(text) => setFormData({ ...formData, email: text })}
					error={!!errors.email}
					keyboardType="email-address"
					autoCapitalize="none"
					style={styles.input}
				/>
				<HelperText type="error" visible={!!errors.email}>
					{errors.email}
				</HelperText>

				<TextInput
					label="Mot de passe"
					value={formData.password}
					onChangeText={(text) => setFormData({ ...formData, password: text })}
					error={!!errors.password}
					secureTextEntry
					style={styles.input}
				/>
				<HelperText type="error" visible={!!errors.password}>
					{errors.password}
				</HelperText>

				<TextInput
					label="Confirmer le mot de passe"
					value={formData.confirmPassword}
					onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
					error={!!errors.confirmPassword}
					secureTextEntry
					style={styles.input}
				/>
				<HelperText type="error" visible={!!errors.confirmPassword}>
					{errors.confirmPassword}
				</HelperText>

				<Button
					mode="contained"
					onPress={handleRegister}
					loading={loading}
					style={styles.button}
				>
					S'inscrire
				</Button>

				<Button
					onPress={() => navigation.navigate('login')}
					style={styles.linkButton}
				>
					Déjà un compte ? Se connecter
				</Button>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		padding: 20,
	},
	header: {
		alignItems: 'center',
		marginBottom: 32
	},
	subtitle: {
		marginTop: 8,
		textAlign: 'center',
		opacity: 0.7
	},
	form: {
		flex: 1
	},
	input: {
		marginBottom: 4
	},
	button: {
		marginTop: 16,
		padding: 4
	},
	linkButton: {
		marginTop: 8
	}
})
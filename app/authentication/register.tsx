import { View, ScrollView, StyleSheet } from "react-native"
import { TextInput, Button, Text, HelperText, IconButton } from "react-native-paper"
import { useContext, useState } from "react"
import { useNavigation } from "@react-navigation/native"
import useAuthStore from "@/stores/authStore"
import { EMAIL_REGEX } from "@/constants/validations"
import PasswordInput from "@/components/PasswordInput"

export default function RegisterPage() {
	const navigation = useNavigation()
	const { register, isLoading, error } = useAuthStore()
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
	})
	const [errors, setErrors] = useState({
		username: "",
		email: "",
		password: "",
	})

	const validateForm = () => {
		const newErrors = {
			username: "",
			email: "",
			password: "",
		}

		if (!formData.username) {
			newErrors.username = "Le nom d'utilisateur est requis"
		}

		if (!formData.email) {
			newErrors.email = "L'email est requis"
		} else if (!EMAIL_REGEX.test(formData.email)) {
			newErrors.email = "L'email n'est pas valide"
		}

		if (!formData.password) {
			newErrors.password = "Le mot de passe est requis"
		} else if (formData.password.length < 6) {
			newErrors.password = "Le mot de passe doit contenir au moins 6 caractères"
		}

		setErrors(newErrors)
		return !Object.values(newErrors).some(error => error !== "")
	}

	const handleRegister = async () => {
		if (!validateForm()) return
		await register(formData.email, formData.password, formData.username)
	}

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={styles.header}>
				<Text variant="headlineLarge">Créer un compte</Text>
				<Text variant="bodyLarge" style={styles.subtitle}>
					Rejoignez SmartRecette pour découvrir et partager des recettes
				</Text>
			</View>

			{error && (
				<HelperText type="error" visible={true}>
					{error}
				</HelperText>
			)}

			<TextInput
				label="Nom d'utilisateur"
				value={formData.username}
        		mode="outlined"
				onChangeText={(text) => setFormData({ ...formData, username: text })}
					error={!!errors.username}
					style={styles.input}
				/>
				<HelperText type="error" visible={!!errors.username}>
					{errors.username}
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
					onPress={handleRegister}
					loading={isLoading}
					style={styles.button}
					disabled={isLoading}
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
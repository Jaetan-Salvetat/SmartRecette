import { ScrollView, StyleSheet } from "react-native"
import { useState } from "react"
import useAuthStore from "@/stores/authStore"
import { EMAIL_REGEX } from "@/constants/validations"
import RegisterHeader from "@/components/register/RegisterHeader"
import RegisterForm from "@/components/register/RegisterForm"
import RegisterButtonsFooter from "@/components/register/RegisterButtonsFooter"

export default function RegisterPage() {
	const { register } = useAuthStore()
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
			<RegisterHeader />
			<RegisterForm
				formData={formData}
				setFormData={setFormData}
				errors={errors}
			/>
			<RegisterButtonsFooter handleRegister={handleRegister} />
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
        flexGrow: 1,
        padding: 20,
        justifyContent: "center"
	}
})
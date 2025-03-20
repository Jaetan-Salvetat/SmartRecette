import { ScrollView, StyleSheet } from "react-native"
import { useState } from "react"
import useAuthStore from "@/stores/authStore"
import { EMAIL_REGEX } from "@/constants/validations"
import LoginHeader from "@/components/login/LoginHeader"
import LoginForm from "@/components/login/LoginForm"
import LoginButtonsFooter from "@/components/login/LoginButtonsFooter"

export default function LoginPage() {
    const { login } = useAuthStore()
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
            <LoginHeader />
            <LoginForm
                formData={formData}
                setFormData={setFormData}
                errors={errors}
            />
            <LoginButtonsFooter handleLogin={handleLogin} />
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

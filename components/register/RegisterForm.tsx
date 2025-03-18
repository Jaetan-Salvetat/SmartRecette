import { HelperText, TextInput } from "react-native-paper";
import PasswordInput from "@/components/PasswordInput";
import { StyleSheet } from "react-native";

interface RegisterFormProps {
    formData: {
        username: string
        email: string
        password: string
    }
    setFormData: (formData: { username: string; email: string; password: string }) => void
    errors: {
        username: string
        email: string
        password: string
    }
}

export default function RegisterForm({ formData, setFormData, errors }: RegisterFormProps) {
    return <>
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
    </>
}

const styles = StyleSheet.create({
	input: {
		marginBottom: 4
	}
})
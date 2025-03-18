import { HelperText, TextInput } from "react-native-paper"
import { StyleSheet } from "react-native"
import PasswordInput from "@/components/PasswordInput"

interface LoginFormProps {
    formData: {
        email: string
        password: string
    }
    setFormData: (formData: { email: string; password: string }) => void
    errors: {
        email: string
        password: string
    }
}

export default function LoginForm({ formData, setFormData, errors }: LoginFormProps) {
    return <>
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
    },

})
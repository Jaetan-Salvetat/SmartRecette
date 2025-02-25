import { View } from 'react-native'
import { TextInput, Button, Text } from 'react-native-paper'
import { useState } from 'react'
import useAuthStore from '@/stores/authStore'
import { useNavigation } from '@react-navigation/native'


export default function LoginPage() {
	const navigation = useNavigation()
	const { login } = useAuthStore()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const handleLogin = async () => {
			await login(email, password)
	}
	
	return (
		<View style={{ padding: 20 }}>
			<Text variant="headlineLarge">Connexion</Text>
		</View>
	)
}

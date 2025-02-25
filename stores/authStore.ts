import { create } from 'zustand'
import AsyncStorage from '@react-native-async-storage/async-storage'
import PocketBase from 'pocketbase'
import { AuthState, AuthUser } from '@/types/authTypes'

const pb = new PocketBase('https://smart-recette.jaetan.fr')

const createAuthStore = (): AuthState => ({
    user: null,
    isLoading: true,

    loadAuth: async () => {
        try {
            const token = await AsyncStorage.getItem('pb_auth')
            if (token) {
                pb.authStore.save(token, null)
                useAuthStore.setState({ user: pb.authStore.model as AuthUser })
            }
        } catch (error) {
            console.error("Erreur lors du chargement de l'auth:", error)
        }
        useAuthStore.setState({ isLoading: false })
    },

    register: async (email, password, confirmPassword) => {
        await pb.collection('users').create({ email, password, passwordConfirm: confirmPassword })
        return useAuthStore.getState().login(email, password)
    },

    login: async (email, password) => {
        const authData = await pb.collection('users').authWithPassword(email, password)
        await AsyncStorage.setItem('pb_auth', pb.authStore.token)
        useAuthStore.setState({ user: authData.record as AuthUser })
    },

    logout: async () => {
        pb.authStore.clear();
        await AsyncStorage.removeItem('pb_auth')
        useAuthStore.setState({ user: null })
    }
});

const useAuthStore = create<AuthState>(createAuthStore)
useAuthStore.getState().loadAuth()

export default useAuthStore;

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import PocketBase, { RecordModel } from 'pocketbase'

const pb = new PocketBase('https://smart-recette.jaetan.fr')

export interface AuthUser extends RecordModel {
    id: string
    email: string
}

interface AuthStore {
    user: AuthUser | null
    isLoading: boolean
    error: string | null

    setUser: (user: AuthUser | null) => void
    setLoading: (isLoading: boolean) => void
    setError: (error: string | null) => void
    loadAuth: () => Promise<void>
    register: (email: string, password: string, confirmPassword: string) => Promise<void>
    login: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
}

const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,
            isLoading: true,
            error: null,

            setUser: (user) => set({ user }),
            setLoading: (isLoading) => set({ isLoading }),
            setError: (error) => set({ error }),

            loadAuth: async () => {
                set({ isLoading: true, error: null })
                try {
                    if (pb.authStore.isValid) {
                        const authData = await pb.collection('users').authRefresh()
                        set({ user: authData.record as AuthUser })
                    } else {
                        set({ user: null })
                    }
                } catch (error) {
                    console.error("Initialization error:", error)
                    set({ user: null })
                } finally {
                    set({ isLoading: false })
                }
            },

            register: async (email, password, confirmPassword) => {
                set({ isLoading: true, error: null })
                try {
                    await pb.collection('users').create({ 
                        email, 
                        password, 
                        passwordConfirm: confirmPassword 
                    })
                    const authData = await pb.collection('users').authWithPassword(email, password)
                    set({ user: authData.record as AuthUser })
                } catch (error) {
                    console.error("Regiter error:", error)
                    throw error
                } finally {
                    set({ isLoading: false })
                }
            },

            login: async (email, password) => {
                set({ isLoading: true, error: null })
                try {
                    const authData = await pb.collection('users').authWithPassword(email, password)
                    set({ user: authData.record as AuthUser })
                } catch (error) {
                    console.error("Login error:", error)
                    throw error
                } finally {
                    set({ isLoading: false })
                }
            },

            logout: async () => {
                set({ isLoading: true, error: null })
                try {
                    pb.authStore.clear()
                    set({ user: null })
                } catch (error) {
                    console.error("Logout error:", error)
                } finally {
                    set({ isLoading: false })
                }
            }
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => AsyncStorage),
            partialize: (state) => ({ user: state.user }),
        }
    )
)

useAuthStore.getState().loadAuth()

export default useAuthStore

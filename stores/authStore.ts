import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { client, account } from '@/stores/appwrite'
import User from "@/models/User"
import { AppwriteException, ID } from 'react-native-appwrite'

interface AuthStore {
    user: User | null
    isLoading: boolean
    error: string | null

    setLoading: () => void
    setError: (error: string | null) => void
    loadAuth: () => Promise<void>
    register: (email: string, password: string, username: string) => Promise<void>
    login: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
}

const useAuthStore = create<AuthStore>((set, get) => ({
    user: null,
    isLoading: false,
    error: null,

    setLoading: () => set({ isLoading: !get().isLoading }),
    setError: (error: string | null) => set({ error }),
    loadAuth: async () => {
        set({ isLoading: true, error: null })

        try {
            const user = await account.get()
            set({ user, isLoading: false })
        } catch (error) {
            set({ isLoading: false })
        }
    },
    register: async (email: string, password: string, username: string) => {
        try {
            set({ isLoading: true, error: null })

            const user = await account.create(ID.unique(), email, password, username)
            get().loadAuth()
        } catch (error) {
            console.error(error)
            set({ isLoading: false })
        }
    },
    login: async (email: string, password: string) => {
        try {
            set({ isLoading: true, error: null })

            const user = await account.createEmailPasswordSession(email, password)
            get().loadAuth()
        } catch (error) {
            console.error(error)
            set({ error: error as string, isLoading: false })
        }
    },
    logout: async () => {
        await account.deleteSession("current")
        set({ user: null, isLoading: false, error: null })
    },
}))

export default useAuthStore
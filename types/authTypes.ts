import { RecordModel } from 'pocketbase'

export interface AuthUser extends RecordModel {
    id: string
    email: string
}

export interface AuthState {
    user: AuthUser | null
    isLoading: boolean
    loadAuth: () => Promise<void>
    login: (email: string, password: string) => Promise<void>
    register: (email: string, password: string, confirmPassword: string) => Promise<void>
    logout: () => Promise<void>
}
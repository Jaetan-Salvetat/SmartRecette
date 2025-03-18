import { Dialog, Text, Button } from "react-native-paper"
import useAuthStore from "@/stores/authStore"

interface LogoutDialogProps {
    logoutDialogVisible: boolean
    setLogoutDialogVisible: (visible: boolean) => void
}

export default function LogoutDialog({ logoutDialogVisible, setLogoutDialogVisible }: LogoutDialogProps) {
    const { logout } = useAuthStore()
    return <>
        <Dialog
            visible={logoutDialogVisible}
            onDismiss={() => setLogoutDialogVisible(false)}
        >
            <Dialog.Title>Se déconnecter</Dialog.Title>
            <Dialog.Content>
            <Text variant="bodyMedium">
                Êtes-vous sûr de vouloir vous déconnecter ?
            </Text>
            </Dialog.Content>
            <Dialog.Actions>
            <Button onPress={() => setLogoutDialogVisible(false)}>
                Annuler
            </Button>
            <Button onPress={logout}>Se déconnecter</Button>
            </Dialog.Actions>
        </Dialog>
    </>
}
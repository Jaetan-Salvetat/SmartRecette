import { ActivityIndicator, View, StyleSheet } from 'react-native'
import { Portal, Dialog, Text } from 'react-native-paper'

interface LoadingDialogProps {
    isLoading: boolean
    text: string
}

export default function LoadingDialog({ isLoading, text }: LoadingDialogProps) {
  return (
    <Portal>
        <Dialog visible={isLoading} dismissable={false}>
          <Dialog.Content>
            <View style={styles.dialogContent}>
                <ActivityIndicator size="large" />
                <Text style={styles.dialogText}>
                    {text}
                </Text>
            </View>
          </Dialog.Content>
        </Dialog>
      </Portal>
  )
}

const styles = StyleSheet.create({
    dialogContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    dialogText: {
        marginLeft: 20,
        fontSize: 16
    }
})

import { useNavigation } from "expo-router"
import { Appbar } from "react-native-paper"

export default function CameraHeader({ appbarTitle }: { appbarTitle: string }) {
    const navigation = useNavigation()
    
    return <>
        <Appbar.Header>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Content title={appbarTitle} />
        </Appbar.Header>
    </>
}
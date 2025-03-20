import { Appbar } from "react-native-paper";
import { useNavigation } from "expo-router";

export default function CreateManuallyHeader() {
    const navigation = useNavigation()
    return <>
        <Appbar.Header>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Content title="Créer une recette" />
        </Appbar.Header>
    </>
}
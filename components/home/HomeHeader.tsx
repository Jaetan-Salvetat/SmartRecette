import { Appbar, Searchbar } from "react-native-paper"
import { StyleSheet } from "react-native"

interface HomeHeaderProps {
    setLogoutDialogVisible: (visible: boolean) => void
    setSearchQuery: (query: string) => void
    searchQuery: string
}

export default function HomeHeader({ setLogoutDialogVisible, setSearchQuery, searchQuery }: HomeHeaderProps) {
    return <>
        <Appbar.Header>
            <Appbar.Content title="Mes Recettes" />
            <Appbar.Action
            icon="account"
            onPress={() => setLogoutDialogVisible(true)}
            />
        </Appbar.Header>

        <Searchbar
            placeholder="Rechercher une recette"
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchBar}
        />
    </>
}

const styles = StyleSheet.create({
    searchBar: {
      margin: 10,
      elevation: 2,
    }
  })
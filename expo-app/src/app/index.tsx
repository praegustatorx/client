import { Link, Redirect } from "expo-router"
import { StyleSheet, Button } from "react-native"
import { View } from "../components/Themed"

import { useAuth } from "../providers/AuthProvider";
const Index = () => {

    const { isAuthenticated } = useAuth()

    if (isAuthenticated) {
        return <Redirect href='/(app)' />
    }

    return (
        <View style={styles.pageContainer}>
            <View style={styles.container}>
                <Link href={'/LoginPage'} asChild>
                    <Button title="Login" />
                </Link>
                <Link href={'/SignUpPage'} asChild>
                    <Button title="Sign Up" />
                </Link>
                <Link href={'/(app)'} asChild>
                    <Button title="Tabs" />
                </Link>
            </View >
        </View>
    )
}

export default Index;


const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        backgroundColor: 'purple'
    },
    container: {
        flex: 1,
        height: 90,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'orange'
    },
})

import { View } from "../components/Themed"
import { Link, Redirect } from "expo-router"
import { Button } from "react-native"
import { useAuth } from "../providers/AuthProvider";
const Index = () => {

    const { isAuthenticated } = useAuth()

    if (!isAuthenticated) {
        return <Redirect href='/LoginPage' />
    }

    < View >
        <Link href={'/LoginPage'} asChild>
            <Button title="auth LoginPage" />
        </Link>
        <Link href={'/(tabs)'} asChild>
            <Button title="auth" />
        </Link>
    </View >
}
export default Index;
import { StyleSheet, Button, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { Text, View, } from '@/src/components/Themed';
import { Link } from 'expo-router';
import { useAuth } from '@/src/providers/AuthProvider';
const LoginPage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { isAuthenticated, login, logout } = useAuth()


    const signIn = () => {
        setLoading(true)
        login()
        console.log('Signing In...')
        setLoading(false)
    }
    return (
        <View style={styles.container} lightColor='#fff' darkColor='#000'>
            <Text> Login Page </Text>
            {loading ? (
                <ActivityIndicator color={'#000'} animating={true} size="small" />
            ) : (
                <>
                    <Button title="Sign In" onPress={signIn} />
                    <Link href={'/SignUpPage'} asChild>
                        <Button title='Go To Sign Up' />
                    </Link>
                </>
            )}
        </View>
    );
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default LoginPage;

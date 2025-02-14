import { StyleSheet, Button, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { Text, View, } from '@/src/components/Themed';
import { Link } from 'expo-router';
const LoginPage = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const signUp = () => {
        setLoading(true)
        console.log('Signing Up...')
        setLoading(false)
    }

    return (
        <View style={styles.container} lightColor='#fff' darkColor='#000'>
            <Text> SignUp </Text>
            {loading ? (
                <ActivityIndicator color={'#000'} animating={true} size="small" />
            ) : (
                <>
                    <Button title="Sign Up" onPress={signUp} />
                    <Link href={'/LoginPage'} asChild>
                        <Button title="Login" />
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

import { type FC } from 'react';
import { TextInputProps } from 'react-native';
import { TextInput } from 'react-native';
import { View } from '../components/Themed';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native';

interface StyledInputProps extends TextInputProps {
    label?: string;
    error?: string;
}

export const StyledInput: FC<StyledInputProps> = ({ label, error, style, ...props }: StyledInputProps) => {
    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput placeholder='Enter your name' {...props} style={styles.input} />
            {error && <Text>{error}</Text>}
        </View>

    )
}


const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        width: 250,
    },
    label: {
        fontSize: 14,
        marginBottom: 5,
        color: "#333",
    },
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        backgroundColor: "#fff",
    },
    inputError: {
        borderColor: "red",
    },
    errorText: {
        color: "red",
        fontSize: 12,
        marginTop: 5,
    },
});
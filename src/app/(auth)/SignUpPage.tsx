import { useState } from "react";
import { Button, Alert, StyleSheet } from "react-native";
import { TextInput } from "../../components/Themed";
import { View, Text } from "../../components/Themed";
import { Link } from "expo-router";
import axios from "axios";
import { useMutation } from "react-query";

interface RegisterCredentials {
  email: string;
  name: string;
  password: string;
}


const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const register = async (
    credentials: RegisterCredentials
  ): Promise<RegisterCredentials> => {
    const response = await axios.post(
      "http://10.154.252.20:8005/auth/register",
      credentials
    );
    console.log(response);
    return response.data;
  };

  const mutation = useMutation<RegisterCredentials, Error, RegisterCredentials>(
    register,
    {
      onSuccess: (data) => {
        // Show an alert with the modified email and password
        Alert.alert(
          "Signed up successfully",
        );
      },
      onError: (error) => {
        Alert.alert("Error", `Something went wrong: ${error.message}`);
      },
    }
  );

  const handleSignUp = () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill out all fields");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    console.log('registering')
    mutation.mutate({ email, name, password });

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleSignUp} />
      <Link href="/LoginPage">
        <Text style={styles.link}>Already have an account? Log In</Text>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    width: "80%",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  link: {
    marginTop: 16,
    color: "#3b82f6",
    textAlign: "center",
  },
});

export default SignUpPage;

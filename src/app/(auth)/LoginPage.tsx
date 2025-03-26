import { useState } from "react";
import { TextInput, Button, Alert, StyleSheet } from "react-native";
import { View, Text } from "../../components/Themed";
import { Link } from "expo-router";

import { useMutation } from "react-query";
import axios from "axios";

export interface LoginCredentials {
  email: string;
  password: string;
}

export const login = async (
  credentials: LoginCredentials
): Promise<LoginCredentials> => {
  const response = await axios.post(
    "http://192.168.1.199:8000/auth/login",
    credentials
  );
  console.log(response);
  return response.data;
};

export const test = async () => {
  const response = await axios.get("http://localhost:8000/auth/test");
  console.log(response);
  return response.data;
};

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Define the mutation using React Query
  const mutation = useMutation<LoginCredentials, Error, LoginCredentials>(
    login,
    {
      onSuccess: (data) => {
        // Show an alert with the modified email and password
        Alert.alert(
          "Login Success",
          `Email: ${data.email}\nPassword: ${data.password}`
        );
      },
      onError: (error) => {
        Alert.alert("Error", `Something went wrong: ${error.message}`);
      },
    }
  );

  const handleLogin = () => {
    if (email && password) {
      // test();
      mutation.mutate({ email, password });
    } else {
      Alert.alert("Error", "Please enter email and password");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
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
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Link href="/SignUpPage">
        <Text style={styles.link}>Don't have an account? Sign Up</Text>
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
    borderWidth: 1,
    color: "white",
  },
  link: {
    marginTop: 16,
    color: "#3b82f6",
    textAlign: "center",
  },
});

export default LoginPage;

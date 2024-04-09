import React, { useState, useEffect } from "react";
import {
  Button,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// TODO: Ne pas oublier d'importer la méthode onLogin de App.js pour gérer la redirection si user loggé

export default function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [isError, setIsError] = useState(false);

  const handleInputChange = (email, password) => {
    setIsDisabled(email === "" || password === "");
  };

  const handleInputFocus = () => {
    setIsError(false);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://api.myoty.com/api/login_connect",
        { username: email, password: password }
      );
      if (response.status !== 200) {
        throw new Error("Identifiants invalides");
      }
      const token = response.data.token;
      console.log("coucou token", token);
      onLogin(token); // Stocker le token en mémoire
    } catch (error) {
      console.error("Erreur lors de la connexion : ", error);
      setIsError(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Connectez-vous à votre espace MyOTY</Text>
        <TextInput
          style={[styles.input, isError && styles.errorInput]}
          placeholder="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            handleInputChange(text, password);
          }}
          onFocus={handleInputFocus}
          keyboardType="email-address"
        />
        <TextInput
          style={[styles.input, isError && styles.errorInput]}
          placeholder="Password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            handleInputChange(email, text);
          }}
          onFocus={handleInputFocus}
          secureTextEntry
        />
        {isError && (
          <Text style={styles.errorMessage}>
            Identifiants invalides. Veuillez réessayer.
          </Text>
        )}
        <View style={styles.buttonContainer}>
          <Button title="Login" onPress={handleLogin} disabled={isDisabled} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  formContainer: {
    width: windowWidth * 0.7,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 20,
    fontSize: 16,
    width: "100%",
    alignSelf: "center",
  },
  errorInput: {
    borderColor: "red",
  },
  errorMessage: {
    color: "red",
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 24,
  },
});

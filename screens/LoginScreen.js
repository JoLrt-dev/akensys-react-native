import React, { useState } from "react";
import {
  Button,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import axios from "axios";

// TODO: Ne pas oublier d'importer la méthode onLogin de App.js pour gérer la redirection si user loggé

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const handleInputChange = (email, password) => {
    setIsDisabled(email === "" || password === "");
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
      // TODO:Appel de la fonction onLogin avec le token
    } catch (error) {
      console.error("Erreur lors de la connexion : ", error.message);
      // Gerer les erreurs de connexion ici
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Connectez-vous à votre espace myoty</Text>
        <TextInput
          style={[styles.input, { alignSelf: "center" }]} // Ajouter alignSelf: 'center'
          placeholder="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            handleInputChange(text, password);
          }}
          keyboardType="email-address"
        />
        <TextInput
          style={[styles.input, { alignSelf: "center" }]} // Ajouter alignSelf: 'center'
          placeholder="Password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            handleInputChange(email, text);
          }}
          secureTextEntry
        />
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
  },
  buttonContainer: {
    marginTop: 24,
  },
});

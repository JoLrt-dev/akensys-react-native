import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import axios from "axios";

const Menu1Screen = ({ token }) => {
  const [networkInfo, setNetworkInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  //Effectuer la requête API au montage du composant. Le token est en prop du component
  useEffect(() => {
    const fetchNetworkInfo = async () => {
      try {
        const response = await axios.get(
          "https://api.myoty.com/api/listeNetworksUser?user_uuid=31DVDQ3JDXmoo9K",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setNetworkInfo(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchNetworkInfo();
  }, [token]);

  // Message de chargement si latence avec l'appel API
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
  // Message d'erreur si retourné KO par l'API
  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }
  // Succès
  return (
    <View style={styles.container}>
      <Text>
        {networkInfo && (
          <Text>Le nom du network est : {networkInfo[0].network.libelle}</Text>
        )}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Menu1Screen;

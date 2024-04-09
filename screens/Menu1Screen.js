import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import axios from "axios";

const Menu1Screen = ({ token }) => {
  const [networkInfo, setNetworkInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Menu1</Text>
      {networkInfo && (
        <Text>Le nom du network est : {networkInfo[0].network.libelle}</Text>
      )}
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

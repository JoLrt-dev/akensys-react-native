import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function LoginScreen() {
  return (
    <View>
      <Text style={styles.h1}> Login </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  h1: {
    fontFamily: "Roboto",
    fontSize: 20,
    fontWeight: "bold",
  },
});

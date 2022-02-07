import React from "react";
import { Text, StyleSheet, Platform } from "react-native";

function AppText({ children }) {
  return <Text style={styles.text}>{children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    marginLeft: 40,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    color: "red",
  },
});

export default AppText;

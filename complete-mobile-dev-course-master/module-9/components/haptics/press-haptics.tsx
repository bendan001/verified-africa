import * as Haptics from "expo-haptics";
import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const PressHaptics = () => {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert("Pressed!");
  };

  const handlePressIn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const handleLongPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    Alert.alert("Long Pressed!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Long Press Haptics</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onLongPress={handleLongPress}
      >
        <Text style={styles.buttonText}>Press or Long Press Me</Text>
      </TouchableOpacity>

      <Text style={styles.hint}>
        👆 Touch for medium vibration{"\n"}
        👆 Tap for light vibration{"\n"}
        ⏱️ Hold for heavy vibration
      </Text>
    </View>
  );
};

export default PressHaptics;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 30,
    borderRadius: 15,
    width: 250,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  hint: {
    marginTop: 20,
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
  },
});

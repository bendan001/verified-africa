import * as Linking from "expo-linking";
import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const BasicLinking = () => {
  const openWebsite = async () => {
    const url = "https://www.surajkumarjha.me";

    const canOpen = await Linking.canOpenURL(url);

    if (canOpen) {
      await Linking.openURL(url);
    } else {
      Alert.alert("Error", "Cannot open this url");
    }
  };

  const sendSMS = async () => {
    const phoneNumber = "+1234567890";
    const message = "Hello from my app!";

    // iOS
    const url = `sms:${phoneNumber}&body=${message}`;
    // Android would be: `sms:${phoneNumber}?body=${message}`

    await Linking.openURL(url);
  };

  const openMaps = async () => {
    const address = "1600 Amphitheatre Parkway, Mountain View, CA";
    const url = `https://maps.google.com/?q=${encodeURIComponent(address)}`;

    await Linking.openURL(url);
  };

  const openWhatsApp = async () => {
    const phoneNumber = "1234567890";
    const message = "Hello!";
    const url = `whatsapp://send?phone=${phoneNumber}&text=${message}`;

    const canOpen = await Linking.canOpenURL(url);

    if (canOpen) {
      await Linking.openURL(url);
    } else {
      Alert.alert("WhatsApp", "WhatsApp is not installed");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Linking Examples</Text>

      <TouchableOpacity style={styles.button} onPress={openWebsite}>
        <Text style={styles.buttonText}>🌐 Open Website</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity style={styles.button} onPress={sendEmail}>
        <Text style={styles.buttonText}>📧 Send Email</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={makePhoneCall}>
        <Text style={styles.buttonText}>📞 Make Phone Call</Text>
      </TouchableOpacity> */}

      <TouchableOpacity style={styles.button} onPress={sendSMS}>
        <Text style={styles.buttonText}>💬 Send SMS</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={openMaps}>
        <Text style={styles.buttonText}>🗺️ Open Maps</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={openWhatsApp}>
        <Text style={styles.buttonText}>📱 Open WhatsApp</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasicLinking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 18,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

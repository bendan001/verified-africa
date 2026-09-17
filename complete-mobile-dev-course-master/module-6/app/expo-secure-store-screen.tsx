import * as SecureStore from "expo-secure-store";
import React, { useState } from "react";
import { Alert, Button, StyleSheet, TextInput, View } from "react-native";

const ExpoSecureScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSave = async () => {
    try {
      const canUseBiometrics = await SecureStore.canUseBiometricAuthentication();
      if (canUseBiometrics) {
        await SecureStore.setItemAsync("username", username, {
          requireAuthentication: true,
          authenticationPrompt: "Authenticate to access your secret",
        });
        await SecureStore.setItemAsync("password", password, {
          requireAuthentication: true,
          authenticationPrompt: "Authenticate to access your secret",
        
        });
      }
     
    else{
      alert("no biometrics")
    }

     
    } catch (error) {
      Alert.alert("Error", "Failed to save data!");
      console.log(error);
    }
  };

  const onLoad = async () => {
    try {
      const savedUsername = await SecureStore.getItemAsync("username");
      const savedPassword = await SecureStore.getItemAsync("password");

      Alert.alert(
        "Loaded",
        `Username: ${savedUsername} and Password: ${savedPassword}`
      );
    } catch (error) {}
  };

  const onDelete = async () => {
    try {
      await SecureStore.deleteItemAsync("username");
      await SecureStore.deleteItemAsync("password");
      setUsername("");
      setPassword("");
      Alert.alert("Success", "Credentials cleared!");
    } catch (error) {
      Alert.alert("Error", "Failed to clear credentials");
    }
  };

  return (
    <View style={{ padding: 20, marginTop: 50 }}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
      />

      <Button title="Save Credentials" onPress={onSave} />
      <View style={{ marginVertical: 10 }} />
      <Button title="Load Credentials" onPress={onLoad} />

      <View style={{ marginVertical: 10 }} />
      <Button title="Clear Credentials" onPress={onDelete} />
    </View>
  );
};

export default ExpoSecureScreen;

const styles = StyleSheet.create({});

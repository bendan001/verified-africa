import * as Notifications from "expo-notifications";
import React, { useEffect, useState } from "react";
import { Alert, Button, Platform, StyleSheet, Text, View } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: false,
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function Index() {
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    setPermissionGranted(status === "granted");
  };

  const requestNotificationPermission = async () => {
    try {
      const { status } = await Notifications.requestPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Error", "Permission not granted");
        return;
      }

      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
        });
      }

      setPermissionGranted(true);
      Alert.alert("Success", "Notification permission granted!");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const sendTestNotification = async () => {
    if (!permissionGranted) {
      Alert.alert("Error", "Please grant notification permission first");
      return;
    }

    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Hello from Expo 👋",
          body: "This is a local notification",
        },
        trigger: null,
      });
    } catch (error) {
      Alert.alert("Error", "Failed to send notification");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notification Demo</Text>

      <Text style={styles.status}>
        Permission Status: {permissionGranted ? "✅ Granted" : "❌ Not Granted"}
      </Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Request Permission"
          onPress={requestNotificationPermission}
          disabled={permissionGranted}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Send Test Notification" onPress={sendTestNotification} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  status: {
    fontSize: 16,
    marginBottom: 30,
  },
  buttonContainer: {
    marginVertical: 10,
    width: "80%",
  },
});

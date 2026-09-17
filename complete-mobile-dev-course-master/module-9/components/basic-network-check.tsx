import * as Network from "expo-network";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const BasicNetworkCheck = () => {
  const [isConnected, setIsConnected] = useState<any>(null);
  const [networkType, setNetworkType] = useState<any>("");

  const checkNetwork = async () => {
    const networkState = await Network.getNetworkStateAsync();

    setIsConnected(networkState.isConnected);
    setNetworkType(networkState.type);

    console.log("Network State:", networkState);
  };

  useEffect(() => {
    checkNetwork();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Network Status</Text>

      <Text style={styles.status}>
        Status: {isConnected ? "✅ Connected" : "❌ Disconnected"}
      </Text>

      <Text style={styles.type}>Type: {networkType}</Text>

      <Button title="Refresh" onPress={checkNetwork} />
    </View>
  );
};

export default BasicNetworkCheck;

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
    marginBottom: 20,
  },
  status: {
    fontSize: 18,
    marginVertical: 10,
  },
  type: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
});

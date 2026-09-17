import * as Network from "expo-network";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const NetworkDetails = () => {
  const [networkInfo, setNetworkInfo] = useState<any>({
    isConnected: false,
    isInternetReachable: null,
    ipAddress: null,
    loading: true,
  });

  useEffect(() => {
    fetchNetworkDetails();
  }, []);

  const fetchNetworkDetails = async () => {
    try {
      // Get network state
      const state = await Network.getNetworkStateAsync();

      // Get IP address if connected
      let ip = null;
      if (state.isConnected) {
        ip = await Network.getIpAddressAsync();
      }

      setNetworkInfo({
        isConnected: state.isConnected,
        isInternetReachable: state.isInternetReachable,
        ipAddress: ip,
        loading: false,
      });
    } catch (error) {
      console.error("Error:", error);
      setNetworkInfo((prev) => ({ ...prev, loading: false }));
    }
  };

  if (networkInfo.loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Network Details</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Connected:</Text>
        <Text style={styles.value}>
          {networkInfo.isConnected ? "Yes ✅" : "No ❌"}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Internet Reachable:</Text>
        <Text style={styles.value}>
          {networkInfo.isInternetReachable === null
            ? "Checking..."
            : networkInfo.isInternetReachable
              ? "Yes 🌐"
              : "No 🚫"}
        </Text>
      </View>

      {networkInfo.ipAddress && (
        <View style={styles.card}>
          <Text style={styles.label}>IP Address:</Text>
          <Text style={styles.value}>{networkInfo.ipAddress}</Text>
        </View>
      )}

      <Text style={styles.info}>
        💡 isConnected checks device connection{"\n"}
        🌐 isInternetReachable checks actual internet
      </Text>
    </View>
  );
};

export default NetworkDetails;

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
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    color: "#666",
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  info: {
    marginTop: 20,
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    lineHeight: 22,
  },
});

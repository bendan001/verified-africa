import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ControlPanelProps {
  isTracking: boolean;
  locationCount: number;
  onStartTracking: () => void;
  onStopTracking: () => void;
  onClearHistory: () => void;
}

export const ControlPanel = ({
  isTracking,
  locationCount,
  onStartTracking,
  onStopTracking,
  onClearHistory,
}: ControlPanelProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.counter}>📍 Locations: {locationCount}</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[
            styles.button,
            isTracking ? styles.buttonStop : styles.buttonStart,
          ]}
          onPress={isTracking ? onStopTracking : onStartTracking}
        >
          <Text style={styles.buttonText}>
            {isTracking ? "⏹ Stop" : "▶ Start"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonClear]}
          onPress={onClearHistory}
        >
          <Text style={styles.buttonText}>🗑 Clear</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  counter: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonStart: {
    backgroundColor: "#4CAF50",
  },
  buttonStop: {
    backgroundColor: "#f44336",
  },
  buttonClear: {
    backgroundColor: "#FF9800",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});

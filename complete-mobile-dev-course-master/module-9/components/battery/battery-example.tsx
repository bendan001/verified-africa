import * as Battery from "expo-battery";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const BatteryExample = () => {
  const [batteryLevel, setBatteryLevel] = useState(null);
  const [batteryState, setBatteryState] = useState<Battery.BatteryState | null>(
    null,
  );
  const [lowPowerMode, setLowPowerMode] = useState(false);

  useEffect(() => {
    // Get initial battery info
    getBatteryInfo();

    // Listen for battery level changes
    const levelSubscription = Battery.addBatteryLevelListener(
      ({ batteryLevel }) => {
        setBatteryLevel(batteryLevel);
      },
    );

    // Listen for battery state changes (charging/unplugged)
    const stateSubscription = Battery.addBatteryStateListener(
      ({ batteryState }) => {
        setBatteryState(batteryState);
      },
    );

    // Listen for low power mode changes
    const powerSubscription = Battery.addLowPowerModeListener(
      ({ lowPowerMode }) => {
        setLowPowerMode(lowPowerMode);
      },
    );

    // Cleanup
    return () => {
      levelSubscription.remove();
      stateSubscription.remove();
      powerSubscription.remove();
    };
  }, []);

  const getBatteryInfo = async () => {
    const level = await Battery.getBatteryLevelAsync();
    const state = await Battery.getBatteryStateAsync();
    const powerMode = await Battery.isLowPowerModeEnabledAsync();

    setBatteryLevel(level);
    setBatteryState(state);
    setLowPowerMode(powerMode);
  };

  const getStateText = () => {
    switch (batteryState) {
      case Battery.BatteryState.CHARGING:
        return "⚡ Charging";
      case Battery.BatteryState.FULL:
        return "✅ Full";
      case Battery.BatteryState.UNPLUGGED:
        return "🔋 Unplugged";
      default:
        return "❓ Unknown";
    }
  };

  const getBatteryColor = () => {
    if (batteryLevel === null) return "#999";
    if (batteryLevel > 0.5) return "#34C759";
    if (batteryLevel > 0.2) return "#FF9500";
    return "#FF3B30";
  };

  const getBatteryIcon = () => {
    if (batteryState === Battery.BatteryState.CHARGING) return "⚡";
    if (batteryLevel === null) return "🔋";
    if (batteryLevel > 0.5) return "🔋";
    if (batteryLevel > 0.2) return "🪫";
    return "🪫";
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Battery Monitor</Text>

      <View style={styles.batteryCard}>
        <Text style={styles.icon}>{getBatteryIcon()}</Text>
        <Text style={[styles.percentage, { color: getBatteryColor() }]}>
          {batteryLevel !== null ? `${Math.round(batteryLevel * 100)}%` : "--"}
        </Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.label}>Status</Text>
        <Text style={styles.value}>{getStateText()}</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.label}>Low Power Mode</Text>
        <Text style={styles.value}>
          {lowPowerMode ? "🟢 Enabled" : "⚪ Disabled"}
        </Text>
      </View>

      {batteryLevel !== null && batteryLevel < 0.2 && (
        <View style={styles.warningBox}>
          <Text style={styles.warningText}>
            ⚠️ Low Battery! Please charge your device.
          </Text>
        </View>
      )}
    </View>
  );
};

export default BatteryExample;
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
  batteryCard: {
    backgroundColor: "white",
    padding: 40,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  icon: {
    fontSize: 60,
    marginBottom: 10,
  },
  percentage: {
    fontSize: 48,
    fontWeight: "bold",
  },
  infoCard: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  warningBox: {
    backgroundColor: "#FFF3CD",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  warningText: {
    color: "#856404",
    fontSize: 14,
    textAlign: "center",
  },
});

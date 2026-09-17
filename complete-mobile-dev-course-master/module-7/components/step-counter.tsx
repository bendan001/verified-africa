import { Pedometer } from "expo-sensors";
import React, { useEffect, useState } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

const DAILY_GOAL = 2000;

const StepCounter = () => {
  const [steps, setSteps] = useState(0);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    let subscription: any;

    const setup = async () => {
      const avail = await Pedometer.isAvailableAsync();
      setAvailable(avail);

      if (!avail) return;

      if (Platform.OS === "ios") {
        const start = new Date();
        start.setHours(0, 0, 0, 0);

        try {
          const pastSteps = await Pedometer.getStepCountAsync(
            start,
            new Date(),
          );
          setSteps(pastSteps.steps);

          subscription = Pedometer.watchStepCount((result) => {
            setSteps(pastSteps.steps + result.steps);
          });
        } catch (e) {
          console.log("Error getting step count:", e);
        }
      } else {
        subscription = Pedometer.watchStepCount((result) => {
          setSteps(result.steps);
        });
      }
    };

    setup();

    return () => {
      subscription && subscription.remove();
    };
  }, []);

  if (!available) {
    return <Text>Pedometer not available on this device</Text>;
  }

  const progress = Math.min((steps / DAILY_GOAL) * 100, 100);
  const emoji = steps >= DAILY_GOAL ? "🏆" : steps > 1000 ? "💪" : "🚶";

  return (
    <View style={styles.card}>
      <Text style={styles.emoji}>{emoji}</Text>

      <Text style={styles.count}>{steps.toLocaleString()} steps</Text>

      <View style={styles.bar}>
        <View style={[styles.fill, { width: `${progress}%` }]} />
      </View>

      <Text style={styles.message}>
        {steps >= DAILY_GOAL
          ? "Goal achieved!"
          : steps > 1000
            ? "Great walk!"
            : "Keep going!"}
      </Text>

      {Platform.OS === "android" && (
        <Text style={styles.note}>Steps since app opened</Text>
      )}
    </View>
  );
};

export default StepCounter;

const styles = StyleSheet.create({
  card: {
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
    backgroundColor: "#f5f6fa",
  },
  emoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  count: {
    fontSize: 42,
    fontWeight: "600",
  },
  bar: {
    width: 240,
    height: 14,
    backgroundColor: "#ddd",
    borderRadius: 7,
    marginVertical: 12,
  },
  fill: {
    height: "100%",
    backgroundColor: "#4caf50",
    borderRadius: 7,
  },
  message: {
    fontSize: 20,
    marginTop: 4,
  },
  note: {
    fontSize: 12,
    color: "#666",
    marginTop: 8,
  },
});

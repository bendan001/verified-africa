import { LightSensor } from "expo-sensors";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function LightMood() {
  const [lux, setLux] = useState(0);

  useEffect(() => {
    const sub = LightSensor.addListener(({ illuminance }) => {
      setLux(illuminance);
    });
    return () => sub.remove();
  }, []);

  let mood = "Dim";
  let emoji = "🌙";
  let bgColor = "#2c2c54";

  if (lux > 1000) {
    mood = "Bright";
    emoji = "☀️";
    bgColor = "#ffeaa7";
  } else if (lux > 300) {
    mood = "Normal";
    emoji = "🌤️";
    bgColor = "#dff9fb";
  }

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.mood}>{mood}</Text>
      <Text style={styles.lux}>{lux.toFixed(0)} lux</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    borderRadius: 16,
    alignItems: "center",
  },
  emoji: {
    fontSize: 60,
    marginBottom: 10,
  },
  mood: {
    fontSize: 26,
    fontWeight: "600",
  },
  lux: {
    fontSize: 18,
    opacity: 0.7,
  },
});

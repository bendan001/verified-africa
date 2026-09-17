import { Magnetometer } from "expo-sensors";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const Compass = () => {
  const [direction, setDirection] = useState("Unknown");
  const [arrow, setArrow] = useState("🧭");
  const [color, setColor] = useState("#444");

  useEffect(() => {
    const sub = Magnetometer.addListener(({ x, y }) => {
      if (Math.abs(x) > Math.abs(y)) {
        if (x > 0) {
          setDirection("East");
          setArrow("➡️");
          setColor("#2196F3");
        } else {
          setDirection("West");
          setArrow("⬅️");
          setColor("#9C27B0");
        }
      } else {
        if (y > 0) {
          setDirection("North");
          setArrow("⬆️");
          setColor("#4CAF50");
        } else {
          setDirection("South");
          setArrow("⬇️");
          setColor("#F44336");
        }
      }
    });

    return () => sub.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={[styles.arrow, { color }]}>{arrow}</Text>
      <Text style={[styles.text, { color }]}>Facing {direction}</Text>
    </View>
  );
};

export default Compass;

const styles = StyleSheet.create({
  container: {
    padding: 30,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 16,
  },
  arrow: {
    fontSize: 60,
    marginBottom: 10,
  },
  text: {
    fontSize: 26,
    fontWeight: "600",
  },
});

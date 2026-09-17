import { Accelerometer } from "expo-sensors";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("window");
const BOX_SIZE = width - 40;
const BALL_SIZE = 30;

const Index = () => {
  const [pos, setPos] = useState({
    x: (BOX_SIZE - BALL_SIZE) / 2,
    y: (BOX_SIZE - BALL_SIZE) / 2,
  });

  const [sensorValues, setSensorValues] = useState({ x: 0, y: 0 });

  useEffect(() => {
    Accelerometer.setUpdateInterval(20);

    const subscription = Accelerometer.addListener((data) => {
      setSensorValues({ x: data.x, y: data.y });

      setPos((prevPos) => {
        const sensitivity = 15;
        let newX = prevPos.x + data.x * sensitivity;
        let newY = prevPos.y - data.y * sensitivity;
        if (newX < 0) newX = 0;
        if (newY < 0) newY = 0;

        if (newX > BOX_SIZE - BALL_SIZE) newX = BOX_SIZE - BALL_SIZE;
        if (newY > BOX_SIZE - BALL_SIZE) newY = BOX_SIZE - BALL_SIZE;

        return { x: newX, y: newY };
      });
    });

    return () => subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>Tilt to Move!</Text>

      <View style={styles.gameBox}>
        <View
          style={[
            styles.ball,
            {
              transform: [{ translateX: pos.x }, { translateY: pos.y }],
            },
          ]}
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>X: {sensorValues.x.toFixed(2)}</Text>
        <Text style={styles.infoText}>Y: {sensorValues.y.toFixed(2)}</Text>
        <Text style={styles.instruction}>Keep the ball inside the box</Text>
      </View>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#F3F4F6",
    marginBottom: 40,
    letterSpacing: 1,
  },
  gameBox: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    backgroundColor: "#1E293B",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#374151",

    position: "relative",
    overflow: "hidden",
  },
  ball: {
    width: BALL_SIZE,
    height: BALL_SIZE,
    borderRadius: BALL_SIZE / 2,
    backgroundColor: "#60A5FA",
    position: "absolute",
    top: 0,
    left: 0,
    borderWidth: 2,
    borderColor: "#93C5FD",
    shadowColor: "#60A5FA",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  infoContainer: {
    marginTop: 40,
    alignItems: "center",
    padding: 15,
    backgroundColor: "#1F2937",
    borderRadius: 12,
    width: "100%",
  },
  infoText: {
    color: "#9CA3AF",
    fontFamily: "monospace",
    fontSize: 16,
    marginVertical: 2,
  },
  instruction: {
    color: "#6B7280",
    marginTop: 10,
    fontSize: 14,
  },
});

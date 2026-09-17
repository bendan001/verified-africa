import { Accelerometer } from "expo-sensors";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const TitleCounter = () => {
  const [tilt, setTilt] = useState("Stable");

  useEffect(() => {
    const sub = Accelerometer.addListener(({ x, y }) => {
      if (Math.abs(x) > 0.4) setTilt(x > 0 ? "Tilt Right" : "Tilt Left");
      else if (Math.abs(y) > 0.4) setTilt(y > 0 ? "Tilt Up" : "Tilt Down");
      else setTilt("Stable");
    });

    return () => sub.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Device Tilt: {tilt}</Text>
    </View>
  );
};

export default TitleCounter;

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: "center" },
  text: { fontSize: 24 },
});

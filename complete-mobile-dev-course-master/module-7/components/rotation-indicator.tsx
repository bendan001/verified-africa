import { Gyroscope } from "expo-sensors";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const RotationIndicator = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    Gyroscope.setUpdateInterval(100);

    const sub = Gyroscope.addListener(({ z }) => {
      const rotationAmount = Math.abs(z) * 2; //small increase

      setProgress((prev) => {
        const next = prev + rotationAmount;
        return next > 100 ? 100 : next;
      });
    });

    return () => sub.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rotate Your Phone</Text>

      <View style={styles.bar}>
        <View style={[styles.fill, { width: `${progress}%` }]} />
      </View>

      <Text style={styles.percent}>{Math.round(progress)}%</Text>

      <Button title="Reset" onPress={() => setProgress(0)} />
    </View>
  );
};

export default RotationIndicator;

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: "center" },
  title: { fontSize: 22, marginBottom: 10 },
  bar: {
    width: 250,
    height: 14,
    backgroundColor: "#ddd",
    borderRadius: 7,
  },
  fill: {
    height: "100%",
    backgroundColor: "#4caf50",
    borderRadius: 7,
  },
  percent: { marginTop: 8, fontSize: 18 },
});

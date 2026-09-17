import { Slot } from "expo-router";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My App Header</Text>

      <Slot />
      <Text style={styles.footer}>My App Footer</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    padding: 12,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  footer: {
    padding: 8,
    fontSize: 16,
    textAlign: "center",
    backgroundColor: "#f1f1f1",
  },
});

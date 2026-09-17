import { Slot } from "expo-router";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileLayout() {
  return (
    <SafeAreaView style={styles.container}>
        <Text>Profile</Text>

      <Slot />
    
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

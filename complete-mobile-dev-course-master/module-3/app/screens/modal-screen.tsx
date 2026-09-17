import { useNavigation } from "@react-navigation/native";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";

export default function ModalScreen({ route }) {
  const navigation = useNavigation();

  // Example: receiving params if passed
  const { title, data } = route.params || {};

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>This is a Modal Screen</Text>
        
        {title && (
          <Text style={styles.subtitle}>Modal Title: {title}</Text>
        )}
        
        <Text style={styles.description}>
          Modal screens appear on top of your app content. They're perfect for:
        </Text>

        <View style={styles.list}>
          <Text style={styles.listItem}>• Filters and sorting options</Text>
          <Text style={styles.listItem}>• Forms and data input</Text>
          <Text style={styles.listItem}>• Confirmations and alerts</Text>
          <Text style={styles.listItem}>• Image viewers</Text>
          <Text style={styles.listItem}>• Share sheets</Text>
        </View>

        {data && (
          <View style={styles.dataContainer}>
            <Text style={styles.dataTitle}>Received Data:</Text>
            <Text style={styles.dataText}>{JSON.stringify(data, null, 2)}</Text>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <Button
            title="Close Modal"
            onPress={() => navigation.goBack()}
            color="#6200ee"
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Go to Home"
            onPress={() => navigation.navigate("home")}
            color="#03dac6"
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginBottom: 15,
    lineHeight: 24,
  },
  list: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  listItem: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
    lineHeight: 24,
  },
  dataContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  dataTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  dataText: {
    fontSize: 14,
    color: "#666",
    fontFamily: "monospace",
  },
  buttonContainer: {
    marginBottom: 15,
  },
});
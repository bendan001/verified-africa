import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
export default function AsyncStorageScreen() {
  const [output, setOutput] = useState("");

  const log = (msg: any) => setOutput((prev) => prev + "\n" + msg);
  const clear = () => setOutput("");

  const example1 = async () => {
    clear();

    await AsyncStorage.setItem("username", "Karan");
    log("saved: username = Karan");
  };

  const example2 = async()=>{
    clear();

    const value = await AsyncStorage.getItem("username");
    log(value)
  }

    const example3 = async()=>{
    clear();

   await AsyncStorage.removeItem("username");
    log("Data removed")
  }

  return (
    <View
    style={
      styles.container
    }
    >
      <Pressable onPress={example1}>
          <Text>Save Item into storage</Text>
      </Pressable>

         <Pressable onPress={example2}>
          <Text>Get Items</Text>
      </Pressable>

          <Pressable onPress={example3}>
          <Text>Delete Items</Text>
      </Pressable>

         <View style={styles.outputContainer}>
        <Text style={styles.outputTitle}>Output:</Text>
        <ScrollView style={styles.output}>
          <Text style={styles.outputText}>{output}</Text>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:20,
  },
    outputContainer: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    padding: 15,
  },
  outputTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  output: {
    flex: 1,
  },
  outputText: {
    color: '#00ff00',
    fontSize: 14,
    fontFamily: 'monospace',
  },

})
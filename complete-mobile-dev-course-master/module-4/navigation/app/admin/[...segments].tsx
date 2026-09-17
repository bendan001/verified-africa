import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const AdminCatchAll = () => {
    const {segments} = useLocalSearchParams<{segments:string[]}>();


    const pathDisplay = segments.join("/")

  return (
     <View style={styles.container}>
      <Text style={styles.title}>Admin Path</Text>
      <Text style={styles.pathText}>{pathDisplay || "admin"}</Text>
    </View>
  )
}

export default AdminCatchAll

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  pathText: {
    fontSize: 18,
    marginTop: 8,
    color: "gray",
  },
});
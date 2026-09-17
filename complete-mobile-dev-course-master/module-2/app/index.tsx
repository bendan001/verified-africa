import React from 'react';
import { Image, SectionList, StyleSheet, Text, View } from 'react-native';


const vegSections = [
  {
    title: "Leafy Greens",
    data: [
      { id: "1", name: "Spinach", image: "https://reactnative.dev/img/tiny_logo.png" },
      { id: "2", name: "Cabbage", image: "https://reactnative.dev/img/tiny_logo.png" },
    ],
  },
  {
    title: "Root Veggies",
    data: [
      { id: "3", name: "Carrot", image: "https://reactnative.dev/img/tiny_logo.png" },
      { id: "4", name: "Beetroot", image: "https://reactnative.dev/img/tiny_logo.png" },
    ],
  },
];

const Index = () => {
  return (
    <SectionList
    sections={vegSections}
    keyExtractor={(item)=>item.id}

    renderItem={({item})=>(
        <View style={styles.card}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <Text style={styles.title}>{item.name}</Text>
        </View>
    )}

    renderSectionHeader={({section})=>(
      <Text style={styles.header}>{section.title}</Text>
    )}

    
    />
  )
}

export default Index

const styles = StyleSheet.create({
  header: { fontSize: 22, fontWeight: "bold", margin: 8 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    margin: 5,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  image: { width: 35, height: 35, marginRight: 10 },
  title: { fontSize: 18 },
});
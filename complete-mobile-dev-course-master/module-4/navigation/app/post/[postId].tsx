import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const PostIdScreen = () => {
    const {postId} = useLocalSearchParams()
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Post Details</Text>
      <Text>Post ID: {postId}</Text>
     
    </View>
  )
}

export default PostIdScreen

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold" },
});
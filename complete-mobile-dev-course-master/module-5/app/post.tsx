import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

const Post = () => {
    const [posts , setPosts] = useState([]);
    const [loading , setLoading] = useState(true);

    useEffect(()=>{
        fetchPosts()
    },[])


    const fetchPosts = async()=>{
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts");
            const data = await response.json();

            setPosts(data)
        } catch (error) {
            console.error("Error fetching posts:" , error)
        }
        finally{
            setLoading(false)
        }
    }

    if(loading){
        return <ActivityIndicator size={"large"}/>
    }

  return (
     <FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={{ margin: 8 }}>
          <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
          <Text>{item.body}</Text>
        </View>
      )}
    />
  )
}

export default Post

const styles = StyleSheet.create({})
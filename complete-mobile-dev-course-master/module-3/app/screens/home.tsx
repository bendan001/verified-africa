import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';


const Home = () => {
  const navigation = useNavigation<any>()
  return (
    <View>
      <Text>Home</Text>
      {/* <Link screen={"details"}>
      Go to Details
      </Link> */}
      <Pressable onPress={()=>navigation.navigate("modal")}>
        <Text>
          Open Modal
        </Text>
      </Pressable>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const Profile = () => {
    const navigation = useNavigation();
  return (
    <View>
      {/* go back to 1 screen */}
      <Pressable onPress={() => navigation.popToTop()}> 
             <Text>Go Back</Text>
           </Pressable>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({})
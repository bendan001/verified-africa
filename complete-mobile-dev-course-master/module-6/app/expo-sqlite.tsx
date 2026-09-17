import { createTables } from '@/db/createTables'
import { Link } from 'expo-router'
import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'

const ExpoSqliteScreen = () => {

  useEffect(()=>{
    createTables()
  },[])

  return (
    <View>
      <Link href={"/users-list"}>Users List</Link>
    </View>
  )
}

export default ExpoSqliteScreen

const styles = StyleSheet.create({})
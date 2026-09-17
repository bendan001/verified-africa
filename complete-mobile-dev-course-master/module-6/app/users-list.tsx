import { deleteUser, getUsers } from '@/db/crud'
import { Link } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'


const UsersList = () => {
const [users , setUsers] = useState<any[]>([])

async function loadUsers() {
    const list = await getUsers();

    setUsers(list)
}

useEffect(()=>{
    loadUsers()
},[])

  return (
   <View>
      {users.map((u) => (
        <View key={u.id}>
          <Text>{u.name} — {u.email}</Text>
          <Pressable onPress={() => deleteUser(u.id).then(loadUsers)}>
            <Text>Delete</Text>
          </Pressable>
        </View>
      ))}

      <Link href={"/insert-user"}>
      Insert User
      </Link>
    </View>
  )
}

export default UsersList

const styles = StyleSheet.create({})
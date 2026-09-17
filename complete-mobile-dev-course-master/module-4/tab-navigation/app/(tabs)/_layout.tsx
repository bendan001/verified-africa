import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
export default function TabsLayout() {
  return <Tabs>

    <Tabs.Screen
    name="index"
    options={{
        tabBarLabel:"Home",
        tabBarIcon:()=><FontAwesome name="home" size={24}/>
    }}
    />

      <Tabs.Screen
    name="profile"
    options={{
        tabBarLabel:"Profile",
         tabBarIcon:()=><FontAwesome name="user" size={24}/>
    }}
    />

      <Tabs.Screen
    name="feed"
    options={{
        tabBarLabel:"My feed",
         tabBarIcon:()=><FontAwesome name="list" size={24}/>
    }}
    />
  </Tabs>;
}
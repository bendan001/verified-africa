import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Drawer } from "expo-router/drawer";
export default function RootLayout() {
  return <Drawer >
    <Drawer.Screen name="index" options={{
      drawerLabel:"Home",
      drawerIcon:()=><FontAwesome name="home" size={24}/>
    }}/>
    <Drawer.Screen name="dashboard"/>
    <Drawer.Screen name="profile"/>
    <Drawer.Screen name="settings"/>

  </Drawer>;
}

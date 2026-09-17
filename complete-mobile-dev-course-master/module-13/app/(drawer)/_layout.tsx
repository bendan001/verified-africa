import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
  return (
    <Drawer>
      <Drawer.Screen name="dashboard" />
      <Drawer.Screen name="reports" />
    </Drawer>
  );
}

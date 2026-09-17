import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="feed" />
      <Tabs.Screen name="account" />
    </Tabs>
  );
}

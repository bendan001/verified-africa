import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        title: "Home",
        headerStyle: { backgroundColor: "#17650aff" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen name="index"  />
      <Stack.Screen name="about" options={{presentation:"modal"}} />
    </Stack>
  );
}

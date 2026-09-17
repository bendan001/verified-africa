import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Link href="/about" style={{ marginTop: 20, fontSize: 18, color: "blue" }}>
        Go to About Screen
      </Link>

      <Link href="/profile" style={{ marginTop: 20, fontSize: 18, color: "blue" }}>
        Go to Profile Screen
      </Link>
    </View>
  );
}

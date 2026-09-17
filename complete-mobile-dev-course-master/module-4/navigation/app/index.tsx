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
      <Text>Hello world.</Text>
      <Link href={"/feed"}>Feed</Link>
      <Link href={"/explore"}>Explore</Link>
      <Link href={"/profile/user"}>Profile / User</Link>
      <Link href={"/post/1"}>Post Id Page</Link>
      <Link href={"/admin/users/logs"}>Go Logs</Link>
      <Link href={"/admin/reports/monthly"}>Go Monthly reports</Link>

      <Link href={"/login"}>Login</Link>
    </View>
  );
}

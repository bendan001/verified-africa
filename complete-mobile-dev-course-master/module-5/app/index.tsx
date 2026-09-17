import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Index() {

  const handleFetchData = async()=>{
    const response = await fetch("/api/hello");
    const data = await response.json();

    console.log(data)
    alert(JSON.stringify(data))
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Pressable onPress={handleFetchData}>
       <Text>Get Data</Text>
      </Pressable>

      <Link href={"/post"}>Post</Link>
    </View>
  );
}

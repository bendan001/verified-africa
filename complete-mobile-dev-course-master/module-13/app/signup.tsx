import { signup } from "@/lib/auth";
import { useAuth } from "@/store/auth";
import { useState } from "react";
import { Alert, Button, TextInput, View } from "react-native";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setAuth = useAuth((s) => s.login);

  async function handleSignup() {
    try {
      await signup(email, password);
      setAuth();
    } catch (error: any) {
      Alert.alert("Signup failed", error?.message ?? String(error));
    }
  }

  return (
    <View>
      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button title="Signup" onPress={handleSignup} />
    </View>
  );
}

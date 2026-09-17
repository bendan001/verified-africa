import BatteryExample from "@/components/battery/battery-example";
import { View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <BasicNetworkCheck /> */}
      {/* <NetworkListener /> */}
      {/* <NetworkDetails /> */}

      {/* <BasicLinking /> */}
      {/* <DeepLinking /> */}

      {/* <PressHaptics /> */}
      <BatteryExample />
      {/* <App /> */}
    </View>
  );
}

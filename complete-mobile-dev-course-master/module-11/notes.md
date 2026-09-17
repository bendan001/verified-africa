import { locationList } from "@/locationList";
import { AppleMaps, GoogleMaps } from "expo-maps";
import { GoogleMapsMapType } from "expo-maps/build/google/GoogleMaps.types";
import { useRef, useState } from "react";
import { Alert, Button, Platform, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
const [locationIndex, setLocationIndex] = useState(0);
const ref = useRef<GoogleMaps.MapView>(null);

const cameraPosition = {
coordinates: {
latitude: locationList[locationIndex].stores[0].point[0],
longitude: locationList[locationIndex].stores[0].point[1],
},
zoom: 10,
};

function handleChangeWithRef(direction: "next" | "prev") {
const newIndex = locationIndex + (direction === "next" ? 1 : -1);
const nextLocation = locationList[newIndex];

    // Set camera position first to ensure animation happens
    ref.current?.setCameraPosition({
      coordinates: {
        latitude: nextLocation.stores[0].point[0],
        longitude: nextLocation.stores[0].point[1],
      },
      zoom: 10,
    });

    // Update state after animation is triggered
    setLocationIndex(newIndex);

}

const renderMapControls = () => (
<>
<View style={{ flex: 8 }} pointerEvents="none" />
<View style={styles.controlsContainer} pointerEvents="auto">
<Button title="Prev" onPress={() => handleChangeWithRef("prev")} />
<Button title="Next" onPress={() => handleChangeWithRef("next")} />
</View>
</>
);

if (Platform.OS === "ios") {
return <AppleMaps.View style={{ flex: 1 }} />;
} else if (Platform.OS === "android") {
return (
<>
<GoogleMaps.View
markers={markersGoogle}
ref={ref}
style={{ flex: 1, paddingBottom: 40 }}
cameraPosition={cameraPosition}
properties={{
            mapType: GoogleMapsMapType.HYBRID,
            isTrafficEnabled: false,
          }}
polylines={[
{
color: "blue",
width: 120,
coordinates: polylineCoordinates,
},
]}
onPolylineClick={(event) => {
console.log(event);
Alert.alert("Polyline clicked", JSON.stringify(event));
}}
onMapClick={(e) => {
console.log(
JSON.stringify({ type: "onMapClick", data: e }, null, 2),
);
}}
/>
<SafeAreaView
style={{ flex: 1, paddingBottom: 10 }}
pointerEvents="box-none" >
{renderMapControls()}
</SafeAreaView>
</>
);
} else {
return <Text>Maps are only available on Android and iOS</Text>;
}
}

const styles = StyleSheet.create({
controlsContainer: {
flex: 1,
flexDirection: "row",
justifyContent: "center",
alignItems: "center",
gap: 8,
backgroundColor: "rgba(0, 0, 0, 0.5)",
},
});

const markersGoogle = [
{
coordinates: { latitude: 49.259133, longitude: -123.10079 },
title: "49th Parallel Café & Lucky's Doughnuts - Main Street",
snippet: "49th Parallel Café & Lucky's Doughnuts - Main Street",
draggable: true,
},
{
coordinates: { latitude: 49.268034, longitude: -123.154819 },
title: "49th Parallel Café & Lucky's Doughnuts - 4th Ave",
snippet: "49th Parallel Café & Lucky's Doughnuts - 4th Ave",
draggable: true,
},
{
coordinates: { latitude: 49.286036, longitude: -123.12303 },
title: "49th Parallel Café & Lucky's Doughnuts - Thurlow",
snippet: "49th Parallel Café & Lucky's Doughnuts - Thurlow",
draggable: true,
},
{
coordinates: { latitude: 49.311879, longitude: -123.079241 },
title: "49th Parallel Café & Lucky's Doughnuts - Lonsdale",
snippet: "49th Parallel Café & Lucky's Doughnuts - Lonsdale",
draggable: true,
},
{
coordinates: {
latitude: 49.27235336018808,
longitude: -123.13455838338278,
},
title: "A La Mode Pie Café - Granville Island",
snippet: "A La Mode Pie Café - Granville Island",
draggable: true,
},
];

const polylineCoordinates = [
{ latitude: 33.8121, longitude: -117.919 }, // Disneyland
{ latitude: 33.837, longitude: -117.912 },
{ latitude: 33.88, longitude: -117.9 },
{ latitude: 33.9456, longitude: -117.8735 },
{ latitude: 34.0, longitude: -117.85 },
{ latitude: 34.05, longitude: -117.82 },
{ latitude: 34.1, longitude: -117.78 },
{ latitude: 34.2, longitude: -118.0 },
{ latitude: 34.2222, longitude: -118.1234 },
{ latitude: 34.233, longitude: -118.2 },
{ latitude: 34.2355, longitude: -118.3 },
{ latitude: 34.1367, longitude: -118.2942 }, // Hollywood
{ latitude: 34.1341, longitude: -118.3215 }, // Hollywood Sign
];

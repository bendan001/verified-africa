import * as Maps from "expo-maps";
import { useState } from "react";
import { Button, Platform, StyleSheet, Switch, Text, View } from "react-native";

const Index = () => {
  const [camera, setCamera] = useState({
    coordinates: { latitude: 28.6139, longitude: 77.209 },
    zoom: 10,
  });

  const [compass, setCompass] = useState(true);
  const [zoomCtrls, setZoomCtrls] = useState(true);
  const [scrollGest, setScrollGest] = useState(true);
  const [zoomGest, setZoomGest] = useState(true);

  const [traffic, setTraffic] = useState(false);
  const [satellite, setSatellite] = useState(false);
  const [selection, setSelection] = useState(true);

  const points = [
    { latitude: 28.6139, longitude: 77.209 }, // Delhi
    { latitude: 19.076, longitude: 72.8777 }, // Mumbai
    { latitude: 12.9716, longitude: 77.5946 }, // Bangalore
  ];

  const polyline = [
    {
      id: "route",
      coordinates: points,
      color: "#ff0000",
      width: 4,
    },
  ];

  const markers = points.map((coords, i) => ({
    id: `marker-${i}`,
    coordinates: coords,
    title: ["Delhi", "Mumbai", "Bangalore"][i],
    snippet: "Tap to navigate",
    draggable: false,
  }));

  return (
    <View style={styles.container}>
      {Platform.OS === "ios" ? (
        <Maps.AppleMaps.View style={styles.map} cameraPosition={camera} />
      ) : (
        <Maps.GoogleMaps.View
          style={styles.map}
          cameraPosition={camera}
          uiSettings={{
            compassEnabled: compass,
            zoomControlsEnabled: zoomCtrls,
            scrollGesturesEnabled: scrollGest,
            zoomGesturesEnabled: zoomGest,
          }}
          markers={markersGoogle}
          properties={{
            isTrafficEnabled: traffic,
            mapType: satellite
              ? Maps.GoogleMaps.MapType.SATELLITE
              : Maps.GoogleMaps.MapType.NORMAL,
            selectionEnabled: selection,
          }}
        />
      )}

      <View style={styles.controls}>
        <Button
          title="Delhi"
          onPress={() => setCamera({ coordinates: points[0], zoom: 8 })}
        />
        <Button
          title="Mumbai"
          onPress={() => setCamera({ coordinates: points[1], zoom: 8 })}
        />
        <Button
          title="Bangalore"
          onPress={() => setCamera({ coordinates: points[2], zoom: 8 })}
        />

        {/* <Button
          title="Delhi"
          onPress={() =>
            setCamera({
              coordinates: { latitude: 28.6139, longitude: 77.209 },
              zoom: 12,
            })
          }
        />

        <Button
          title="Mumbai"
          onPress={() =>
            setCamera({
              coordinates: { latitude: 19.076, longitude: 72.8777 },
              zoom: 9,
            })
          }
        />

        <Button
          title="Bangalore"
          onPress={() =>
            setCamera({
              coordinates: { latitude: 12.9716, longitude: 77.5946 },
              zoom: 9,
            })
          }
        /> */}

        <View style={styles.toggleRow}>
          <Text>Traffic</Text>
          <Switch value={traffic} onValueChange={setTraffic} />
        </View>

        <View style={styles.toggleRow}>
          <Text>Satellite</Text>
          <Switch value={satellite} onValueChange={setSatellite} />
        </View>

        <View style={styles.toggleRow}>
          <Text>Selection Enabled</Text>
          <Switch value={selection} onValueChange={setSelection} />
        </View>

        <View style={styles.toggleRow}>
          <Text>Compass</Text>
          <Switch value={compass} onValueChange={setCompass} />
        </View>
        <View style={styles.toggleRow}>
          <Text>Zoom Controls</Text>
          <Switch value={zoomCtrls} onValueChange={setZoomCtrls} />
        </View>
        <View style={styles.toggleRow}>
          <Text>Scroll Gesture</Text>
          <Switch value={scrollGest} onValueChange={setScrollGest} />
        </View>
        <View style={styles.toggleRow}>
          <Text>Zoom Gesture</Text>
          <Switch value={zoomGest} onValueChange={setZoomGest} />
        </View>
      </View>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  controls: {
    padding: 10,
    backgroundColor: "#ffffffcc",
  },
  toggleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 4,
  },
  buttons: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    gap: 10,
  },
});

const markersGoogle = [
  {
    coordinates: { latitude: 28.7041, longitude: 77.1025 },
    title: "Delhi",
    snippet: "Capital of India",
    draggable: true,
  },
  {
    coordinates: { latitude: 19.076, longitude: 72.8777 },
    title: "Mumbai",
    snippet: "City of Dreams",
    draggable: false,
  },
  {
    coordinates: { latitude: 12.9716, longitude: 77.5946 },
    title: "Bangalore",
    snippet: "Silicon Valley of India",
    draggable: true,
  },
];

import { AppleMaps, GoogleMaps } from "expo-maps";
import React, { useEffect, useRef } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { LocationPoint } from "../types/location";

interface MapViewComponentProps {
  locations: LocationPoint[];
}

export const MapViewComponent = ({ locations }: MapViewComponentProps) => {
  const googleMapsRef = useRef<GoogleMaps.View>(null);
  const appleMapsRef = useRef<AppleMaps.View>(null);

  useEffect(() => {
    if (locations.length > 0) {
      const lastLocation = locations[locations.length - 1];
      const cameraPosition = {
        coordinates: {
          latitude: lastLocation.latitude,
          longitude: lastLocation.longitude,
        },
        zoom: 16,
      };

      if (Platform.OS === "android" && googleMapsRef.current) {
        googleMapsRef.current
          .setCameraPosition({
            ...cameraPosition,
            duration: 0, // Instant update, no animation
          })
          .catch(() => {
            // Silently ignore errors
          });
      } else if (Platform.OS === "ios" && appleMapsRef.current) {
        appleMapsRef.current.setCameraPosition(cameraPosition);
      }
    }
  }, [locations]);

  const initialRegion =
    locations.length > 0
      ? {
          coordinates: {
            latitude: locations[0].latitude,
            longitude: locations[0].longitude,
          },
          zoom: 15,
        }
      : {
          coordinates: {
            latitude: 37.78825,
            longitude: -122.4324,
          },
          zoom: 12,
        };

  const googleMarkers = locations.map((location, index) => ({
    coordinates: {
      latitude: location.latitude,
      longitude: location.longitude,
    },
    title: `Location ${index + 1}`,
    snippet: new Date(location.timestamp).toLocaleTimeString(),
  }));

  const appleMarkers = locations.map((location, index) => ({
    coordinates: {
      latitude: location.latitude,
      longitude: location.longitude,
    },
    title: `Location ${index + 1}`,
  }));

  const polylineCoordinates = locations.map((loc) => ({
    latitude: loc.latitude,
    longitude: loc.longitude,
  }));

  const googlePolylines =
    polylineCoordinates.length > 1
      ? [
          {
            coordinates: polylineCoordinates,
            width: 4,
          },
        ]
      : [];

  const applePolylines =
    polylineCoordinates.length > 1
      ? [
          {
            coordinates: polylineCoordinates,
            color: "#4CAF50",
            width: 3,
          },
        ]
      : [];

  if (Platform.OS === "android") {
    return (
      <View style={styles.container}>
        <GoogleMaps.View
          ref={googleMapsRef}
          cameraPosition={initialRegion}
          style={styles.map}
          markers={googleMarkers}
          polylines={googlePolylines}
        />
      </View>
    );
  } else if (Platform.OS === "ios") {
    return (
      <View style={styles.container}>
        <AppleMaps.View
          ref={appleMapsRef}
          cameraPosition={initialRegion}
          style={styles.map}
          markers={appleMarkers}
          polylines={applePolylines}
        />
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

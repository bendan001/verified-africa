import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { LocationPoint } from "../types/location";

export const useLocationTracker = () => {
  const [locations, setLocations] = useState<LocationPoint[]>([]);
  const [isTracking, setIsTracking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    requestPermissions();
  }, []);

  const requestPermissions = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Location permission denied");
      }
    } catch (err) {
      setError("Failed to request permissions");
    }
  };

  const startTracking = async () => {
    try {
      setError(null);
      setIsTracking(true);

      const subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 10,
        },
        (location) => {
          const newPoint: LocationPoint = {
            id: Date.now().toString(),
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            accuracy: location.coords.accuracy || 0,
            timestamp: location.timestamp,
          };
          setLocations((prev) => [...prev, newPoint]);
        },
      );

      return subscription;
    } catch (err) {
      setError("Failed to start tracking");
      setIsTracking(false);
    }
  };

  const stopTracking = (subscription: Location.LocationSubscription | void) => {
    if (subscription) {
      subscription.remove();
    }
    setIsTracking(false);
  };

  const clearHistory = () => {
    setLocations([]);
  };

  return {
    locations,
    isTracking,
    error,
    startTracking,
    stopTracking,
    clearHistory,
  };
};

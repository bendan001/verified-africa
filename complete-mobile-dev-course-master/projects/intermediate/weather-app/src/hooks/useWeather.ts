import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { fetchCoordsByCity, fetchWeatherByCoords } from "../api/weatherApi";
import { AQIData, ForecastData, WeatherData } from "../types/weather";

export const useWeather = () => {
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [aqi, setAqi] = useState<AQIData | null>(null);

  const getLocationWeather = async () => {
    setLoading(true);
    setErrorMsg("");

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        setLoading(false);
        return;
      }

      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      await loadWeatherData(loc.coords.latitude, loc.coords.longitude);
    } catch (e: any) {
      setErrorMsg(e.message || "Error fetching location");
      setLoading(false);
    }
  };

  const loadWeatherData = async (lat: number, lon: number) => {
    try {
      const data = await fetchWeatherByCoords(lat, lon);
      setWeather(data.weather);
      setForecast(data.forecast);
      setAqi(data.aqi);
      setLoading(false);
    } catch (e: any) {
      setErrorMsg(e.message || "Error fetching weather data");
      setLoading(false);
    }
  };

  const searchCity = async (city: string) => {
    setLoading(true);
    setErrorMsg("");
    try {
      const { lat, lon } = await fetchCoordsByCity(city);
      await loadWeatherData(lat, lon);
    } catch (e: any) {
      setErrorMsg(e.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocationWeather();
  }, []);

  return {
    loading,
    errorMsg,
    weather,
    forecast,
    aqi,
    getLocationWeather,
    searchCity,
  };
};

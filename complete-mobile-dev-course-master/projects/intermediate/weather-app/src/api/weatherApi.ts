import axios from "axios";
import { BASE_URL, WEATHER_API_KEY } from "../utils/weatherUtils";

export const fetchWeatherByCoords = async (lat: number, lon: number) => {
  const [weatherRes, forecastRes, aqiRes] = await Promise.all([
    axios.get(`${BASE_URL}/weather`, {
      params: { lat, lon, units: "metric", appid: WEATHER_API_KEY },
    }),

    axios.get(`${BASE_URL}/forecast`, {
      params: { lat, lon, units: "metric", appid: WEATHER_API_KEY },
    }),

    axios.get(`${BASE_URL}/air_pollution`, {
      params: { lat, lon, appid: WEATHER_API_KEY },
    }),
  ]);

  return {
    weather: weatherRes.data,
    forecast: forecastRes.data.list,
    aqi: aqiRes.data.list[0],
  };
};

export const fetchCoordsByCity = async (city: string) => {
  const res = await axios.get(`https://api.openweathermap.org/geo/1.0/direct`, {
    params: {
      q: city,
      limit: 1,
      appid: WEATHER_API_KEY,
    },
  });

  if (res.data.length === 0) {
    throw new Error("City not found");
  }

  return {
    lat: res.data[0].lat,
    lon: res.data[0].lon,
  };
};

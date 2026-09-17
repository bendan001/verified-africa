export const WEATHER_API_KEY = "3d00769263709f21dd5cfd7c9581ffc8";
export const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const getBackgroundImage = (condition: string, icon: string): any => {
  const isNight = icon?.includes("n");

  if (isNight) {
    if (condition === "clean") {
      return require("../../assets/images/night.png");
    }

    return require("../../assets/images/night.png"); // Generic night
  }

  switch (condition) {
    case "Clear":
      return require("../../assets/images/sunny.png");
    case "Clouds":
      return require("../../assets/images/cloudy.png");
    case "Rain":
    case "Drizzle":
    case "Thunderstorm":
      return require("../../assets/images/rain.png");
    case "Snow":
      return require("../../assets/images/snow.png");
    case "Mist":
    case "Fog":
    case "Haze":
      return require("../../assets/images/cloudy.png");
    default:
      return require("../../assets/images/sunny.png");
  }
};

export const getWeatherIcon = (condition: string, icon: string): string => {
  const isNight = icon?.includes("n");
  // MaterialCommunityIcons names
  switch (condition) {
    case "Clear":
      return isNight ? "weather-night" : "weather-sunny";
    case "Clouds":
      return isNight ? "weather-night-partly-cloudy" : "weather-cloudy";
    case "Rain":
      return "weather-rainy";
    case "Drizzle":
      return "weather-partly-rainy";
    case "Thunderstorm":
      return "weather-lightning";
    case "Snow":
      return "weather-snowy";
    case "Mist":
    case "Fog":
    case "Haze":
      return "weather-fog";
    default:
      return "weather-cloudy";
  }
};

export const getWeatherColor = (condition: string, icon: string): string => {
  const isNight = icon?.includes("n");
  if (isNight) return "#F1F5F9"; // Light slate for night icons

  switch (condition) {
    case "Clear":
      return "#FFD700"; // Gold
    case "Clouds":
      return "#90A4AE"; // Blue Grey
    case "Rain":
      return "#4FC3F7"; // Light Blue
    case "Drizzle":
      return "#81D4FA"; // Light Blue 200
    case "Thunderstorm":
      return "#FFEB3B"; // Yellow
    case "Snow":
      return "#E0F7FA"; // Cyan 50
    case "Mist":
    case "Fog":
    case "Haze":
      return "#B2EBF2"; // Cyan 100
    default:
      return "#FFFFFF";
  }
};

export const getWeatherImageUrl = (iconCode: string): string => {
  return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
};

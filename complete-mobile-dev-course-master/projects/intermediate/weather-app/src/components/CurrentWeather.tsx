import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { AQIData, WeatherData } from "../types/weather";
import { getWeatherImageUrl } from "../utils/weatherUtils";
import { GlassView } from "./GlassView";

const { width } = Dimensions.get("window");

interface CurrentWeatherProps {
  weather: WeatherData;
  aqi: AQIData | null;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ weather, aqi }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.cityName}>
        {weather.name}, {weather.sys.country}
      </Text>
      <Text style={styles.dateText}>{new Date().toDateString()}</Text>

      <View style={styles.tempContainer}>
        <Image
          source={{ uri: getWeatherImageUrl(weather.weather[0].icon) }}
          style={styles.weatherIcon}
          resizeMode="contain"
        />
        <Text style={styles.temperature}>{Math.round(weather.main.temp)}°</Text>
      </View>
      <Text style={styles.weatherDesc}>{weather.weather[0].description}</Text>

      <View style={styles.statsGrid}>
        <StatItem
          icon="weather-windy"
          value={`${weather.wind.speed} m/s`}
          label="Wind"
          color="#4FC3F7"
        />
        <StatItem
          icon="water-percent"
          value={`${weather.main.humidity}%`}
          label="Humidity"
          color="#81D4FA"
        />
        <StatItem
          icon="thermometer"
          value={`${Math.round(weather.main.feels_like)}°`}
          label="Feels Like"
          color="#FAB1A0"
        />
        {aqi && (
          <StatItem
            icon="blur"
            value={aqi.main.aqi.toString()}
            label="AQI"
            color="#A29BFE"
          />
        )}
      </View>
    </View>
  );
};

const StatItem = ({
  icon,
  value,
  label,
  color,
}: {
  icon: string;
  value: string;
  label: string;
  color: string;
}) => {
  return (
    <GlassView style={styles.statItem}>
      <MaterialCommunityIcons name={icon as any} size={24} color={color} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </GlassView>
  );
};

export default CurrentWeather;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  cityName: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.6)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
    textAlign: "center",
  },
  dateText: {
    color: "rgba(255, 255, 255, 0.95)",
    fontSize: 14,
    fontWeight: "500",
    marginTop: 4,
    marginBottom: 12,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  tempContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
  temperature: {
    fontSize: 64,
    fontWeight: "800",
    color: "#fff",
    marginLeft: 4,
    includeFontPadding: false,
    textShadowColor: "rgba(0, 0, 0, 0.6)",
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 6,
  },
  weatherDesc: {
    color: "rgba(255, 255, 255, 0.95)",
    fontSize: 22,
    textTransform: "capitalize",
    fontWeight: "600",
    marginTop: 4,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 5,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    marginHorizontal: -20,
    borderRadius: 16,
    marginTop: 8,
  },
  statItem: {
    width: (width - 64) / 2,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: 6,
  },
  statValue: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  statLabel: {
    color: "#fff",
    fontSize: 14,
    opacity: 0.95,
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
});

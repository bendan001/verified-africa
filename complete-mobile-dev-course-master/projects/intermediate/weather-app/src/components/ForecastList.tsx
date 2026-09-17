import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { ForecastData } from "../types/weather";
import { getWeatherColor, getWeatherIcon } from "../utils/weatherUtils";
import { GlassView } from "./GlassView";

interface ForecastListProps {
  data: ForecastData[];
}

export const ForecastList: React.FC<ForecastListProps> = ({ data }) => {
  const renderItem = ({ item }: { item: ForecastData }) => (
    <GlassView style={styles.forecastItem}>
      <Text style={styles.forecastTime}>{item.dt_txt.substring(11, 16)}</Text>
      <MaterialCommunityIcons
        name={getWeatherIcon(item.weather[0].main, item.weather[0].icon) as any}
        size={24}
        color={getWeatherColor(item.weather[0].main, item.weather[0].icon)}
        style={{ marginVertical: 8 }}
      />
      <Text style={styles.forecastTemp}>{Math.round(item.main.temp)}°</Text>
    </GlassView>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hourly Forecast</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.forecastListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    marginLeft: 20,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  forecastListContent: {
    paddingHorizontal: 20,
    paddingRight: 32,
    gap: 12,
  },
  forecastItem: {
    padding: 12,
    alignItems: "center",
    width: 72,
  },
  forecastTime: {
    color: "#fff",
    fontSize: 12,
    textShadowColor: "rgba(0, 0, 0, 0.7)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  forecastTemp: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.7)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});

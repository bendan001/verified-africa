import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

interface GlassViewProps {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
}

export const GlassView: React.FC<GlassViewProps> = ({ children, style }) => (
  <View style={[styles.glass, style]}>{children}</View>
);

const styles = StyleSheet.create({
  glass: {},
});

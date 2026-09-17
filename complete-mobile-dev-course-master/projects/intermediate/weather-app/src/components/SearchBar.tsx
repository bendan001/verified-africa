import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

interface SearchBarProps {
  onSearch: (city: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = () => {
    if (query.trim()) {
      onSearch(query);
      setQuery("");
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search City..."
        placeholderTextColor="rgba(0, 0, 0, 0.6)"
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSubmit}
        returnKeyType="search"
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <MaterialCommunityIcons name="magnify" size={24} color="#333" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 12,
    borderWidth: 0,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    color: "#111",
    fontSize: 16,
  },
  button: {
    padding: 5,
  },
});

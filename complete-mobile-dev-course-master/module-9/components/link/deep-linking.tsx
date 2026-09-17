import * as Linking from "expo-linking";
import React, { useEffect, useState } from "react";
import {
    ScrollView,
    Share,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const DeepLinking = () => {
  const [initialUrl, setInitialUrl] = useState(null);
  const [receivedUrls, setReceivedUrls] = useState<any>([]);

  useEffect(() => {
    Linking.getInitialURL().then((url) => {
      if (url) {
        setInitialUrl(url);
        handleDeepLink(url);
      }
    });

    const subscription = Linking.addEventListener("url", (event) => {
      console.log("Received URL:", event.url);
      handleDeepLink(url);
    });

    // Cleanup
    return () => subscription.remove();
  }, []);

  const handleDeepLink = (url) => {
    // Parse the URL
    const parsed = Linking.parse(url);

    console.log("Parsed URL:", parsed);
    console.log("Scheme:", parsed.scheme);
    console.log("Hostname:", parsed.hostname);
    console.log("Path:", parsed.path);
    console.log("Query params:", parsed.queryParams);

    // Add to received URLs list
    setReceivedUrls((prev) => [
      {
        url,
        parsed,
        timestamp: new Date().toLocaleTimeString(),
      },
      ...prev,
    ]);

    // Handle navigation based on URL
    if (parsed.path === "product") {
      const productId = parsed.queryParams?.id;
      console.log("Navigate to product:", productId);
      // navigation.navigate('Product', { id: productId });
    } else if (parsed.path === "profile") {
      const userId = parsed.queryParams?.userId;
      console.log("Navigate to profile:", userId);
      // navigation.navigate('Profile', { userId });
    }
  };

  // Create a deep link URL for your app
  const appUrl = Linking.createURL("product", {
    queryParams: { id: "123", name: "Cool Product" },
  });

  const onShare = async () => {
    await Share.share({
      message: "Check out this amazing app",
    });
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={onShare}>
        <Text>Share</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Deep Linking Demo</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your App URL Scheme:</Text>
        <Text style={styles.code}>{appUrl}</Text>
        <Text style={styles.hint}>
          Use this format to create deep links to your app
        </Text>
      </View>

      {initialUrl && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🚀 Initial URL:</Text>
          <Text style={styles.urlText}>{initialUrl}</Text>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          📱 Received URLs ({receivedUrls.length}):
        </Text>

        {receivedUrls.length === 0 ? (
          <Text style={styles.emptyText}>
            No deep links received yet. Try opening a link to your app!
          </Text>
        ) : (
          receivedUrls.map((item, index) => (
            <View key={index} style={styles.urlCard}>
              <Text style={styles.timestamp}>{item.timestamp}</Text>
              <Text style={styles.urlText}>{item.url}</Text>

              {item.parsed.queryParams && (
                <View style={styles.params}>
                  <Text style={styles.paramsTitle}>Parameters:</Text>
                  {Object.entries(item.parsed.queryParams).map(
                    ([key, value]) => (
                      <Text key={key} style={styles.paramText}>
                        • {key}: {value}
                      </Text>
                    ),
                  )}
                </View>
              )}
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

export default DeepLinking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 40,
    textAlign: "center",
  },
  section: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  code: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
    fontFamily: "monospace",
    fontSize: 12,
  },
  hint: {
    fontSize: 12,
    color: "#666",
    marginTop: 8,
    fontStyle: "italic",
  },
  urlCard: {
    backgroundColor: "#f8f9fa",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: "#007AFF",
  },
  timestamp: {
    fontSize: 12,
    color: "#666",
    marginBottom: 5,
  },
  urlText: {
    fontSize: 14,
    color: "#333",
    fontFamily: "monospace",
  },
  params: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  paramsTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 5,
  },
  paramText: {
    fontSize: 13,
    color: "#555",
    marginLeft: 10,
  },
  emptyText: {
    fontSize: 14,
    color: "#999",
    fontStyle: "italic",
    textAlign: "center",
    paddingVertical: 20,
  },
  infoBox: {
    backgroundColor: "#fff3cd",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 30,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#856404",
  },
  infoText: {
    fontSize: 13,
    color: "#856404",
    lineHeight: 20,
  },
});

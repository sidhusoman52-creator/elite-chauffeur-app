
import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";

export default function PassengerHome({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.brand}>ELITE CLUB</Text>
            <Text style={styles.subtitle}>ELITE CHAUFFEUR</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.profile}>PROFILE</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.hero}>
          <Text style={styles.gold}>PREMIUM CHAUFFEUR SERVICE</Text>
          <Text style={styles.heading}>
            Your Journey,{"\n"}Our Priority.
          </Text>
          <Text style={styles.description}>
            Experience exceptional comfort,
            professional chauffeurs and
            premium vehicles.
          </Text>

          <TouchableOpacity
            style={styles.bookButton}
            onPress={() => navigation?.navigate("Booking")}
          >
            <Text style={styles.bookText}>BOOK A RIDE  →</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.section}>OUR SERVICES</Text>

        <TouchableOpacity style={styles.service}>
          <Text style={styles.icon}>✈</Text>
          <View style={styles.serviceInfo}>
            <Text style={styles.serviceTitle}>Airport Transfers</Text>
            <Text style={styles.serviceText}>JFK · LGA · EWR</Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.service}>
          <Text style={styles.icon}>🚘</Text>
          <View style={styles.serviceInfo}>
            <Text style={styles.serviceTitle}>City Rides</Text>
            <Text style={styles.serviceText}>
              Explore New York in comfort
            </Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.service}>
          <Text style={styles.icon}>✦</Text>
          <View style={styles.serviceInfo}>
            <Text style={styles.serviceTitle}>Luxury & Executive</Text>
            <Text style={styles.serviceText}>
              Premium vehicles for every occasion
            </Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerBrand}>ELITE CHAUFFEUR</Text>
          <Text style={styles.footerText}>
            Premium Rides. Elevated Journeys.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#080808",
  },
  header: {
    padding: 22,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#302719",
  },
  brand: {
    color: "#D4AF67",
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: 3,
  },
  subtitle: {
    color: "#999",
    fontSize: 10,
    letterSpacing: 2,
    marginTop: 5,
  },
  profile: {
    color: "#D4AF67",
    fontSize: 12,
  },
  hero: {
    padding: 25,
    paddingTop: 65,
    paddingBottom: 55,
  },
  gold: {
    color: "#D4AF67",
    fontSize: 11,
    letterSpacing: 2,
    fontWeight: "bold",
  },
  heading: {
    color: "#FFF",
    fontSize: 38,
    fontWeight: "bold",
    lineHeight: 47,
    marginTop: 20,
  },
  description: {
    color: "#AAA",
    fontSize: 15,
    lineHeight: 24,
    marginTop: 18,
  },
  bookButton: {
    backgroundColor: "#D4AF67",
    padding: 18,
    alignItems: "center",
    marginTop: 30,
    borderRadius: 5,
  },
  bookText: {
    color: "#080808",
    fontWeight: "bold",
    letterSpacing: 1,
  },
  section: {
    color: "#D4AF67",
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 2,
    marginHorizontal: 23,
    marginBottom: 16,
  },
  service: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#171717",
    borderWidth: 1,
    borderColor: "#302719",
    borderRadius: 8,
    padding: 18,
    marginHorizontal: 18,
    marginBottom: 12,
  },
  icon: {
    fontSize: 25,
    marginRight: 16,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceTitle: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  serviceText: {
    color: "#999",
    fontSize: 12,
    marginTop: 6,
  },
  arrow: {
    color: "#D4AF67",
    fontSize: 25,
  },
  footer: {
    alignItems: "center",
    padding: 35,
  },
  footerBrand: {
    color: "#D4AF67",
    fontSize: 13,
    letterSpacing: 3,
    fontWeight: "bold",
  },
  footerText: {
    color: "#777",
    fontSize: 11,
    marginTop: 9,
  },
});
    

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

export default function DriverHome({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.brand}>ELITE CLUB</Text>
        <Text style={styles.subtitle}>DRIVER PARTNER</Text>
      </View>

      <View style={styles.welcome}>
        <Text style={styles.smallText}>WELCOME BACK</Text>
        <Text style={styles.heading}>Your Journey Starts Here.</Text>
        <Text style={styles.description}>
          Deliver exceptional journeys with Elite Chauffeur.
        </Text>
      </View>

      <View style={styles.statusCard}>
        <Text style={styles.cardTitle}>DRIVER STATUS</Text>
        <Text style={styles.pending}>Approval Required</Text>
        <Text style={styles.cardDescription}>
          Your driver account status and booking access will appear here.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>YOUR DRIVER SERVICES</Text>

      <View style={styles.serviceCard}>
        <Text style={styles.serviceTitle}>Available Rides</Text>
        <Text style={styles.serviceDescription}>
          View and accept passenger ride requests.
        </Text>
      </View>

      <View style={styles.serviceCard}>
        <Text style={styles.serviceTitle}>My Trips</Text>
        <Text style={styles.serviceDescription}>
          Track your assigned and completed journeys.
        </Text>
      </View>

      <View style={styles.serviceCard}>
        <Text style={styles.serviceTitle}>Earnings</Text>
        <Text style={styles.serviceDescription}>
          Your trip earnings and payment information.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation?.navigate("DriverBookings")}
      >
        <Text style={styles.buttonText}>VIEW MY BOOKINGS</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>
        PREMIUM RIDES. ELEVATED JOURNEYS.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#080808",
    padding: 22,
  },
  header: {
    marginTop: 35,
    marginBottom: 35,
  },
  brand: {
    color: "#D4AF37",
    fontSize: 25,
    fontWeight: "bold",
    letterSpacing: 4,
  },
  subtitle: {
    color: "#AAAAAA",
    fontSize: 11,
    letterSpacing: 3,
    marginTop: 7,
  },
  welcome: {
    marginBottom: 25,
  },
  smallText: {
    color: "#D4AF37",
    fontSize: 11,
    letterSpacing: 2,
  },
  heading: {
    color: "#FFFFFF",
    fontSize: 29,
    fontWeight: "bold",
    marginTop: 12,
  },
  description: {
    color: "#AAAAAA",
    fontSize: 14,
    marginTop: 10,
    lineHeight: 22,
  },
  statusCard: {
    backgroundColor: "#171717",
    borderWidth: 1,
    borderColor: "#8B7025",
    borderRadius: 12,
    padding: 18,
    marginBottom: 30,
  },
  cardTitle: {
    color: "#D4AF37",
    fontSize: 12,
    letterSpacing: 2,
    fontWeight: "bold",
  },
  pending: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "bold",
    marginTop: 12,
  },
  cardDescription: {
    color: "#AAAAAA",
    fontSize: 13,
    marginTop: 8,
    lineHeight: 20,
  },
  sectionTitle: {
    color: "#D4AF37",
    fontSize: 13,
    letterSpacing: 2,
    marginBottom: 15,
    fontWeight: "bold",
  },
  serviceCard: {
    backgroundColor: "#171717",
    borderRadius: 10,
    padding: 18,
    marginBottom: 12,
  },
  serviceTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
  },
  serviceDescription: {
    color: "#AAAAAA",
    fontSize: 13,
    marginTop: 7,
    lineHeight: 19,
  },
  button: {
    backgroundColor: "#D4AF37",
    padding: 17,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: {
    color: "#080808",
    fontSize: 13,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  footer: {
    color: "#777777",
    textAlign: "center",
    fontSize: 10,
    letterSpacing: 2,
    marginTop: 35,
    marginBottom: 30,
  },
});

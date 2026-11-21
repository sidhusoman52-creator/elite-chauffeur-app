
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { supabase } from "../../../../supabase";

export default function PassengerBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadBookings() {
    setLoading(true);

    try {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      if (userError) throw userError;

      if (!userData.user) {
        throw new Error("Please sign in to view your bookings.");
      }

      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("passenger_id", userData.user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setBookings(data || []);
    } catch (error) {
      Alert.alert("Unable to load bookings", error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBookings();
  }, []);

  function formatDate(value) {
    if (!value) return "Not available";
    return new Date(value).toLocaleString();
  }

  function formatStatus(status) {
    return (status || "pending").replaceAll("_", " ").toUpperCase();
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.brand}>ELITE CLUB</Text>

      <Text style={styles.heading}>My Bookings</Text>

      <Text style={styles.subtitle}>
        Your journeys, all in one place.
      </Text>

      <TouchableOpacity style={styles.refresh} onPress={loadBookings}>
        <Text style={styles.refreshText}>REFRESH BOOKINGS</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#D4AF37" />
      ) : bookings.length === 0 ? (
        <Text style={styles.empty}>
          You haven't booked a ride yet.
        </Text>
      ) : (
        bookings.map((booking) => (
          <View style={styles.card} key={booking.id}>
            <Text style={styles.status}>
              {formatStatus(booking.booking_status)}
            </Text>

            <Text style={styles.label}>PICKUP</Text>
            <Text style={styles.value}>{booking.pickup_address}</Text>

            <Text style={styles.label}>DROP-OFF</Text>
            <Text style={styles.value}>{booking.dropoff_address}</Text>

            <Text style={styles.label}>VEHICLE</Text>
            <Text style={styles.value}>
              {booking.vehicle_category || "Not specified"}
            </Text>

            <Text style={styles.label}>RIDE TYPE</Text>
            <Text style={styles.value}>
              {booking.ride_type || "City"}
            </Text>

            <Text style={styles.label}>BOOKED ON</Text>
            <Text style={styles.value}>
              {formatDate(booking.created_at)}
            </Text>

            <Text style={styles.label}>TOTAL FARE</Text>
            <Text style={styles.fare}>
              ${Number(booking.total_fare || 0).toFixed(2)}
            </Text>
          </View>
        ))
      )}

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
  },
  content: {
    padding: 22,
    paddingBottom: 45,
  },
  brand: {
    color: "#D4AF37",
    fontSize: 23,
    fontWeight: "bold",
    letterSpacing: 4,
    marginTop: 35,
  },
  heading: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 25,
  },
  subtitle: {
    color: "#AAAAAA",
    marginTop: 8,
    marginBottom: 20,
  },
  refresh: {
    borderWidth: 1,
    borderColor: "#D4AF37",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  refreshText: {
    color: "#D4AF37",
    fontWeight: "bold",
  },
  empty: {
    color: "#AAAAAA",
    textAlign: "center",
    marginTop: 35,
  },
  card: {
    backgroundColor: "#171717",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#55451C",
    padding: 18,
    marginBottom: 18,
  },
  status: {
    color: "#D4AF37",
    fontWeight: "bold",
    fontSize: 13,
    marginBottom: 12,
  },
  label: {
    color: "#D4AF37",
    fontSize: 11,
    marginTop: 13,
    letterSpacing: 1,
  },
  value: {
    color: "#FFFFFF",
    fontSize: 14,
    marginTop: 5,
  },
  fare: {
    color: "#FFFFFF",
    fontSize: 21,
    fontWeight: "bold",
    marginTop: 5,
  },
  footer: {
    color: "#777777",
    textAlign: "center",
    fontSize: 10,
    letterSpacing: 2,
    marginTop: 30,
  },
});
  

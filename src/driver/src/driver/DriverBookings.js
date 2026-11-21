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

export default function DriverBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [workingId, setWorkingId] = useState(null);

  async function loadBookings() {
    setLoading(true);

    const { data, error } = await supabase.rpc("get_driver_bookings");

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      setBookings(data || []);
    }

    setLoading(false);
  }

  async function updateBooking(functionName, bookingId) {
    setWorkingId(bookingId);

    const { error } = await supabase.rpc(functionName, {
      p_booking_id: bookingId,
    });

    if (error) {
      Alert.alert("Unable to update booking", error.message);
    } else {
      await loadBookings();
    }

    setWorkingId(null);
  }

  useEffect(() => {
    loadBookings();
  }, []);

  function formatDate(value) {
    if (!value) return "Not specified";
    return new Date(value).toLocaleString();
  }

  function actionButton(label, functionName, bookingId) {
    return (
      <TouchableOpacity
        style={styles.button}
        disabled={workingId === bookingId}
        onPress={() => updateBooking(functionName, bookingId)}
      >
        <Text style={styles.buttonText}>
          {workingId === bookingId ? "PLEASE WAIT..." : label}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.brand}>ELITE CLUB</Text>
      <Text style={styles.heading}>Driver Bookings</Text>
      <Text style={styles.subtitle}>
        Manage your passenger journeys
      </Text>

      <TouchableOpacity style={styles.refresh} onPress={loadBookings}>
        <Text style={styles.refreshText}>REFRESH BOOKINGS</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#D4AF37" />
      ) : bookings.length === 0 ? (
        <Text style={styles.empty}>
          No bookings available right now.
        </Text>
      ) : (
        bookings.map((booking) => (
          <View style={styles.card} key={booking.id}>
            <Text style={styles.status}>
              {(booking.booking_status || "").toUpperCase()}
            </Text>

            <Text style={styles.label}>PICKUP</Text>
            <Text style={styles.value}>{booking.pickup_address}</Text>

            <Text style={styles.label}>DROPOFF</Text>
            <Text style={styles.value}>{booking.dropoff_address}</Text>

            <Text style={styles.label}>PICKUP TIME</Text>
            <Text style={styles.value}>
              {formatDate(booking.pickup_datetime)}
            </Text>

            <Text style={styles.label}>VEHICLE</Text>
            <Text style={styles.value}>
              {booking.vehicle_category || "Not specified"}
            </Text>

            <Text style={styles.label}>ESTIMATED FARE</Text>
            <Text style={styles.fare}>
              ${Number(booking.total_fare || 0).toFixed(2)}
            </Text>

            {booking.booking_status === "pending" &&
              !booking.driver_id &&
              actionButton("ACCEPT RIDE", "accept_booking", booking.id)}

            {booking.booking_status === "assigned" &&
              actionButton("START RIDE", "start_booking", booking.id)}

            {booking.booking_status === "in_progress" &&
              actionButton("COMPLETE RIDE", "complete_booking", booking.id)}
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#080808",
    padding: 20,
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
    fontSize: 27,
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
    marginBottom: 15,
  },
  label: {
    color: "#D4AF37",
    fontSize: 11,
    marginTop: 13,
    letterSpacing: 1,
  },
  value: {
    color: "#FFFFFF",
    fontSize: 15,
    marginTop: 5,
  },
  fare: {
    color: "#FFFFFF",
    fontSize: 21,
    fontWeight: "bold",
    marginTop: 5,
  },
  button: {
    backgroundColor: "#D4AF37",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#080808",
    fontWeight: "bold",
  },
});

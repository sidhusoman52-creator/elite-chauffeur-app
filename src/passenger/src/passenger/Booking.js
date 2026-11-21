
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { supabase } from "../../../../supabase";

export default function Booking() {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [vehicle, setVehicle] = useState("Premium Sedan");
  const [rideType, setRideType] = useState("city");
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(false);

  async function createBooking() {
    if (!pickup.trim() || !dropoff.trim()) {
      Alert.alert(
        "Missing details",
        "Please enter pickup and drop-off addresses."
      );
      return;
    }

    if (
      !distance.trim() ||
      !duration.trim() ||
      !Number.isFinite(Number(distance)) ||
      !Number.isFinite(Number(duration)) ||
      Number(distance) <= 0 ||
      Number(duration) <= 0
    ) {
      Alert.alert(
        "Missing details",
        "Please enter a valid estimated distance and duration."
      );
      return;
    }

    setLoading(true);

    try {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      if (userError) throw userError;

      if (!userData.user) {
        throw new Error("Please sign in before booking a ride.");
      }

      const pickupDateTime = new Date().toISOString();

      const { error } = await supabase.rpc("create_passenger_booking", {
        p_pickup: pickup.trim(),
        p_dropoff: dropoff.trim(),
        p_pickup_datetime: pickupDateTime,
        p_booking_timing: "now",
        p_vehicle_category: vehicle,
        p_distance_miles: Number(distance),
        p_duration_minutes: Math.round(Number(duration)),
        p_ride_type: rideType,
      });

      if (error) throw error;

      Alert.alert(
        "Booking requested",
        "Your instant ride request has been submitted successfully."
      );

      setPickup("");
      setDropoff("");
      setDistance("");
      setDuration("");
    } catch (error) {
      Alert.alert("Booking failed", error.message);
    } finally {
      setLoading(false);
    }
  }

  function input(
    label,
    value,
    setter,
    placeholder,
    keyboardType = "default"
  ) {
    return (
      <View style={styles.field}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={setter}
          placeholder={placeholder}
          placeholderTextColor="#777777"
          keyboardType={keyboardType}
          autoCapitalize="none"
        />
      </View>
    );
  }

  function choice(label, options, value, setter) {
    return (
      <View style={styles.field}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.options}>
          {options.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.option,
                value === option.value && styles.selectedOption,
              ]}
              onPress={() => setter(option.value)}
            >
              <Text
                style={[
                  styles.optionText,
                  value === option.value && styles.selectedOptionText,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.brand}>ELITE CLUB</Text>

      <Text style={styles.heading}>Book Your Ride</Text>

      <Text style={styles.subtitle}>
        Need a ride now? Request your premium chauffeur instantly.
      </Text>

      {input(
        "PICKUP ADDRESS",
        pickup,
        setPickup,
        "Enter pickup address"
      )}

      {input(
        "DROP-OFF ADDRESS",
        dropoff,
        setDropoff,
        "Enter destination"
      )}

      {choice(
        "RIDE TYPE",
        [
          { label: "City", value: "city" },
          { label: "Airport", value: "airport" },
          { label: "Long Distance", value: "long_distance" },
        ],
        rideType,
        setRideType
      )}

      {choice(
        "CHOOSE YOUR VEHICLE",
        [
          { label: "Premium Sedan", value: "Premium Sedan" },
          { label: "Luxury SUV", value: "Luxury SUV" },
          { label: "Cadillac VISTIQ", value: "Cadillac VISTIQ" },
          { label: "Executive Sedan", value: "Executive Sedan" },
          { label: "Passenger Van", value: "Passenger Van" },
        ],
        vehicle,
        setVehicle
      )}

      {input(
        "ESTIMATED DISTANCE (MILES)",
        distance,
        setDistance,
        "Enter distance",
        "decimal-pad"
      )}

      {input(
        "ESTIMATED DURATION (MINUTES)",
        duration,
        setDuration,
        "Enter duration",
        "numeric"
      )}

      <Text style={styles.note}>
        Your ride request will be submitted immediately.
        Distance and duration are currently entered manually.
        Automatic route estimates will be added later.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={createBooking}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#080808" />
        ) : (
          <Text style={styles.buttonText}>REQUEST MY RIDE NOW</Text>
        )}
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
    fontSize: 29,
    fontWeight: "bold",
    marginTop: 25,
  },
  subtitle: {
    color: "#AAAAAA",
    marginTop: 8,
    marginBottom: 25,
    lineHeight: 21,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    color: "#D4AF37",
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 1,
    marginBottom: 9,
  },
  input: {
    backgroundColor: "#171717",
    borderColor: "#444444",
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    color: "#FFFFFF",
    fontSize: 15,
  },
  options: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  option: {
    borderWidth: 1,
    borderColor: "#555555",
    borderRadius: 8,
    paddingVertical: 11,
    paddingHorizontal: 13,
    marginBottom: 3,
  },
  selectedOption: {
    backgroundColor: "#D4AF37",
    borderColor: "#D4AF37",
  },
  optionText: {
    color: "#CCCCCC",
    fontSize: 12,
  },
  selectedOptionText: {
    color: "#080808",
    fontWeight: "bold",
  },
  note: {
    color: "#999999",
    fontSize: 12,
    lineHeight: 19,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#D4AF37",
    padding: 17,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#080808",
    fontWeight: "bold",
    letterSpacing: 1,
  },
  footer: {
    color: "#777777",
    textAlign: "center",
    fontSize: 10,
    letterSpacing: 2,
    marginTop: 35,
  },
});
      

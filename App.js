
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  ScrollView
} from "react-native";

import { supabase } from "./supabase";

import LoginScreen from "./src/shared/src/shared/LoginScreen";
import RegisterScreen from "./src/shared/src/shared/RegisterScreen";

import PassengerHome from "./src/passenger/src/passenger/PassengerHome";
import Booking from "./src/passenger/src/passenger/Booking";
import PassengerBookings from "./src/passenger/src/passenger/PassengerBookings";

import DriverHome from "./src/driver/src/driver/DriverHome";
import DriverBookings from "./src/driver/src/driver/DriverBookings";

export default function App() {
  const [screen, setScreen] = useState("welcome");
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function restoreSession() {
      const { data, error } = await supabase.auth.getSession();

      if (!mounted) return;

      if (error || !data.session) {
        setLoading(false);
        return;
      }

      const currentUser = data.session.user;

      const { data: userProfile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", currentUser.id)
        .single();

      if (!mounted) return;

      if (profileError || !userProfile) {
        setLoading(false);
        return;
      }

      if (
        userProfile.role === "driver" &&
        userProfile.approval_status !== "approved"
      ) {
        await supabase.auth.signOut();
        setLoading(false);
        return;
      }

      setUser(currentUser);
      setProfile(userProfile);
      setScreen(
        userProfile.role === "driver" ? "driverHome" : "passengerHome"
      );
      setLoading(false);
    }

    restoreSession();

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session && mounted) {
        setUser(null);
        setProfile(null);
        setScreen("welcome");
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setScreen("welcome");
  }

  function handleLogin(loggedInUser, userProfile) {
    setUser(loggedInUser);
    setProfile(userProfile);
    setScreen(
      userProfile.role === "driver" ? "driverHome" : "passengerHome"
    );
  }

  const navigation = {
    navigate: (destination) => {
      if (destination === "Booking") setScreen("booking");
      if (destination === "PassengerBookings") setScreen("passengerBookings");
      if (destination === "DriverBookings") setScreen("driverBookings");
    }
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <StatusBar barStyle="light-content" backgroundColor="#080808" />
        <ActivityIndicator size="large" color="#D4AF37" />
        <Text style={styles.loadingText}>ELITE CHAUFFEUR</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#080808" />

      {screen === "welcome" && (
        <ScrollView contentContainerStyle={styles.welcome}>
          <Text style={styles.brand}>ELITE CLUB</Text>
          <Text style={styles.subtitle}>ELITE CHAUFFEUR</Text>

          <View style={styles.hero}>
            <Text style={styles.heroTitle}>TRAVEL IN</Text>
            <Text style={styles.heroGold}>EXCELLENCE.</Text>
            <Text style={styles.description}>
              Premium Rides. Elevated Journeys.
            </Text>
          </View>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => setScreen("login")}
          >
            <Text style={styles.primaryButtonText}>SIGN IN</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => setScreen("register")}
          >
            <Text style={styles.secondaryButtonText}>CREATE ACCOUNT</Text>
          </TouchableOpacity>

          <Text style={styles.footer}>
            PREMIUM CHAUFFEUR SERVICES
          </Text>
        </ScrollView>
      )}

      {screen === "login" && (
        <LoginScreen onLogin={handleLogin} />
      )}

      {screen === "register" && (
        <RegisterScreen
          onRegistered={() => setScreen("login")}
          onGoToLogin={() => setScreen("login")}
        />
      )}

      {screen !== "welcome" && screen !== "login" && screen !== "register" && (
        <View style={styles.appArea}>
          <View style={styles.topBar}>
            <Text style={styles.topBrand}>ELITE CLUB</Text>

            <TouchableOpacity onPress={handleLogout}>
              <Text style={styles.logout}>SIGN OUT</Text>
            </TouchableOpacity>
          </View>

          {screen === "passengerHome" && (
            <>
              <PassengerHome navigation={navigation} />
              <TouchableOpacity
                style={styles.historyButton}
                onPress={() => setScreen("passengerBookings")}
              >
                <Text style={styles.historyText}>MY BOOKINGS</Text>
              </TouchableOpacity>
            </>
          )}

          {screen === "booking" && <Booking />}

          {screen === "passengerBookings" && <PassengerBookings />}

          {screen === "driverHome" && (
            <DriverHome navigation={navigation} />
          )}

          {screen === "driverBookings" && <DriverBookings />}

          {screen !== "passengerHome" && screen !== "driverHome" && (
            <TouchableOpacity
              style={styles.backButton}
              onPress={() =>
                setScreen(
                  profile?.role === "driver" ? "driverHome" : "passengerHome"
                )
              }
            >
              <Text style={styles.backText}>← BACK TO DASHBOARD</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#080808"
  },
  loading: {
    flex: 1,
    backgroundColor: "#080808",
    justifyContent: "center",
    alignItems: "center"
  },
  loadingText: {
    color: "#D4AF37",
    marginTop: 18,
    letterSpacing: 3,
    fontWeight: "bold"
  },
  welcome: {
    flexGrow: 1,
    backgroundColor: "#080808",
    padding: 28,
    justifyContent: "center"
  },
  brand: {
    color: "#D4AF37",
    fontSize: 32,
    fontWeight: "bold",
    letterSpacing: 5,
    textAlign: "center"
  },
  subtitle: {
    color: "#FFFFFF",
    fontSize: 12,
    letterSpacing: 5,
    textAlign: "center",
    marginTop: 10
  },
  hero: {
    marginTop: 90,
    marginBottom: 65,
    alignItems: "center"
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "300",
    letterSpacing: 3
  },
  heroGold: {
    color: "#D4AF37",
    fontSize: 36,
    fontWeight: "bold",
    letterSpacing: 2
  },
  description: {
    color: "#BBBBBB",
    fontSize: 14,
    marginTop: 22,
    letterSpacing: 1
  },
  primaryButton: {
    backgroundColor: "#D4AF37",
    padding: 18,
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 15
  },
  primaryButtonText: {
    color: "#080808",
    fontWeight: "bold",
    letterSpacing: 2
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: "#D4AF37",
    padding: 17,
    alignItems: "center",
    borderRadius: 5
  },
  secondaryButtonText: {
    color: "#D4AF37",
    fontWeight: "bold",
    letterSpacing: 2
  },
  footer: {
    color: "#777777",
    fontSize: 10,
    textAlign: "center",
    marginTop: 65,
    letterSpacing: 2
  },
  appArea: {
    flex: 1,
    backgroundColor: "#080808"
  },
  topBar: {
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#292929",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  topBrand: {
    color: "#D4AF37",
    fontWeight: "bold",
    letterSpacing: 2
  },
  logout: {
    color: "#D4AF37",
    fontSize: 12,
    fontWeight: "bold"
  },
  historyButton: {
    margin: 16,
    padding: 15,
    borderWidth: 1,
    borderColor: "#D4AF37",
    alignItems: "center"
  },
  historyText: {
    color: "#D4AF37",
    fontWeight: "bold",
    letterSpacing: 1
  },
  backButton: {
    padding: 16,
    alignItems: "center"
  },
  backText: {
    color: "#D4AF37",
    fontWeight: "bold"
  }
});
      

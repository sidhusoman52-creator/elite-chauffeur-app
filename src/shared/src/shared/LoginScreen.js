
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { supabase } from "../../../../supabase";

export default function LoginScreen({ onLogin }) {
  const [role, setRole] = useState("passenger");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email.trim() || !password) {
      Alert.alert("Missing details", "Enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) throw error;

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.user.id)
        .single();

      if (profileError) throw profileError;

      if (profile.role !== role) {
        await supabase.auth.signOut();
        throw new Error(
          "This account is not registered as a " + role + "."
        );
      }

      if (role === "driver" && profile.approval_status !== "approved") {
        await supabase.auth.signOut();

        throw new Error(
          "Your driver account is awaiting approval. Please contact support."
        );
      }

      if (onLogin) {
        onLogin(data.user, profile);
      }
    } catch (error) {
      Alert.alert("Login failed", error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.brand}>ELITE CLUB</Text>
        <Text style={styles.brandSubtitle}>ELITE CHAUFFEUR</Text>

        <Text style={styles.heading}>Welcome Back</Text>
        <Text style={styles.subtitle}>
          Sign in to continue your journey.
        </Text>

        <Text style={styles.label}>SIGN IN AS</Text>

        <View style={styles.roleContainer}>
          <TouchableOpacity
            style={[
              styles.roleButton,
              role === "passenger" && styles.selectedRole,
            ]}
            onPress={() => setRole("passenger")}
          >
            <Text
              style={[
                styles.roleText,
                role === "passenger" && styles.selectedRoleText,
              ]}
            >
              PASSENGER
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.roleButton,
              role === "driver" && styles.selectedRole,
            ]}
            onPress={() => setRole("driver")}
          >
            <Text
              style={[
                styles.roleText,
                role === "driver" && styles.selectedRoleText,
              ]}
            >
              DRIVER
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>EMAIL ADDRESS</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          placeholderTextColor="#777777"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Text style={styles.label}>PASSWORD</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          placeholderTextColor="#777777"
          secureTextEntry
          autoCapitalize="none"
        />

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#080808" />
          ) : (
            <Text style={styles.loginButtonText}>SIGN IN</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.footer}>
          PREMIUM RIDES. ELEVATED JOURNEYS.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#080808",
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 25,
  },
  brand: {
    color: "#D4AF37",
    fontSize: 27,
    fontWeight: "bold",
    letterSpacing: 4,
    textAlign: "center",
    marginTop: 35,
  },
  brandSubtitle: {
    color: "#AAAAAA",
    fontSize: 11,
    letterSpacing: 4,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 55,
  },
  heading: {
    color: "#FFFFFF",
    fontSize: 29,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    color: "#AAAAAA",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 35,
  },
  label: {
    color: "#D4AF37",
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 1,
    marginBottom: 10,
    marginTop: 15,
  },
  roleContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 15,
  },
  roleButton: {
    flex: 1,
    padding: 15,
    borderWidth: 1,
    borderColor: "#555555",
    borderRadius: 8,
    alignItems: "center",
  },
  selectedRole: {
    backgroundColor: "#D4AF37",
    borderColor: "#D4AF37",
  },
  roleText: {
    color: "#CCCCCC",
    fontWeight: "bold",
    fontSize: 12,
  },
  selectedRoleText: {
    color: "#080808",
  },
  input: {
    backgroundColor: "#171717",
    borderWidth: 1,
    borderColor: "#444444",
    borderRadius: 8,
    padding: 16,
    color: "#FFFFFF",
    fontSize: 15,
  },
  loginButton: {
    backgroundColor: "#D4AF37",
    padding: 17,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 30,
  },
  loginButtonText: {
    color: "#080808",
    fontWeight: "bold",
    letterSpacing: 2,
  },
  footer: {
    color: "#777777",
    textAlign: "center",
    fontSize: 10,
    letterSpacing: 2,
    marginTop: 45,
    marginBottom: 20,
  },
});
    

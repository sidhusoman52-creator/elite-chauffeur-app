
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

export default function RegisterScreen({ onRegistered, onGoToLogin }) {
  const [role, setRole] = useState("passenger");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!fullName.trim() || !email.trim() || !password) {
      Alert.alert("Missing details", "Please complete all fields.");
      return;
    }

    if (password.length < 8) {
      Alert.alert(
        "Password too short",
        "Please use a password with at least 8 characters."
      );
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: fullName.trim(),
            role: role,
          },
        },
      });

      if (error) throw error;

      if (data.session && data.user) {
        Alert.alert(
          "Registration successful",
          role === "driver"
            ? "Your driver account has been created. Driver approval is required before you can accept rides."
            : "Your passenger account has been created."
        );

        if (onRegistered) {
          onRegistered(data.user);
        }
      } else {
        Alert.alert(
          "Check your email",
          "Your registration has been submitted. Please verify your email before signing in."
        );

        if (onGoToLogin) {
          onGoToLogin();
        }
      }
    } catch (error) {
      Alert.alert("Registration failed", error.message);
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

        <Text style={styles.heading}>Create Your Account</Text>
        <Text style={styles.subtitle}>
          Join us for a more elevated journey.
        </Text>

        <Text style={styles.label}>ACCOUNT TYPE</Text>

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

        <Text style={styles.label}>FULL NAME</Text>
        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
          placeholder="Enter your full name"
          placeholderTextColor="#777777"
          autoCapitalize="words"
        />

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
          placeholder="Create a password"
          placeholderTextColor="#777777"
          secureTextEntry
          autoCapitalize="none"
        />

        {role === "driver" && (
          <Text style={styles.driverNote}>
            Driver accounts require administrator approval before ride
            requests can be accepted.
          </Text>
        )}

        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#080808" />
          ) : (
            <Text style={styles.registerButtonText}>CREATE ACCOUNT</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginLink}
          onPress={onGoToLogin}
        >
          <Text style={styles.loginLinkText}>
            Already have an account? Sign in
          </Text>
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
    marginBottom: 40,
  },
  heading: {
    color: "#FFFFFF",
    fontSize: 27,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    color: "#AAAAAA",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 25,
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
    marginBottom: 10,
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
  driverNote: {
    color: "#AAAAAA",
    fontSize: 12,
    lineHeight: 19,
    marginTop: 15,
  },
  registerButton: {
    backgroundColor: "#D4AF37",
    padding: 17,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 28,
  },
  registerButtonText: {
    color: "#080808",
    fontWeight: "bold",
    letterSpacing: 1,
  },
  loginLink: {
    alignItems: "center",
    marginTop: 22,
  },
  loginLinkText: {
    color: "#D4AF37",
    fontSize: 13,
  },
  footer: {
    color: "#777777",
    textAlign: "center",
    fontSize: 10,
    letterSpacing: 2,
    marginTop: 35,
    marginBottom: 20,
  },
});
    

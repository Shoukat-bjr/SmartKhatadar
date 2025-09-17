import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { CountryPicker } from "react-native-country-codes-picker";

const SignInScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [countryCode, setCountryCode] = useState("+1");
  const [countryFlag, setCountryFlag] = useState("🇺🇸");

  const handleLogin = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      alert("Please enter a valid phone number.");
      return;
    }

    setIsLoading(true);
    try {
      // Simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // alert(`OTP sent to ${countryCode}${phoneNumber}`);
      router.replace(`/auth/OTPScreen?phone=${countryCode}${phoneNumber}`)
    } catch (error) {
      alert("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={[Colors.primary[400], Colors.primary[900]]}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.content}>
            <View style={styles.logoContainer}>
              <Ionicons
                name="lock-closed"
                size={60}
                color={Colors.text.inverse}
              />
            </View>

            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in with your phone number</Text>

            <View style={styles.phoneInputContainer}>
              <View style={styles.phoneInputWrapper}>
                <TouchableOpacity
                  style={styles.countryCodeButton}
                  onPress={() => setShowPicker(true)}
                >
                  {/* <Text style={styles.countryFlag}>{countryFlag}</Text> */}
                  <Text style={styles.countryCodeText}>{countryCode}</Text>
                  <Ionicons
                    name="chevron-down"
                    size={16}
                    color={Colors.text.inverse}
                  />
                </TouchableOpacity>

                <TextInput
                  style={styles.phoneInput}
                  placeholder="Phone Number"
                  placeholderTextColor="rgba(255, 255, 255, 0.6)"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                  autoFocus
                />
              </View>
            </View>

            <CountryPicker
              show={showPicker}
              pickerButtonOnPress={(item) => {
                setCountryCode(item.dial_code);
                // setCountryFlag(item.flag || "🇺🇸");
                setShowPicker(false);
              }}
              onBackdropPress={() => setShowPicker(false)}
              style={{
                modal: {
                  height: 500,
                  padding: 10,
                },
                textInput: {
                  height: 40,
                  padding: 10,
                  color: Colors.primary[900],
                },
              }}
              lang={""}
            />

            <TouchableOpacity
              style={[
                styles.loginButton,
                isLoading && styles.loginButtonDisabled,
              ]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={Colors.primary[300]} />
              ) : (
                <View style={styles.buttonContent}>
                  <Text style={styles.loginButtonText}>Continue</Text>
                </View>
              )}
            </TouchableOpacity>

            <Text style={styles.termsText}>
              By continuing, you agree to our Terms of Service and Privacy
              Policy
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  content: {
    width: "100%",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    color: Colors.text.inverse,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 40,
    color: "rgba(255, 255, 255, 0.8)",
  },
  phoneInputContainer: {
    width: "100%",
    marginBottom: 30,
    alignItems: "center",
  },
  phoneInputWrapper: {
    width: "100%",
    height: 50,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  countryCodeButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  countryCodeText: {
    color: Colors.text.inverse,
    fontSize: 16,
    marginRight: 6,
  },
  phoneInput: {
    flex: 1,
    height: "100%",
    color: Colors.text.inverse,
    fontSize: 16,
    paddingHorizontal: 12,
  },
  loginButton: {
    backgroundColor: Colors.primary[50],
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  loginButtonText: {
    color: Colors.primary[900],
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8,
  },
  termsText: {
    color: "rgba(255, 255, 255, 0.6)",
    textAlign: "center",
    fontSize: 12,
    marginTop: 30,
    paddingHorizontal: 20,
  },
});

export default SignInScreen;

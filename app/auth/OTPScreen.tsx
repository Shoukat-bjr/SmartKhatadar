import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

const OTPScreen = () => {
  const { phone } = useLocalSearchParams();
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    // Start countdown timer
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleOtpChange = (text: string, index: number) => {
    if (!/^\d*$/.test(text)) return; // Only allow numbers

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto focus to next input
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto submit when all fields are filled
    if (newOtp.every(digit => digit !== "") && index === 5) {
      handleVerify(newOtp.join(""));
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (code: string) => {
    if (code.length !== 6) {
      Alert.alert("Error", "Please enter a valid 6-digit code");
      return;
    }

    setIsLoading(true);
    try {
      // Simulate verification API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // For demo purposes, any 6-digit code is accepted
      Alert.alert("Success", "Verification successful!");
      router.replace("/(tabs)");
    } catch (error) {
      Alert.alert("Error", "Failed to verify code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = () => {
    if (!canResend) return;

    setCountdown(30);
    setCanResend(false);
    setOtp(Array(6).fill(""));
    inputRefs.current[0]?.focus();
    
    // Simulate resend API call
    Alert.alert("Code Sent", "A new verification code has been sent to your phone.");
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
          <View style={styles.content}>
            {/* Back button */}
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color={Colors.text.inverse} />
            </TouchableOpacity>

            {/* Header */}
            <View style={styles.header}>
              <Ionicons name="shield-checkmark" size={60} color={Colors.text.inverse} />
              <Text style={styles.title}>Verification</Text>
              <Text style={styles.subtitle}>
                Enter the 6-digit code sent to
              </Text>
              <Text style={styles.phoneNumber}>{phone}</Text>
            </View>

            {/* OTP Inputs */}
            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => { inputRefs.current[index] = ref; }}
                  style={[styles.otpInput, digit && styles.otpInputFilled]}
                  value={digit}
                  onChangeText={(text) => handleOtpChange(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  selectTextOnFocus
                />
              ))}
            </View>

            {/* Verify Button */}
            <TouchableOpacity
              style={[styles.verifyButton, isLoading && styles.buttonDisabled]}
              onPress={() => handleVerify(otp.join(""))}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={Colors.primary[900]} />
              ) : (
                <Text style={styles.verifyButtonText}>Verify</Text>
              )}
            </TouchableOpacity>

            {/* Resend Code */}
            <View style={styles.resendContainer}>
              <Text style={styles.resendText}>
                Didn't receive the code?{" "}
              </Text>
              <TouchableOpacity 
                onPress={handleResendCode} 
                disabled={!canResend}
              >
                <Text style={[
                  styles.resendButtonText, 
                  !canResend && styles.resendButtonDisabled
                ]}>
                  {canResend ? "Resend" : `Resend in ${countdown}s`}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Support */}
            <View style={styles.supportContainer}>
              <Text style={styles.supportText}>
                Having trouble receiving the code?
              </Text>
              <TouchableOpacity>
                <Text style={styles.supportLink}>Contact Support</Text>
              </TouchableOpacity>
            </View>
          </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  keyboardAvoid: {
    flex: 1,
  },
  content: {
    width: "100%",
    alignItems: "center",
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 20,
    paddingTop: 10,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 15,
    color: Colors.text.inverse,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 8,
  },
  phoneNumber: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    color: Colors.text.inverse,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 30,
  },
  otpInput: {
    width: 50,
    height: 60,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    color: Colors.text.inverse,
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
  },
  otpInputFilled: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    borderColor: Colors.primary[50],
  },
  verifyButton: {
    backgroundColor: Colors.primary[50],
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    width: "100%",
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  verifyButtonText: {
    color: Colors.primary[900],
    fontSize: 16,
    fontWeight: "600",
  },
  resendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  resendText: {
    color: "rgba(255, 255, 255, 0.7)",
  },
  resendButtonText: {
    color: Colors.primary[50],
    fontWeight: "600",
  },
  resendButtonDisabled: {
    color: "rgba(255, 255, 255, 0.5)",
  },
  supportContainer: {
    alignItems: "center",
  },
  supportText: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 12,
    marginBottom: 4,
  },
  supportLink: {
    color: Colors.primary[50],
    fontSize: 12,
    fontWeight: "600",
  },
});

export default OTPScreen;
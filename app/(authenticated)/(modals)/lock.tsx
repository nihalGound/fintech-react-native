import * as LocalAuthentication from "expo-local-authentication";
import { useState } from "react";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

const PhonePinAuth = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onBiometricAuthPress = async () => {
    try {
      // Try biometric authentication with fallback to PIN if biometrics aren't available
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate with your phone PIN or biometrics",
        fallbackLabel: "Use PIN", // Android: PIN fallback will be shown if biometrics are unavailable
        disableDeviceFallback: false, // Allow fallback to PIN or password
      });

      if (result.success) {
        // If authentication is successful, navigate to authenticated screen
        router.replace("/(authenticated)/(tabs)/home");
      } else {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        setError("Authentication failed. Please try again." + result.error);
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
      {/* Button to trigger authentication */}
      <TouchableOpacity style={styles.button} onPress={onBiometricAuthPress}>
        <Text style={styles.buttonText}>Authenticate with PIN or Biometric</Text>
      </TouchableOpacity>

      {/* Display error message if authentication fails */}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "gray",
    padding: 10,
    margin: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
});

export default PhonePinAuth;

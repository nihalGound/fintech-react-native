import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
const Page = () => {
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState("");
  const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;
  const router = useRouter();
  const { isLoaded, signUp } = useSignUp();

  const validatePassword = (pass: string) => {
    // Reset previous error
    setPasswordError("");

    // Minimum length check
    if (pass.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return false;
    }

    // Check for uppercase letter
    if (!/[A-Z]/.test(pass)) {
      setPasswordError("Password must contain at least one uppercase letter");
      return false;
    }

    // Check for lowercase letter
    if (!/[a-z]/.test(pass)) {
      setPasswordError("Password must contain at least one lowercase letter");
      return false;
    }

    // Check for number
    if (!/\d/.test(pass)) {
      setPasswordError("Password must contain at least one number");
      return false;
    }

    // Check for special character
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(pass)) {
      setPasswordError("Password must contain at least one special character");
      return false;
    }

    // Check for common passwords (you can expand this list)
    const commonPasswords = ["Password123!", "Admin123!", "Welcome123!"];
    if (commonPasswords.includes(pass)) {
      setPasswordError("Please choose a less common password");
      return false;
    }

    // Check for sequential characters
    if (/123|234|345|456|567|678|789/.test(pass)) {
      setPasswordError("Password cannot contain sequential numbers");
      return false;
    }

    // Check for repeated characters
    if (/(.)\1{2,}/.test(pass)) {
      setPasswordError("Password cannot contain repeated characters");
      return false;
    }

    return true;
  };

  const onSignup = async () => {
    const fullPhoneNumber = `${countryCode}${phoneNumber}`;
    if (!isLoaded) {
      return;
    }
    if (!validatePassword(password)) {
      Alert.alert("Invalid Password", passwordError);
      return;
    }

    try {
      await signUp?.create({
        phoneNumber: fullPhoneNumber,
        password: password,
      });

      await signUp!.preparePhoneNumberVerification();

      router.push({
        pathname: "/verify/[phone]",
        params: { phone: fullPhoneNumber },
      });
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <View style={defaultStyles.container}>
        <Text style={defaultStyles.header}>Let's get started!</Text>
        <Text style={defaultStyles.descriptionText}>
          Enter your phone number. We will send you a confirmation code there
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Country code"
            placeholderTextColor={Colors.gray}
            value={countryCode}
          />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Mobile number"
            placeholderTextColor={Colors.gray}
            keyboardType="numeric"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>

        <View
          style={[
            styles.inputContainer,
            {alignItems:"center"}
          ]}
        >
          <TextInput
            style={[styles.input,{flex:1, paddingHorizontal:8, paddingVertical:15}]}
            placeholder="Password"
            placeholderTextColor={Colors.gray}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (text.length > 0) {
                validatePassword(text);
              } else {
                setPasswordError("");
              }
            }}
            secureTextEntry={!passwordVisible}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
          >
            <Text style={{ color: Colors.gray }}>
              {passwordVisible ? "Hide" : "Show"}
            </Text>
          </TouchableOpacity>
        </View>

        <Link href={"/login"} replace asChild>
          <TouchableOpacity>
            <Text style={defaultStyles.textLink}>
              Already have an account? Log in
            </Text>
          </TouchableOpacity>
        </Link>

        <View style={{ flex: 1 }} />

        <TouchableOpacity
          style={[
            defaultStyles.pillButton,
            phoneNumber !== "" ? styles.enabled : styles.disabled,
            { marginBottom: 20 },
          ]}
          onPress={onSignup}
        >
          <Text style={defaultStyles.buttonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 40,
    flexDirection: "row",
  },
  input: {
    backgroundColor: Colors.lightGray,
    padding: 20,
    borderRadius: 16,
    fontSize: 20,
    marginRight: 10,
  },
  enabled: {
    backgroundColor: Colors.primary,
  },
  disabled: {
    backgroundColor: Colors.primaryMuted,
  },
});
export default Page;

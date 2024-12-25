import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { isClerkAPIResponseError, useSignIn } from "@clerk/clerk-expo";

enum SignInType {
  Phone,
  Email,
  Google,
  Apple,
}

const LoginPage = () => {
  const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0;
  const [countryCode, setCountryCode] = useState<string>("+91");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();
  const { signIn, isLoaded } = useSignIn();

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

  const onSignIn = async (type: SignInType) => {
    if (!isLoaded) return;
    if (type === SignInType.Phone) {
      try {
        const fullPhoneNumber = `${countryCode}${phoneNumber}`;

        const { supportedFirstFactors } = await signIn!.create({
          identifier: fullPhoneNumber,
          password:password
        });
        const firstPhoneFactor: any = supportedFirstFactors?.find(
          (factor: any) => {
            return factor.strategy === "phone_code";
          }
        );

        const { phoneNumberId } = firstPhoneFactor;

        await signIn?.prepareFirstFactor({
          strategy: "phone_code",
          phoneNumberId,
        });

        router.push({
          pathname: "/verify/[phone]",
          params: { phone: fullPhoneNumber, signin: "true" },
        });
      } catch (error) {
        console.log("error", JSON.stringify(error, null, 2));
        if (isClerkAPIResponseError(error)) {
          if (error.errors[0].code === "form_identifier_not_found") {
            Alert.alert("Error", error.errors[0].message);
          }
        }
      }
    }
  };
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={keyboardVerticalOffset}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={defaultStyles.container}>
        <Text style={defaultStyles.header}>Welcome back</Text>
        <Text style={defaultStyles.descriptionText}>
          Enter the phone number associated with your account
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
        <View style={[styles.inputContainer, { alignItems: "center",marginBottom:40, marginVertical:0 }]}>
          <TextInput
            style={[
              styles.input,
              { flex: 1, paddingHorizontal: 8, paddingVertical: 15 },
            ]}
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
        <TouchableOpacity
          style={[
            defaultStyles.pillButton,
            phoneNumber !== "" ? styles.enabled : styles.disabled,
            { marginBottom: 20 },
          ]}
          disabled={phoneNumber.length !== 10}
          onPress={() => onSignIn(SignInType.Phone)}
        >
          <Text style={defaultStyles.buttonText}>Continue</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
          <View
            style={{
              flex: 1,
              height: StyleSheet.hairlineWidth,
              backgroundColor: Colors.gray,
            }}
          />
          <Text style={{ color: Colors.gray, fontSize: 20 }}>or</Text>
          <View
            style={{
              flex: 1,
              height: StyleSheet.hairlineWidth,
              backgroundColor: Colors.gray,
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => onSignIn(SignInType.Email)}
          style={[
            defaultStyles.pillButton,
            {
              flexDirection: "row",
              gap: 16,
              marginTop: 20,
              backgroundColor: "#fff",
            },
          ]}
        >
          <Ionicons name="mail" size={24} color={"#000"} />
          <Text style={[defaultStyles.buttonText, { color: "#000" }]}>
            Continue with email
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onSignIn(SignInType.Google)}
          style={[
            defaultStyles.pillButton,
            {
              flexDirection: "row",
              gap: 16,
              marginTop: 20,
              backgroundColor: "#fff",
            },
          ]}
        >
          <Ionicons name="logo-google" size={24} color={"#000"} />
          <Text style={[defaultStyles.buttonText, { color: "#000" }]}>
            Continue with google
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onSignIn(SignInType.Apple)}
          style={[
            defaultStyles.pillButton,
            {
              flexDirection: "row",
              gap: 16,
              marginTop: 20,
              backgroundColor: "#fff",
            },
          ]}
        >
          <Ionicons name="logo-apple" size={24} color={"#000"} />
          <Text style={[defaultStyles.buttonText, { color: "#000" }]}>
            Continue with apple
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.lightGray,
    padding: 20,
    borderRadius: 16,
    fontSize: 20,
    marginRight: 10,
  },
  inputContainer: {
    flexDirection: "row",
    marginVertical: 40,
  },
  enabled: {
    backgroundColor: Colors.primary,
  },
  disabled: {
    backgroundColor: Colors.primaryMuted,
  },
});

export default LoginPage;

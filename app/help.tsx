import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking, Alert } from "react-native";

const Help = () => {
  const faqs = [
    {
      question: "How do I reset my password?",
      answer: "Go to the Settings page, select 'Account Settings,' and click 'Reset Password.'",
    },
    {
      question: "How can I view my transaction history?",
      answer: "Navigate to the 'Transactions' tab on the home screen.",
    },
    {
      question: "Is my personal information secure?",
      answer: "Yes, we use end-to-end encryption to protect your data.",
    },
  ];

  const openSupport = () => {
    Alert.alert("Help","Currently not supported!!")
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Help & Support</Text>
      <View style={styles.section}>
        <Text style={styles.subtitle}>FAQs</Text>
        {faqs.map((faq, index) => (
          <View key={index} style={styles.faq}>
            <Text style={styles.question}>{faq.question}</Text>
            <Text style={styles.answer}>{faq.answer}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Contact Support</Text>
        <Text style={styles.text}>Need help? Reach out to us:</Text>
        <TouchableOpacity style={styles.button} onPress={openSupport}>
          <Text style={styles.buttonText}>Email Support</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Quick Links</Text>
        <TouchableOpacity onPress={() => Linking.openURL("https://www.fintechapp.com/terms")}>
          <Text style={styles.link}>Terms & Conditions</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL("https://www.fintechapp.com/privacy")}>
          <Text style={styles.link}>Privacy Policy</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#1E90FF",
  },
  section: {
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  faq: {
    marginBottom: 16,
  },
  question: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
  },
  answer: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  text: {
    fontSize: 14,
    color: "#444",
  },
  button: {
    marginTop: 8,
    backgroundColor: "#1E90FF",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  link: {
    fontSize: 14,
    color: "#1E90FF",
    marginTop: 8,
    textDecorationLine: "underline",
  },
});

export default Help;

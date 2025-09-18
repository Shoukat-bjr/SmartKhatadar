import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingTop: 15
        }}
      >
        <MaterialIcons name="search" size={24} color="black" />
        <TouchableOpacity onPress={()=> router.push("/(tabs)/AddCustomer")}>
          <Text style={{ color: Colors.primary[400], fontWeight: '700' }}>Add Customer</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <MaterialIcons name="contacts" size={64} color="#E0E0E0" />

        <Text style={styles.welcomeText}>Welcome to SmartKhatadar</Text>

        <Text style={styles.subText}>
          You have not added any customers yet.
        </Text>

        <TouchableOpacity style={styles.addButton} onPress={()=> router.push("/(tabs)/AddCustomer")}>
          <Text style={styles.addButtonText}>+ Add customers</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: Colors.text.primary,
  },
  subText: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: "center",
    color: Colors.text.secondary,
  },
  addButton: {
    backgroundColor: Colors.primary[400],
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
    shadowColor: Colors.primary[900],
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  addButtonText: {
    color: Colors.text.inverse,
    fontSize: 16,
    fontWeight: "600",
  },
});

export default HomeScreen;

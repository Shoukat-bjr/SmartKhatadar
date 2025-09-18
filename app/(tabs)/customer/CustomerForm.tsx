import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CustomerForm = () => {
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={()=> router.back()}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Add new customer</Text>
            <TouchableOpacity>
                <Text style={styles.addButton}>Add</Text>
            </TouchableOpacity>
        </View>
      <Text>CustomerForm</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.background.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingTop: 16
  },
  cancelBtnText:{
    color: Colors.primary[400],
    fontWeight: "600",
    
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  addButton: {
    color: Colors.primary[400],
    fontWeight: "600",
  }
});

export default CustomerForm;

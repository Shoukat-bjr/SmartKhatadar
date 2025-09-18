import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ headerShown: false }} />
      <Tabs.Screen name="customer/AddCustomer" options={{ headerShown: false, href: null }} />
      <Tabs.Screen name="customer/CustomerForm" options={{ headerShown: false, href: null }} />
    </Tabs>
  );
}

import { Colors } from "@/constants/Colors";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import * as Contacts from "expo-contacts";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Define TypeScript interfaces
interface PhoneNumber {
  number?: string;
  label: string;
}

interface Contact {
  id: string;
  name: string;
  phoneNumbers?: PhoneNumber[];
  imageAvailable?: boolean;
  image?: { uri: string };
}

const AddCustomer = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);

  // Request contacts permission and load contacts
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [
            Contacts.Fields.Name,
            Contacts.Fields.PhoneNumbers,
            Contacts.Fields.Image,
          ],
        });

        if (data.length > 0) {
          setContacts(data as Contact[]);
          setFilteredContacts(data as Contact[]);
        }
      }
      setIsLoading(false);
    })();
  }, []);

  // Safe contact name getter
  const getContactName = (contact: Contact): string => {
    return contact?.name || "Unknown Contact";
  };

  // Get first phone number or placeholder
  const getPhoneNumber = (contact: Contact): string => {
    if (contact.phoneNumbers && contact.phoneNumbers.length > 0) {
      return contact.phoneNumbers[0].number || "No phone number";
    }
    return "No phone number";
  };

  // Toggle contact selection
  const toggleContactSelection = (contactId: string) => {
    setSelectedContacts((prev) =>
      prev.includes(contactId)
        ? prev.filter((id) => id !== contactId)
        : [...prev, contactId]
    );
  };

  // Filter contacts based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredContacts(contacts);
    } else {
      const filtered = contacts.filter(
        (contact) =>
          getContactName(contact)
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          getPhoneNumber(contact).includes(searchQuery)
      );
      setFilteredContacts(filtered);
    }
  }, [searchQuery, contacts]);

  // Render each contact item
  const renderContactItem = ({ item }: { item: Contact }) => (
    <TouchableOpacity
      style={styles.contactItem}
      onPress={() => toggleContactSelection(item.id)}
    >
      {item.imageAvailable && item.image ? (
        <Image source={{ uri: item.image.uri }} style={styles.contactImage} />
      ) : (
        <View style={styles.contactImagePlaceholder}>
          <Text style={styles.contactInitial}>
            {getContactName(item).charAt(0).toUpperCase()}
          </Text>
        </View>
      )}

      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{getContactName(item)}</Text>
        <Text style={styles.contactPhone}>{getPhoneNumber(item)}</Text>
      </View>

      {selectedContacts.includes(item.id) && (
        <View style={styles.checkmarkContainer}>
          <Ionicons
            name="checkmark-circle"
            size={24}
            color={Colors.primary[400]}
          />
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Customer</Text>
        <TouchableOpacity>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* search */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color={Colors.gray[400]}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search contacts..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={Colors.gray[400]}
        />
      </View>

      <View>
        <TouchableOpacity
          style={styles.addNewCustomerButton}
          onPress={() => router.push('/(tabs)/customer/CustomerForm')}
        >
          <FontAwesome6
            name="user-plus"
            size={18}
            color={Colors.primary[400]}
          />
          <Text style={styles.addNewCustomerText}>add a new customer</Text>
        </TouchableOpacity>
      </View>

      {/* contacts list */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary[400]} />
          <Text style={styles.loadingText}>Loading contacts...</Text>
        </View>
      ) : filteredContacts.length > 0 ? (
        <FlatList
          data={filteredContacts}
          renderItem={renderContactItem}
          keyExtractor={(item) => item.id}
          style={styles.contactsList}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="people-outline" size={64} color={Colors.gray[300]} />
          <Text style={styles.emptyText}>
            {searchQuery ? "No contacts found" : "No contacts available"}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: Colors.background.primary,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 15,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  cancelText: {
    color: Colors.primary[400],
    fontWeight: "600",
  },
  saveText: {
    color: Colors.primary[400],
    fontWeight: "600",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.gray[100],
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 44,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.text.primary,
  },
  addNewCustomerText: {
    color: Colors.primary[400],
    fontWeight: "600",
  },
  addNewCustomerButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    // backgroundColor: Colors.primary[100],
    // paddingVertical: 12,
    // paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 10,
  },
  contactsList: {
    flex: 1,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  contactImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  contactImagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.gray[200],
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  contactInitial: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.gray[600],
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  contactPhone: {
    fontSize: 14,
    color: Colors.gray[600],
  },
  checkmarkContainer: {
    marginLeft: "auto",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    color: Colors.gray[600],
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: Colors.gray[600],
  },
});

export default AddCustomer;

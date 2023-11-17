import React, { useState } from 'react';
import { Alert, View, Text, StyleSheet, Dimensions } from 'react-native';
import { Input, Header, Icon, Button } from '@rneui/themed';
import DropDownPicker from 'react-native-dropdown-picker';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from "@react-navigation/native";
import SideMenu from "react-native-side-menu";

export default function RateScope() {
  const screenWidth = Dimensions.get("window").width;
  const navigation = useNavigation();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('autoTax');
  const [selectedState, setSelectedState] = useState('IL');
  const [randomTaxRate, setRandomTaxRate] = useState(null);

  const taxCategories = [
    { label: 'Auto Tax', value: 'autoTax' },
    { label: 'Income Tax', value: 'incomeTax' },
    // Add more tax categories as needed
  ];

  const usStates = [
    { label: 'Alabama', value: 'AL', coordinates: { latitude: 32.806671, longitude: -86.791130 } },
    { label: 'Alaska', value: 'AK', coordinates: { latitude: 61.016977, longitude: -149.243286 } },
    // Add more states with coordinates
    { label: 'Illinois', value: 'IL', coordinates: { latitude: 40.633125, longitude: -89.398528 } },
  ];

  const generateRandomTaxRate = () => {
    // Generate a random tax rate between 1% and 10%
    const rate = Math.random() * (10 - 1) + 1;
    setRandomTaxRate(rate.toFixed(2)); // Keep only two decimal places
  };

  return (
    <SideMenu /* ... your existing SideMenu code ... */>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Header /* ... your existing Header code ... */ />

        <View style={styles.container}>
          <Text style={styles.title}>Tax Lookup</Text>

          <View style={styles.dropdownContainer}>
            {/* First Dropdown for Tax Category */}
            <DropDownPicker
            open={isOpen}
            value={selectedCategory}
            items={taxCategories}
            placeholder="Select Tax Category"
            containerStyle={{ height: 40, width: screenWidth / 2 - 15 }}
            style={{ backgroundColor: '#fafafa' }}
            itemStyle={{ justifyContent: 'flex-start' }}
            dropDownStyle={{ backgroundColor: '#fafafa' ,zindex: 2}}
            onChangeItem={(item) => {
                setSelectedCategory(item.value);
                setIsOpen(false); // Close the dropdown after selecting an item
            }}
            />

            <DropDownPicker
            open={isOpen}
            value={selectedState}
            items={usStates}
            placeholder="Select State"
            containerStyle={{ height: 40, width: screenWidth / 2 - 15 }}
            style={{ backgroundColor: '#fafafa' }}
            itemStyle={{ justifyContent: 'flex-start' }}
            dropDownStyle={{ backgroundColor: '#fafafa' }}
            onChangeItem={(item) => {
                setSelectedState(item.value);
                setIsOpen(false); // Close the dropdown after selecting an item
            }}
            />

            
          </View>

          {/* MapView component */}
          <MapView
            style={{ flex: 1, height: 200 }}
            initialRegion={{
              latitude: usStates.find((state) => state.value === selectedState).coordinates.latitude,
              longitude: usStates.find((state) => state.value === selectedState).coordinates.longitude,
              latitudeDelta: 5,
              longitudeDelta: 5,
            }}
          >
            {/* Marker for the selected state */}
            <Marker
              coordinate={usStates.find((state) => state.value === selectedState).coordinates}
              title={selectedState}
            />
          </MapView>

          {/* Text view displaying tax rate */}
          <Text style={styles.taxRateText}>{`Tax Rate: ${randomTaxRate || 'Select state and category'}`}</Text>

          <Button title="Tax Rate" onPress={generateRandomTaxRate} style={{ zIndex: 0 }} />
        </View>

        <View style={styles.backButtonContainer}>
          {/* ... your existing Go Back button code ... */}
        </View>
      </View>
    </SideMenu>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 20,
  },
  dropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  taxRateText: {
    fontSize: 16,
    marginTop: 10,
  },
  backButtonContainer: {
    position: 'absolute',
    left: 20,
    bottom: 20,
  },
  // ... other styles
});

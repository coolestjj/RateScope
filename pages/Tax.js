import React, {useRef, useState, useEffect} from 'react';
import { Alert, View, Text, StyleSheet, Dimensions } from 'react-native';
import { Input, Icon, Button } from '@rneui/themed';
import DropDownPicker from 'react-native-dropdown-picker';
import MapView, { Marker, Heatmap } from 'react-native-maps';
import { useNavigation } from "@react-navigation/native";
import { Header } from '@rneui/themed'; // Import Header from your library
import SideMenu from "react-native-side-menu";

export default function RateScope() {
  const screenWidth = Dimensions.get("window").width;
  const navigation = useNavigation();

  // This useState hook is only for side bar control, don't use it elsewhere!
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState('AL');
  const [selectedCategory, setSelectedCategory] = useState('autoTax');
  const [selectedState, setSelectedState] = useState('IL');

  const states = [
    {label: 'AL', value: 'AL'},
    {label: 'AK', value: 'AK'},
    {label: 'IL', value: 'IL'},
  ]

  const [taxMatrix, setTaxMatrix] = useState({
    autoTax: {
      AL: 5.2,
      AK: 6.8,
      IL: 4.5,
      // Add more states and values as needed
    },
    incomeTax: {
      AL: 3.5,
      AK: 7.2,
      IL: 5.8,
      // Add more states and values as needed
    },
  });

  const [randomTaxRate, setRandomTaxRate] = useState(null);

  const generateRandomTaxRate = () => {
    const taxRate = taxMatrix[selectedCategory][selectedState];
    setRandomTaxRate(taxRate.toFixed(2)); // Keep only two decimal places
  };

  const getHeatmapData = () => {
    // Convert taxMatrix into an array of {latitude, longitude, weight} for heatmap
    const heatmapData = Object.entries(taxMatrix[selectedCategory]).map(([state, rate]) => ({
      latitude: stateCoordinates[state].latitude,
      longitude: stateCoordinates[state].longitude,
      weight: rate,
    }));
    return heatmapData;
  };

  const mapRef = useRef(null);
  const stateCoordinates = {
    AL: { latitude: 32.806671, longitude: -86.791130 },
    AK: { latitude: 61.016977, longitude: -149.243286 },
    IL: { latitude: 40.633125, longitude: -89.398528 },
    // Add more states and coordinates as needed
  };
  const changeLocation = (newState) => {
    if (stateCoordinates[newState]) {
      mapRef.current.animateToRegion({
        latitude: stateCoordinates[newState].latitude,
        longitude: stateCoordinates[newState].longitude,
        latitudeDelta: 5,
        longitudeDelta: 5,
      }, 1000);
    }
  }

  const menu =
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Button title="Main" onPress={() => {navigation.navigate('Spending'); setIsMenuOpen(false);}}
                style={{marginBottom: 8}} type='clear'/>
        <Button title="Personal Profile" onPress={() => {navigation.navigate('Personal'); setIsMenuOpen(false);}}
                style={{marginBottom: 8}} type='clear'/>
        <Button title="Spending Overview" onPress={() => {navigation.navigate('Overview'); setIsMenuOpen(false);}}
                style={{marginBottom: 8}} type='clear'/>
        <Button title="Tax Lookup Map" onPress={() => {navigation.navigate('Tax'); setIsMenuOpen(false);}}
                style={{marginBottom: 8}} type='clear'/>
        <Button title="Savings Planner" onPress={() => {navigation.navigate('Saving'); setIsMenuOpen(false);}}
                style={{marginBottom: 8}} type='clear'/>
        <Button title="Loan Planner" onPress={() => {navigation.navigate('Loan'); setIsMenuOpen(false);}}
                style={{marginBottom: 8}} type='clear'/>
        <View style={{flexDirection: 'row', alignItems: 'center', position: 'absolute', bottom: 20, right: 8}}>
          <Text onPress={() => navigation.navigate('Login')}>Logout</Text>
          <Icon name="logout" onPress={() => navigation.navigate('Login')} size={30}/>
        </View>
      </View>
  ;

  return (
    <SideMenu menu={menu} isOpen={isMenuOpen}>
      <View style={{ flex: 1, backgroundColor: '#67b99a' }}>
        <Header
            leftComponent={<Icon name='menu'
                                 size={30}
                                 color='white'
                                 onPress={() => setIsMenuOpen(!isMenuOpen)}
            />}
            centerComponent={{text: 'RateScope', style: {color: '#fff', fontSize: 20}}}
            rightComponent={<Icon name='home'
                                  color='white'
                                  onPress={() => navigation.navigate('Spending')}
                                  size={30}/>}
            backgroundColor="#358f80"
        />

        <View style={styles.container}>
          <Text style={styles.title}>Tax Lookup</Text>

          <View style={styles.dropdownContainer}>
            {/* First Dropdown for Tax Category */}
            <DropDownPicker
              open={open1}
              value={selectedCategory}
              items={[
                { label: 'Auto Tax', value: 'autoTax' },
                { label: 'Income Tax', value: 'incomeTax' },
                // Add more tax categories as needed
              ]}
              placeholder="Select Tax Category"
              containerStyle={{ height: 40, width: screenWidth / 2 - 15 }}
              style={{ backgroundColor: '#fafafa' }}
              itemStyle={{ justifyContent: 'flex-start' }}
              dropDownStyle={{ backgroundColor: '#fafafa', zIndex: 2 }}
              onChangeItem={(item) => {
                setSelectedCategory(item.value);
                setOpen1(false); // Close the dropdown after selecting an item
              }}
              setOpen={setOpen1}
              onPress={() => setIsMenuOpen(false)}
            />

            {/* Second Dropdown for US States */}
            <DropDownPicker
              open={open2}
              setOpen={setOpen2}
              items={states}
              value={value2}
              setValue={setValue2}
              placeholder="Select State"
              containerStyle={{ height: 40, width: screenWidth / 2 - 15 }}
              style={{ backgroundColor: '#fafafa' }}
              itemStyle={{ justifyContent: 'flex-start' }}
              dropDownStyle={{ backgroundColor: '#fafafa', zIndex: 2 }}
              onChangeItem={(item) => {
                setSelectedState(item.value);
                alert(item.value);
                setOpen2(false); // Close the dropdown after selecting an item
              }}
              onPress={() => setIsMenuOpen(false)}
              />
          </View>

          {/*<Button onPress={() => alert(selectedState)} />*/}
          {/* MapView component with Heatmap */}
          <MapView
            ref = {mapRef}
            style={{ flex: 1, height: 200 }}
            initialRegion={{
              // latitude: stateCoordinates[selectedState].latitude,
              // longitude: stateCoordinates[selectedState].longitude,
              latitude: 40.633125, longitude: -89.398528,
              latitudeDelta: 5,
              longitudeDelta: 5,
            }}
            provider={"google"}
          >
            {/* Marker for the selected state */}
            <Marker
              coordinate={stateCoordinates[selectedState]}
              title={selectedState}
            />
            {/* Heatmap overlay */}
            <Heatmap
              points={getHeatmapData()}
              radius={40}
              opacity={0.7}
              gradient={{
                colors: ["#00FF00", "#FF0000"],
                startPoints: [0.2, 0.8],
                colorMapSize: 256,
              }}
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
    zIndex: 1
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

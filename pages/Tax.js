import React, {useRef, useState, useEffect} from 'react';
import { Alert, View, Text, StyleSheet, Dimensions } from 'react-native';
import { Input, Icon, Button } from '@rneui/themed';
import DropDownPicker from 'react-native-dropdown-picker';
import MapView, { Marker, Heatmap } from 'react-native-maps';
import { useNavigation } from "@react-navigation/native";
import { Header } from '@rneui/themed'; // Import Header from your library
import SideMenu from "react-native-side-menu";
import LeftMenu from "../UI/LeftMenu";

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
    { label: 'AL', value: 'AL' },
    { label: 'AK', value: 'AK' },
    { label: 'AZ', value: 'AZ' },
    { label: 'AR', value: 'AR' },
    { label: 'CA', value: 'CA' },
    { label: 'CO', value: 'CO' },
    { label: 'CT', value: 'CT' },
    { label: 'DE', value: 'DE' },
    { label: 'FL', value: 'FL' },
    { label: 'GA', value: 'GA' },
    { label: 'HI', value: 'HI' },
    { label: 'ID', value: 'ID' },
    { label: 'IL', value: 'IL' },
    { label: 'IN', value: 'IN' },
    { label: 'IA', value: 'IA' },
    { label: 'KS', value: 'KS' },
    { label: 'KY', value: 'KY' },
    { label: 'LA', value: 'LA' },
    { label: 'ME', value: 'ME' },
    { label: 'MD', value: 'MD' },
    { label: 'MA', value: 'MA' },
    { label: 'MI', value: 'MI' },
    { label: 'MN', value: 'MN' },
    { label: 'MS', value: 'MS' },
    { label: 'MO', value: 'MO' },
    { label: 'MT', value: 'MT' },
    { label: 'NE', value: 'NE' },
    { label: 'NV', value: 'NV' },
    { label: 'NH', value: 'NH' },
    { label: 'NJ', value: 'NJ' },
    { label: 'NM', value: 'NM' },
    { label: 'NY', value: 'NY' },
    { label: 'NC', value: 'NC' },
    { label: 'ND', value: 'ND' },
    { label: 'OH', value: 'OH' },
    { label: 'OK', value: 'OK' },
    { label: 'OR', value: 'OR' },
    { label: 'PA', value: 'PA' },
    { label: 'RI', value: 'RI' },
    { label: 'SC', value: 'SC' },
    { label: 'SD', value: 'SD' },
    { label: 'TN', value: 'TN' },
    { label: 'TX', value: 'TX' },
    { label: 'UT', value: 'UT' },
    { label: 'VT', value: 'VT' },
    { label: 'VA', value: 'VA' },
    { label: 'WA', value: 'WA' },
    { label: 'WV', value: 'WV' },
    { label: 'WI', value: 'WI' },
    { label: 'WY', value: 'WY' }
];
  const [taxMatrix, setTaxMatrix] = useState({
    autoTax: {
      AL: 5.2,
      AK: 6.8,
      AZ: 5.6,
      AR: 6.9,
      CA: 7.25,
      CO: 5.3,
      CT: 6.35,
      DE: 6.6,
      DC: 5.75,
      FL: 6.0,
      GA: 7.25,
      HI: 4.45,
      ID: 7.25,
      IL: 4.5,
      IN: 7.0,
      IA: 6.0,
      KS: 6.5,
      KY: 6.0,
      LA: 5.0,
      ME: 5.5,
      MD: 6.0,
      MA: 6.65,
      MI: 4.35,
      MN: 5.3,
      MS: 7.0,
      MO: 5.4,
      MT: 7.0,
      NE: 5.5,
      NV: 7.75,
      NH: 5.2,
      NJ: 6.6,
      NM: 5.1,
      NY: 4.3,
      NC: 5.25,
      ND: 5.0,
      OH: 5.75,
      OK: 5.5,
      OR: 0.0,
      PA: 6.0,
      RI: 7.0,
      SC: 6.0,
      SD: 4.5,
      TN: 7.0,
      TX: 6.15,
      UT: 4.7,
      VT: 6.35,
      VA: 4.3,
      WA: 6.5,
      WV: 6.0,
      WI: 5.32,
      WY: 5.5,
    },
  
    incomeTax: {
      AL: 5.00,
      AK: 0.00,
      AZ: 3.30,
      AR: 6.00,
      CA: 9.30,
      CO: 5.45,
      CT: 3.0,
      DE: 3.20,
      DC: 8.95,
      FL: 0.00,
      GA: 6.00,
      HI: 11.00,
      ID: 7.0,
      IL: 4.75,
      IN: 3.23,
      IA: 5.38,
      KS: 5.30,
      KY: 6.00,
      LA: 2.00,
      ME: 8.50,
      MD: 5.20,
      MA: 5.00,
      MI: 4.25,
      MN: 9.85,
      MS: 5.00,
      MO: 5.40,
      MT: 6.90,
      NE: 6.84,
      NV: 0.00,
      NH: 5.00,
      NJ: 10.75,
      NM: 4.90,
      NY: 6.85,
      NC: 5.25,
      ND: 2.46,
      OH: 5.40,
      OK: 5.20,
      OR: 9.90,
      PA: 3.07,
      RI: 7.00,
      SC: 6.00,
      SD: 0.00,
      TN: 0.00,
      TX: 0.00,
      UT: 5.00,
      VT: 6.85,
      VA: 5.75,
      WA: 0.00,
      WV: 6.50,
      WI: 7.65,
      WY: 2.00,
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

  return (
    <SideMenu menu={<LeftMenu setIsMenuOpen={()=>setIsMenuOpen(false)}/>} isOpen={isMenuOpen}>
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
              style={{ backgroundColor: '#fafafa', width: screenWidth / 2 - 30 }}
              itemStyle={{ justifyContent: 'flex-start' }}
              dropDownStyle={{ backgroundColor: '#fafafa', zIndex: 2, }}
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
              style={{ backgroundColor: '#fafafa', width: screenWidth / 2 - 30 }}
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

          {/*<MyButton onPress={() => alert(selectedState)} />*/}
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
    marginVertical: 16,
    color: 'white',
    fontWeight: 'bold',
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

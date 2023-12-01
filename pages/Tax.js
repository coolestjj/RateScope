import React, {useRef, useState, useEffect} from 'react';
import { Alert, View, Text, StyleSheet, Dimensions } from 'react-native';
import { Input, Icon, Button } from '@rneui/themed';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from "@react-navigation/native";
import { Header } from '@rneui/themed'; // Import Header from your library
import SideMenu from "react-native-side-menu";
import LeftMenu from "../UI/LeftMenu";
import SvgComponent from './map';
import { SelectList } from 'react-native-dropdown-select-list';


export default function RateScope() {
  const screenWidth = Dimensions.get("window").width;
  const navigation = useNavigation();

  // This useState hook is only for side bar control, don't use it elsewhere!
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Auto tax');
  const [selectedState, setSelectedState] = useState('IL');
  // const [pressed, setPressed] = useState(false);
  handleCallback = (childData) => {
    setSelectedState(childData);
  };

  const category = [
    {key:'0', value:'Auto tax'},
    {key:'1', value:'Income tax'},
  ]


  const states = [
    { key: 'AL', value: 'AL' },
    { key: 'AK', value: 'AK' },
    { key: 'AZ', value: 'AZ' },
    { key: 'AR', value: 'AR' },
    { key: 'CA', value: 'CA' },
    { key: 'CO', value: 'CO' },
    { key: 'CT', value: 'CT' },
    { key: 'DE', value: 'DE' },
    { key: 'FL', value: 'FL' },
    { key: 'GA', value: 'GA' },
    { key: 'HI', value: 'HI' },
    { key: 'ID', value: 'ID' },
    { key: 'IL', value: 'IL' },
    { key: 'IN', value: 'IN' },
    { key: 'IA', value: 'IA' },
    { key: 'KS', value: 'KS' },
    { key: 'KY', value: 'KY' },
    { key: 'LA', value: 'LA' },
    { key: 'ME', value: 'ME' },
    { key: 'MD', value: 'MD' },
    { key: 'MA', value: 'MA' },
    { key: 'MI', value: 'MI' },
    { key: 'MN', value: 'MN' },
    { key: 'MS', value: 'MS' },
    { key: 'MO', value: 'MO' },
    { key: 'MT', value: 'MT' },
    { key: 'NE', value: 'NE' },
    { key: 'NV', value: 'NV' },
    { key: 'NH', value: 'NH' },
    { key: 'NJ', value: 'NJ' },
    { key: 'NM', value: 'NM' },
    { key: 'NY', value: 'NY' },
    { key: 'NC', value: 'NC' },
    { key: 'ND', value: 'ND' },
    { key: 'OH', value: 'OH' },
    { key: 'OK', value: 'OK' },
    { key: 'OR', value: 'OR' },
    { key: 'PA', value: 'PA' },
    { key: 'RI', value: 'RI' },
    { key: 'SC', value: 'SC' },
    { key: 'SD', value: 'SD' },
    { key: 'TN', value: 'TN' },
    { key: 'TX', value: 'TX' },
    { key: 'UT', value: 'UT' },
    { key: 'VT', value: 'VT' },
    { key: 'VA', value: 'VA' },
    { key: 'WA', value: 'WA' },
    { key: 'WV', value: 'WV' },
    { key: 'WI', value: 'WI' },
    { key: 'WY', value: 'WY' }
];
  const autoTax = {
      "AL": 5.2,
      "AK": 6.8,
      "AZ": 5.6,
      "AR": 6.9,
      "CA": 7.25,
      "CO": 5.3,
      "CT": 6.35,
      "DE": 6.6,
      "DC": 5.75,
      "FL": 6.0,
      "GA": 7.25,
      "HI": 4.45,
      "ID": 7.25,
      "IL": 4.5,
      "IN": 7.0,
      "IA": 6.0,
      "KS": 6.5,
      "KY": 6.0,
      "LA": 5.0,
      "ME": 5.5,
      "MD": 6.0,
      "MA": 6.65,
      "MI": 4.35,
      "MN": 5.3,
      "MS": 7.0,
      "MO": 5.4,
      "MT": 7.0,
      "NE": 5.5,
      "NV": 7.75,
      "NH": 5.2,
      "NJ": 6.6,
      "NM": 5.1,
      "NY": 4.3,
      "NC": 5.25,
      "ND": 5.0,
      "OH": 5.75,
      "OK": 5.5,
      "OR": 0.0,
      "PA": 6.0,
      "RI": 7.0,
      "SC": 6.0,
      "SD": 4.5,
      "TN": 7.0,
      "TX": 6.15,
      "UT": 4.7,
      "VT": 6.35,
      "VA": 4.3,
      "WA": 6.5,
      "WV": 6.0,
      "WI": 5.32,
      "WY": 5.5,
    };

  const incomeTax = {
      "AL": 5.00,
      "AK": 0.00,
      "AZ": 3.30,
      "AR": 6.00,
      "CA": 9.30,
      "CO": 5.45,
      "CT": 3.0,
      "DE": 3.20,
      "DC": 8.95,
      "FL": 0.00,
      "GA": 6.00,
      "HI": 11.00,
      "ID": 7.0,
      "IL": 4.75,
      "IN": 3.23,
      "IA": 5.38,
      "KS": 5.30,
      "KY": 6.00,
      "LA": 2.00,
      "ME": 8.50,
      "MD": 5.20,
      "MA": 5.00,
      "MI": 4.25,
      "MN": 9.85,
      "MS": 5.00,
      "MO": 5.40,
      "MT": 6.90,
      "NE": 6.84,
      "NV": 0.00,
      "NH": 5.00,
      "NJ": 10.75,
      "NM": 4.90,
      "NY": 6.85,
      "NC": 5.25,
      "ND": 2.46,
      "OH": 5.40,
      "OK": 5.20,
      "OR": 9.90,
      "PA": 3.07,
      "RI": 7.00,
      "SC": 6.00,
      "SD": 0.00,
      "TN": 0.00,
      "TX": 0.00,
      "UT": 5.00,
      "VT": 6.85,
      "VA": 5.75,
      "WA": 0.00,
      "WV": 6.50,
      "WI": 7.65,
      "WY": 2.00,
    };
  
  function calcTax(category, state) {
    if (category === "Auto tax") {
      return autoTax[state];
    } else {
      return incomeTax[state];
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
            <SelectList 
              setSelected={(val) => setSelectedCategory(val)} 
              data={category} 
              save="value"
              placeholder={selectedCategory}
              boxStyles={{borderColor: "white", backgroundColor:"white", width:160}}
              inputStyles={{color:"#358f80", fontWeight: "bold"}}
              dropdownTextStyles={{color:"#358f80", fontWeight: "bold"}}
              dropdownStyles={{borderColor:"#99e2b4", backgroundColor:"white"}}
              search={false}
            />

            {/* Second Dropdown for US States */}
            <SelectList 
              setSelected={(val) => setSelectedState(val)} 
              data={states} 
              save="value"
              placeholder={selectedState}
              boxStyles={{borderColor: "white", backgroundColor:"white", width:80}}
              inputStyles={{color:"#358f80", fontWeight: "bold"}}
              dropdownTextStyles={{color:"#358f80", fontWeight: "bold"}}
              dropdownStyles={{borderColor:"#99e2b4", backgroundColor:"white"}}
              maxHeight={80}
              search={false}
            />
          </View>

          <View style = {{ flex: 1}}><SvgComponent onPress={(val) => {
              setSelectedState(val);
              setIsMenuOpen(false);
          }} pressed={selectedState}/></View>

          <View style={styles.taxBox}>
            <Text style={styles.textTax1}>Tax:</Text>
            <Text style={styles.textTax2}>{calcTax(selectedCategory, selectedState).toFixed(2)}</Text>
          </View>     
          
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
    justifyContent: 'space-evenly',
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
  taxBox: {
    alignItems: "center",
    marginBottom: 30
  },
  textTax1: {
    color: "white",
    fontSize: 40,
    margin: 10,
    fontWeight: "bold"

  },
  textTax2: {
    color: "white",
    fontSize: 40,
    margin: 10,
    textDecorationLine: 'underline',
  }
});

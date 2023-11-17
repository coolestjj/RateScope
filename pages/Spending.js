import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, Dimensions, FlatList } from 'react-native';
import {Input, CheckBox, Header, Icon} from '@rneui/themed'
import {Button} from "@rneui/base";
// import Icon from "react-native-vector-icons/dist/MaterialCommunityIcons";
import {DataTable} from 'react-native-paper';
import {useNavigation} from "@react-navigation/native";
import SideMenu from "react-native-side-menu";
import { FontAwesome } from '@expo/vector-icons'; 

import { SpendingList } from './spending/SpendingList';

function getFormattedDate(date) {
  return date.toISOString().slice(0, 10);
}

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'A pair of shoes',
    amount: 59.99,
    date: new Date('2023-10-19'),
    rate: false,
  },
  {
    id: 'e2',
    description: 'A pair of trousers',
    amount: 89.29,
    date: new Date('2023-10-05'),
    rate: false,
  },
  {
    id: 'e3',
    description: 'Some bananas',
    amount: 5.99,
    date: new Date('2023-10-01'),
    rate: false
  },
  {
    id: 'e4',
    description: 'A book',
    amount: 14.99,
    date: new Date('2023-10-19'),
    rate: true
  },
];

const deviceWidth = Dimensions.get('window').width;
export default function Spending() {
    const navigation = useNavigation();
    // Sample spending data
    const spendingData = [
        {name: 'Car', payment: 2000, optimizer: ['Tax', 'Plan']},
        {name: 'Computer', payment: 2500, optimizer: ['Tax', 'Plan']},
        {name: 'Prime membership', payment: 15, optimizer: ['Tax', 'Plan']},
    ];

    const menu =
    <View style={{flex: 1, justifyContent: 'center'}}>
        <Button title="Personal Profile" onPress={() => navigation.navigate('Personal')} style={{marginBottom: 8}}/>
        <Button title="Main" onPress={() => navigation.navigate('Spending')} style={{marginBottom: 8}}/>
        <Button title="Spending Overview" onPress={() => navigation.navigate('Overview')} style={{marginBottom: 8}}/>
        <Button title="Tax Lookup Map" onPress={() => navigation.navigate('Tax')} style={{marginBottom: 8}}/>
        <Button title="Savings Planner" onPress={() => navigation.navigate('Saving')} style={{marginBottom: 8}}/>

        <View style={{flexDirection: 'row', alignItems: 'center', position:'absolute', bottom: 20, right: 8}}>
            <Text onPress={() => navigation.navigate('Login')}>Logout</Text>
            <Icon name="logout" onPress={() => navigation.navigate('Login')} size={30}/>
        </View>
    </View>
    ;

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <SideMenu menu={menu}
                  isOpen={isMenuOpen}
        >
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <Header
                    leftComponent={<Icon name='menu'
                                         size={30}
                                         onPress={() => setIsMenuOpen(!isMenuOpen)}
                    />}
                    centerComponent={{text: 'RateScope', style: {color: '#fff', fontSize: 20}}}
                    rightComponent={<Icon name='home'
                                          onPress={() => navigation.navigate('Login')}
                                          size={30}/>}
                />

                <View style={styles.summary}>
                    <View style={{margin:4}}>
                        <Text>Oct, 2023</Text>
                    </View>
                    <View style={styles.summaryCircle}>
                        <FontAwesome name="dollar" size={45} color="black" />
                        <Text style={[styles.summaryCircleText, {fontWeight: "bold"}]}>current</Text>
                        <Text style={styles.summaryCircleText}>2850.00</Text>
                    </View>
                    <View style={styles.incomeVSexpense}>
                        <View style={{flex: 1}}>
                            <Text style={[styles.incomeVSexpenseText, {fontWeight: "bold"}]}>income</Text>
                            <Text style={styles.incomeVSexpenseText}>3000.00</Text>
                        </View>
                        <View style={{flex: 1}}>
                            <Text style={[styles.incomeVSexpenseText, {fontWeight: "bold"}]}>expense</Text>
                            <Text style={styles.incomeVSexpenseText}>150.00</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <FlatList
                        data={DUMMY_EXPENSES}
                        renderItem={(itemData) => {
                            return (
                                <View style={styles.items}>
                                    <View>
                                        <Text style={{textAlign:'center', margin: 3, fontSize: 15}}>
                                            {itemData.item.description}
                                        </Text>
                                        <Text style={{margin: 3, fontSize: 10}}>
                                            {getFormattedDate(itemData.item.date)}
                                        </Text>
                                    </View>
                                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                        <Text style={{textAlign:'center', margin: 10}}>
                                                -{itemData.item.amount}
                                        </Text>
                                        <View style={styles.icons}><FontAwesome name="pencil" size={24} color="black" /></View>
                                        <View style={styles.icons}><FontAwesome name="trash" size={24} color="black" /></View>
                                    </View>
                                </View>           
                            );
                        }}
                        keyExtractor={(item) => item.id}
                        />
                </View>

                <View style={{flex:1}}></View>

                <View style={styles.add}>
                    <FontAwesome name="plus-circle" size={60} color="black" />
                </View>

            </View>
        </SideMenu>
    )
}

const styles = StyleSheet.create({
  summary: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryCircle: {
    width: 180,
    height: 180,
    borderWidth: 2,
    borderRadius: 90,
    borderColor: 'black',
    margin: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryCircleText: {
    textAlign: 'center',
    margin: 5,
    fontSize: 20,
  },
  incomeVSexpense: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  incomeVSexpenseText: {
    textAlign: 'center',
    margin: 5,
    fontSize: 20,
  },
  items: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: 'black',
    margin: 4,
  },
  icons: {
    margin: 4,
  },
  add: {
    justifyContent:'center',
    alignItems: 'center',
    bottom: 10,

  }

});
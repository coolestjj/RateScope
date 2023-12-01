import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Dimensions, FlatList} from 'react-native';
import {Header, Icon} from '@rneui/themed'
import {Button} from "@rneui/base";
import {useNavigation} from "@react-navigation/native";
import SideMenu from "react-native-side-menu";
import {FontAwesome} from '@expo/vector-icons';
import IconButton from '../UI/IconButton';

import {SpendingList} from './SpendingList';
import {useContext} from 'react';
import {ExpensesContext} from './context';
import LeftMenu from "../UI/LeftMenu";

const deviceWidth = Dimensions.get('window').width;
export default function Spending() {
    const navigation = useNavigation();
    // Sample spending data
    const expensesCtx = useContext(ExpensesContext);
    let income = 0;
    let expense = 0;
    
    const autoTax = {
      "None": 0.0,   
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
    for (let e of expensesCtx.expenses) {
        if (e.type === "expense") {
            expense += e.amount*(1+autoTax[e.rate]/100);
        } else {
            income += e.amount;
        }
    }


    function expensePressHandler() {
        navigation.navigate('ManageExpense');
    }

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menu =
        <View style={{flex: 1, justifyContent: 'center'}}>
            <Button title="Main" titleStyle={{color: '#67b99a'}} onPress={() => {
                navigation.navigate('Spending');
                setIsMenuOpen(false);
            }}
                    style={styles.sideButton} type='clear'/>
            <Button title="Personal Profile" titleStyle={{color: '#67b99a'}} onPress={() => {
                navigation.navigate('Personal');
                setIsMenuOpen(false);
            }}
                    style={styles.sideButton} type='clear'/>
            <Button title="Spending Overview" titleStyle={{color: '#67b99a'}} onPress={() => {
                navigation.navigate('Overview', { expense: expense });
                setIsMenuOpen(false);
            }}
                    style={styles.sideButton} type='clear'/>
            <Button title="Tax Lookup Map" titleStyle={{color: '#67b99a'}} onPress={() => {
                navigation.navigate('Tax');
                setIsMenuOpen(false);
            }}
                    style={styles.sideButton} type='clear'/>
            <Button title="Savings Planner" titleStyle={{color: '#67b99a'}} onPress={() => {
                navigation.navigate('Saving');
                setIsMenuOpen(false);
            }}
                    style={styles.sideButton} type='clear'/>
            <Button title="Loan Planner" titleStyle={{color: '#67b99a'}} onPress={() => {
                navigation.navigate('Loan');
                setIsMenuOpen(false);
            }}
                    style={styles.sideButton} type='clear'/>
            <View style={{flexDirection: 'row', alignItems: 'center', position: 'absolute', bottom: 20, right: 8}}>
                <Text onPress={() => navigation.navigate('Login')}>Logout</Text>
                <Icon name="logout" onPress={() => navigation.navigate('Login')} size={30}/>
            </View>
        </View>;

    return (
        <SideMenu menu={menu}
                  isOpen={isMenuOpen}>
            <View style={{flex: 1, backgroundColor: '#358f80'}}>
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

                <View style={styles.summary}>
                    <View style={{margin: 4}}>
                        <Text style={{fontSize: 16, color: 'white'}}>Nov, 2023</Text>
                    </View>
                    <View style={styles.summaryCircle}>
                        <FontAwesome name="dollar" size={45} color="#358f80"/>
                        <Text style={[styles.summaryCircleText, {fontWeight: "bold"}]}>current</Text>
                        <Text style={styles.summaryCircleText}>{(income - expense).toFixed(2)}</Text>
                    </View>
                    <View style={styles.incomeVSexpense}>
                        <View style={{flex: 1, margin: 4}}>
                            <Text style={[styles.incomeVSexpenseText, {fontWeight: "bold"}]}>income</Text>
                            <Text style={styles.incomeVSexpenseText}>{income.toFixed(2)}</Text>
                        </View>
                        <View style={{flex: 1, margin: 4}}>
                            <Text style={[styles.incomeVSexpenseText, {fontWeight: "bold"}]}>expense</Text>
                            <Text style={styles.incomeVSexpenseText}>{expense.toFixed(2)}</Text>
                        </View>
                    </View>
                </View>
                <View style={{flex: 1, alignItems: 'center', marginTop: 10}}>
                    <SpendingList expenses={expensesCtx.expenses}/>
                </View>

                <View style={styles.add}>
                    <IconButton icon="plus-circle" size={75} color="white" onPress={expensePressHandler}/>
                </View>

            </View>
        </SideMenu>

    )
}

const styles = StyleSheet.create({
    summary: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#67b99a'
    },
    summaryCircle: {
        width: 180,
        height: 180,
        borderWidth: 1,
        borderRadius: 90,
        borderColor: 'white',
        margin: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
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
        margin: 4,
        fontSize: 20,
        color: "white"
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
        justifyContent: 'center',
        alignItems: 'center',
        color: "white",
        margin: 50,
    },
    sideButton: {
        marginBottom: 8,
    }

});

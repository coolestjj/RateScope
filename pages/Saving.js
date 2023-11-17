import React, {useState} from 'react';
import {Alert, View, Text, StyleSheet, Dimensions} from 'react-native';
import {Input, Header, Icon, Button} from '@rneui/themed';
import DropDownPicker from 'react-native-dropdown-picker';
import {BarChart} from "react-native-chart-kit";
import {useNavigation} from "@react-navigation/native";
import SideMenu from "react-native-side-menu";

export default function Saving() {

    const navigation = useNavigation();
    const menu =
        <View style={{flex: 1, justifyContent: 'center'}}>
            <Button title="Personal Profile" onPress={() => navigation.navigate('Personal')} style={{marginBottom: 8}}/>
            <Button title="Main" onPress={() => navigation.navigate('Spending')} style={{marginBottom: 8}}/>
            <Button title="Spending Overview" onPress={() => navigation.navigate('Overview')}
                    style={{marginBottom: 8}}/>
            <Button title="Tax Lookup Map" onPress={() => navigation.navigate('Tax')} style={{marginBottom: 8}}/>
            <Button title="Savings Planner" onPress={() => navigation.navigate('Saving')} style={{marginBottom: 8}}/>
            <Button title="Loan Planner" onPress={() => navigation.navigate('Loan')} style={{marginBottom: 8}}/>


            <View style={{flexDirection: 'row', alignItems: 'center', position: 'absolute', bottom: 20, right: 8}}>
                <Text onPress={() => navigation.navigate('Login')}>Logout</Text>
                <Icon name="logout" onPress={() => navigation.navigate('Login')} size={30}/>
            </View>
        </View>
    ;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <SideMenu menu={menu}
                  isOpen={isMenuOpen}>
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
            </View>
        </SideMenu>
    )
}
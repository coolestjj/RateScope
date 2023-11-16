import React, {Component, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Input, CheckBox, Header, Icon} from '@rneui/themed'
import {Button} from "@rneui/base";
// import Icon from "react-native-vector-icons/dist/MaterialCommunityIcons";
import {DataTable} from 'react-native-paper';
import {useNavigation} from "@react-navigation/native";
import SideMenu from "react-native-side-menu";

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
                <Text style={{textAlign: 'center'}}>Spending Breakdown</Text>


                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>Spending Name</DataTable.Title>
                        <DataTable.Title>Payment</DataTable.Title>
                        <DataTable.Title>Optimizer</DataTable.Title>
                    </DataTable.Header>

                    <DataTable.Row>
                        <DataTable.Cell style={{flex: 2}}>Car</DataTable.Cell>
                        <DataTable.Cell style={{flex: 1}}>2000</DataTable.Cell>
                        <DataTable.Cell style={{flex: 1}}>
                            <View style={{flexDirection: 'row'}}>
                                <Button title="Tax" style={{marginRight: 10}}/>
                                <Button title="Plan"/>
                            </View>
                        </DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                        <DataTable.Cell style={{flex: 2}}>Computer</DataTable.Cell>
                        <DataTable.Cell style={{flex: 1}}>2500</DataTable.Cell>
                        <DataTable.Cell style={{flex: 1}}>
                            <View style={{flexDirection: 'row'}}>
                                <Button title="Tax" style={{marginRight: 10}}/>
                                <Button title="Plan"/>
                            </View>
                        </DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                        <DataTable.Cell style={{flex: 2}}>Prime membership</DataTable.Cell>
                        <DataTable.Cell style={{flex: 1}}>15</DataTable.Cell>
                        <DataTable.Cell style={{flex: 1}}>
                            <View style={{flexDirection: 'row'}}>
                                <Button title="Tax" style={{marginRight: 10}}/>
                                <Button title="Plan"/>
                            </View>
                        </DataTable.Cell>
                    </DataTable.Row>

                </DataTable>

                <Button

                    buttonStyle={{width: 150}}
                    containerStyle={{margin: 5, position: 'absolute', bottom: 5, right: 5}}
                    disabledStyle={{
                        borderWidth: 2,
                        borderColor: "#00ff2a"
                    }}
                    disabledTitleStyle={{color: "#006fff"}}
                    linearGradientProps={null}
                    icon={
                        <Icon name="arrow-right"
                              size={15}
                              color="#006FFFFF"/>
                    }
                    iconContainerStyle={{background: "#00ff2a"}}
                    iconRight
                    loadingProps={{animating: true}}
                    loadingStyle={{}}
                    // navigate to Spending
                    onPress={() => navigation.navigate('Overview', {spendingData})}
                    title="Start Planing"
                    titleProps={{}}
                    titleStyle={{marginHorizontal: 5}}
                    type="clear"
                />

            </View>
        </SideMenu>
    )
}


import React, {Component, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Input, CheckBox, Header, Icon} from '@rneui/themed'
import {Button} from "@rneui/base";
// import Icon from "react-native-vector-icons/dist/MaterialCommunityIcons";
import {DataTable} from 'react-native-paper';
import {useNavigation} from "@react-navigation/native";
export default function Spending() {

    const navigation = useNavigation();

    return (
        <>
            <Header
                leftComponent={<Icon name='menu'
                                     onPress={() => this.props.navigation.openDrawer()}
                                     size={30}/>}
                centerComponent={{text: 'RateScope', style: {color: '#fff', fontSize: 20}}}
                rightComponent={<Icon name='home'
                                      onPress={() => navigation.navigate('Login')}
                                      size={30}/>}
            />

            <Text style={{textAlign: 'center'}}>Spending Breakdown</Text>

            {/*<SearchBar*/}
            {/*    placeholder="Type Here..."*/}
            {/*    onChangeText={updateSearch}*/}
            {/*    value={search}*/}
            {/*/>*/}

            <DataTable>
                <DataTable.Header>
                    <DataTable.Title >Spending Name</DataTable.Title>
                    <DataTable.Title >Payment</DataTable.Title>
                    <DataTable.Title >Optimizer</DataTable.Title>
                </DataTable.Header>

                <DataTable.Row>
                    <DataTable.Cell>Car</DataTable.Cell>
                    <DataTable.Cell>2000</DataTable.Cell>
                    <DataTable.Cell>
                        <Button title="Tax" style={{ marginRight: 10 }}/>
                        <Button title="Plan"/>
                    </DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                    <DataTable.Cell>Computer</DataTable.Cell>
                    <DataTable.Cell>2500</DataTable.Cell>
                    <DataTable.Cell>
                        <Button title="Tax" style={{ marginRight: 10 }}/>
                        <Button title="Plan"/>
                    </DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                    <DataTable.Cell>Prime membership</DataTable.Cell>
                    <DataTable.Cell>15</DataTable.Cell>
                    <DataTable.Cell>
                        <Button title="Tax" style={{ marginRight: 10 }}/>
                        <Button title="Plan"/>
                    </DataTable.Cell>
                </DataTable.Row>

            </DataTable>

            <Button
                buttonStyle={{width: 150}}
                containerStyle={{margin: 5}}
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
                onPress={() => navigation.navigate('Overview')}
                title="Start Planing"
                titleProps={{}}
                titleStyle={{marginHorizontal: 5}}
                type="clear"
            />


        </>
    )
}


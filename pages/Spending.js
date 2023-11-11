import React, {Component, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Input, CheckBox, Header, Icon} from '@rneui/themed'
import {Button} from "@rneui/base";
// import Icon from "react-native-vector-icons/dist/MaterialCommunityIcons";

export default function Spending() {
    return (
        <>
            <Header
                leftComponent={<Icon name='menu'
                                     onPress={() => this.props.navigation.openDrawer()}
                                     size={30}/>}
                centerComponent={{text: 'RateScope', style: {color: '#fff', fontSize: 20}}}
                rightComponent={<Icon name='home'
                                      onPress={() => this.props.navigation.navigate('Home')}
                                      size={30}/>}
            />

            <Text>Spending Breakdown</Text>

            {/*<SearchBar*/}
            {/*    placeholder="Type Here..."*/}
            {/*    onChangeText={updateSearch}*/}
            {/*    value={search}*/}
            {/*/>*/}





        </>
    )
}


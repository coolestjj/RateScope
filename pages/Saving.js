import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Input, CheckBox, Header, Icon} from '@rneui/themed'
import {Button} from "@rneui/base";
import DropDownPicker from 'react-native-dropdown-picker';
import {BarChart} from "react-native-chart-kit";
import {useNavigation} from "@react-navigation/native";

export default function Saving() {

    const screenWidth = Dimensions.get("window").width;

    const navigation = useNavigation();

    const mydata = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43]
            }
        ]
    };

    const chartConfig = {
        backgroundGradientFrom: '#fff',
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: '#fff',
        backgroundGradientToOpacity: 0.5,
        fillShadowGradientOpacity: 1,
        color: (opacity = 1) => `#023047`,
        labelColor: (opacity = 1) => `#333`,
        strokeWidth: 2,

        barPercentage: 0.5,
        useShadowColorFromDataset: false,
        decimalPlaces: 0,
    };

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

            <Text style={{textAlign: 'center'}}>Saving Planner</Text>

            <BarChart
                data={mydata}
                width={screenWidth}
                height={220}
                yAxisLabel="$"
                chartConfig={chartConfig}
                verticalLabelRotation={30}
            />
        </>
    )
}
import React, {Component, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Input, CheckBox, Header, Icon} from '@rneui/themed'
import {Button} from "@rneui/base";
import DropDownPicker from 'react-native-dropdown-picker';
import PieChart from "react-native-pie-chart";
import {useNavigation} from "@react-navigation/native";

export default function Overview() {

    const navigation = useNavigation();

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'This month', value: 'monthly'},
        {label: 'This year', value: 'yearly'},
        {label: 'Historical accumulation', value: 'total'},
    ]);

    const widthAndHeight = 250
    const series = [100, 200, 300]
    const sliceColor = ['#fbd203', '#ffb300', '#ff9100']

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

            <Text style={{textAlign: 'center'}}>Spending Overview</Text>


            <DropDownPicker open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
            />

            <PieChart widthAndHeight={widthAndHeight} series={series} sliceColor={sliceColor} />

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
                onPress={() => navigation.navigate('Saving')}
                title="Start Planing"
                titleProps={{}}
                titleStyle={{marginHorizontal: 5}}
                type="clear"
            />

        </>
    )

}
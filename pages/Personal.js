import React, {Component, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Input, CheckBox, Header, Icon} from '@rneui/themed'
import {Button} from "@rneui/base";
// import Icon from "react-native-vector-icons/dist/MaterialCommunityIcons";
import DropDownPicker from 'react-native-dropdown-picker';
import {useNavigation} from '@react-navigation/native';
import SideMenu from "react-native-side-menu";

export default function Personal() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'Hourly', value: 'hourly'},
        {label: 'Daily', value: 'daily'},
        {label: 'Weekly', value: 'weekly'},
        {label: 'Monthly', value: 'monthly'},
        {label: 'Yearly', value: 'yearly'}
    ]);

    const navigation = useNavigation();
    const menu =
        <View style={{flex: 1, justifyContent: 'center'}}>
            <Button title="Personal Profile" onPress={() => navigation.navigate('Personal')} style={{marginBottom: 8}}/>
            <Button title="Main" onPress={() => navigation.navigate('Spending')} style={{marginBottom: 8}}/>
            <Button title="Spending Overview" onPress={() => navigation.navigate('Overview')}
                    style={{marginBottom: 8}}/>
            <Button title="Savings Planner" onPress={() => navigation.navigate('Saving')} style={{marginBottom: 8}}/>


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

                <View style={styles.container}>

                    <View style={styles.content}>
                        <Text>Personal Profile</Text>

                    </View>

                    <View style={styles.content}>
                        <Text>Income</Text>
                        <Input
                            placeholder='Income'
                            keyboardType='numeric'
                        />
                    </View>

                    <View style={styles.content}>
                        <Text>Zip Code</Text>
                        <Input
                            placeholder='Zip Code'
                            keyboardType='numeric'
                        />
                    </View>

                    <View style={styles.content}>
                        <Text>Planning Cycle</Text>
                        <DropDownPicker open={open}
                                        value={value}
                                        items={items}
                                        setOpen={setOpen}
                                        setValue={setValue}
                                        setItems={setItems}
                        />
                    </View>


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
                        onPress={() => navigation.navigate('Spending')}
                        title="Start Planing"
                        titleProps={{}}
                        titleStyle={{marginHorizontal: 5}}
                        type="clear"
                    />
                </View>
            </View>
        </SideMenu>
    )

}

const styles = StyleSheet.create({
    container: {},
    content: {zIndex:1}
})
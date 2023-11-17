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

                <View style={styles.container}>

                    <View style={styles.content}>
                        <Text style={{fontWeight:'bold', fontSize: 20}}>Personal Profile</Text>

                    </View>

                    <View style={styles.content}>
                        <View>
                            <Text style={{textAlign:'center',margin:15}}>Income</Text>
                        </View>
                        <View>
                            <Input
                            placeholder='Income'
                            keyboardType='numeric'
                            inputContainerStyle={{width:100}}
                            />
                        </View>
    
                    </View>

                    <View style={styles.content}>
                        <View>
                            <Text style={{textAlign:'center',margin:15}}>Zip Code</Text>
                        </View>
                        <View>
                            <Input
                            placeholder='Zip Code'
                            keyboardType='numeric'
                            inputContainerStyle={{width:100}}
                            />
                        </View>
        
                    </View>

                    <View style={styles.content}>
                        <Text style={{margin:15}}>Planning Cycle</Text>
                        <DropDownPicker open={open}
                                        value={value}
                                        items={items}
                                        setOpen={setOpen}
                                        setValue={setValue}
                                        setItems={setItems}
                                        containerStyle={{width:100}}
                        />
                    </View>
                </View>

                <Button
                    containerStyle={{margin: 5, alignItems:'center', bottom: 20, right: 8, position:'absolute'}}
                    disabledTitleStyle={{color: "#006fff"}}
                    icon={
                        <Icon name="arrow-right"
                              size={15}
                              color="#006FFFFF"/>
                    }
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
        </SideMenu>
    )

}

const styles = StyleSheet.create({
    container: {
        justifyContent:'center',
    },
    content: {
        zIndex:1,
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 10
    }
})
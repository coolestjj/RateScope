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
            <Button title="Main" onPress={() => {navigation.navigate('Spending'); setIsMenuOpen(false);}}
                    style={{marginBottom: 8}} type='clear'/>
            <Button title="Personal Profile" onPress={() => {navigation.navigate('Personal'); setIsMenuOpen(false);}}
                    style={{marginBottom: 8}} type='clear'/>
            <Button title="Spending Overview" onPress={() => {navigation.navigate('Overview'); setIsMenuOpen(false);}}
                    style={{marginBottom: 8}} type='clear'/>
            <Button title="Tax Lookup Map" onPress={() => {navigation.navigate('Tax'); setIsMenuOpen(false);}}
                    style={{marginBottom: 8}} type='clear'/>
            <Button title="Savings Planner" onPress={() => {navigation.navigate('Saving'); setIsMenuOpen(false);}}
                    style={{marginBottom: 8}} type='clear'/>
            <Button title="Loan Planner" onPress={() => {navigation.navigate('Loan'); setIsMenuOpen(false);}}
                    style={{marginBottom: 8}} type='clear'/>
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
            <View style={{flex: 1, backgroundColor: '#67b99a'}}>
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

                <View style={styles.container}>

                    <View style={styles.content}>
                        <Text style={{fontWeight:'bold', fontSize: 20,
                            color: "white", marginVertical: 16}}>
                            Personal Profile
                        </Text>

                    </View>

                    <View style={styles.content}>
                        <View>
                            <Text style={{textAlign:'center',margin:15, color: "white"}}>
                                Income
                            </Text>
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
                            <Text style={{textAlign:'center',margin:15, color: "white"}}>
                                Zip Code
                            </Text>
                        </View>
                        <View>
                            <Input
                            placeholder='Zip Code'
                            keyboardType='numeric'
                            inputContainerStyle={{width:100}}
                            maxLength={5}
                            />
                        </View>
        
                    </View>

                    <View style={{alignItems: 'center'}}>
                        {/*<Text style={{margin:20}}>Planning Cycle</Text>*/}
                        <DropDownPicker open={open}
                                        value={value}
                                        items={items}
                                        setOpen={setOpen}
                                        setValue={setValue}
                                        setItems={setItems}
                                        containerStyle={{width:'80%'}}
                                        placeholder="Select a planning cycle"
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
        margin: 10,
    }
})
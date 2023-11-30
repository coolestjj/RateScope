import React, {Component, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Input, CheckBox, Header, Icon} from '@rneui/themed'
import {Button} from "@rneui/base";
// import Icon from "react-native-vector-icons/dist/MaterialCommunityIcons";
import DropDownPicker from 'react-native-dropdown-picker';
import {useNavigation} from '@react-navigation/native';
import SideMenu from "react-native-side-menu";
import LeftMenu from "../UI/LeftMenu";
import MyButton from "../UI/MyButton";

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
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <SideMenu menu={<LeftMenu setIsMenuOpen={() => setIsMenuOpen(false)}/>} isOpen={isMenuOpen}>
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
                        <Text style={{
                            fontWeight: 'bold', fontSize: 20,
                            color: "white", marginVertical: 16
                        }}>
                            Personal Profile
                        </Text>

                    </View>

                    <View style={styles.content}>
                        <View>
                            <Input label="Income:"
                                   labelStyle={{color: 'white'}}
                                   placeholder='$'
                                   keyboardType='numeric'
                                   inputContainerStyle={{width: 100}}
                            />
                        </View>


                        <View>
                            <Input label="Zip Code:"
                                   labelStyle={{color: 'white'}}
                                   placeholder='5 digits'
                                   keyboardType='numeric'
                                   inputContainerStyle={{width: 100}}
                                   maxLength={5}
                            />
                        </View>

                    </View>

                    <View style={{alignItems: 'center', zIndex: 2}}>
                        {/*<Text style={{margin:20}}>Planning Cycle</Text>*/}
                        <DropDownPicker open={open}
                                        value={value}
                                        items={items}
                                        setOpen={setOpen}
                                        setValue={setValue}
                                        setItems={setItems}
                                        containerStyle={{width: '80%'}}
                                        placeholder="Select a planning cycle"
                                        dropDownStyle={{backgroundColor: '#fafafa', zIndex: 2,}}
                        />
                    </View>
                </View>

                <MyButton style={styles.button} onPress={() => {
                    navigation.navigate('Spending');
                    setIsMenuOpen(false);
                }}>
                    Start planning
                </MyButton>
            </View>
        </SideMenu>
    )

}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        zIndex: 2,
    },
    content: {
        zIndex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 10,
    },
    button: {
        minWidth: 200,
        marginHorizontal: 8,
        marginTop: 30,
        alignSelf: 'center',
        zIndex: 1,
    }
})
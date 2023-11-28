import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Input, CheckBox, Icon, Header} from '@rneui/themed'
import {Button} from "@rneui/base";
import {NavigationContainer, useNavigation} from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
export default function Login() {
    const navigation = useNavigation();
    const [checked, setChecked] = React.useState(false);
    const toggleCheckbox = () => setChecked(!checked);
    return (
        <>
            <Header
                barStyle="default"
                centerComponent={{
                    text: "RateScope",
                    style: {color: "#fff", fontSize: windowWidth / 12},
                }}
                placement="center"

            />

            <View style={styles.container}>


                <Input placeholder='Email'/>

                <Input placeholder='Password' secureTextEntry={true}/>

                <CheckBox
                    title='Remember me'
                    checked={checked}
                    onPress={toggleCheckbox}
                    iconType="material-community"
                    checkedIcon="checkbox-outline"
                    uncheckedIcon={'checkbox-blank-outline'}
                />

                <View style={styles.forget}>
                    <Text style={{textAlign: 'right', textDecorationLine: 'underline'}}
                          onPress={() => navigation.navigate('Forgot')}>
                        Forgot your password?
                    </Text>
                </View>

                <Button title="Login"
                        buttonStyle={{
                            backgroundColor: "rgba(92, 99,216, 1)",
                            borderRadius: 5,
                        }}
                        containerStyle={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginVertical: 30
                        }}
                        onPress={() => navigation.navigate('Spending')}
                />

                <Text style={{textAlign: 'center', textDecorationLine: 'underline'}}
                      onPress={() => navigation.navigate('Register')}>
                    Don't have an account? Sign up!
                </Text>



            </View>
        </>

    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 100,
        paddingHorizontal: 10,
    },
    forget: {
        alignSelf: 'flex-end',
        marginBottom: 10,
    }
})
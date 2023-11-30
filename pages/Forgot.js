import React, {useState, Component} from 'react';
import {View, Text, StyleSheet, Dimensions, Alert} from 'react-native';
import {Input, CheckBox, Icon, Header} from '@rneui/themed'
import {Button} from "@rneui/base";
import {NavigationContainer, useNavigation} from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

export default function Forgot() {
    const navigation = useNavigation();
    const [verificationCode, setVerificationCode] = useState('');
    const validateInput = () => {
        if (verificationCode.length !== 6 || isNaN(verificationCode)) {
            alert('Please enter a 6 digits verification code');
            return;
        }
        navigation.navigate('Reset');
    };
    return (
        <>
            <Header
                barStyle="default"
                centerComponent={{
                    text: "RateScope",
                    style: {color: "#fff", fontSize: windowWidth / 12},
                }}
                placement="center"
                backgroundColor="#358f80"
            />

            <View style={styles.container}>
                <Text style={{textAlign: 'center', fontWeight: 'bold', color: "rgba(92, 99,216, 1)", marginBottom: 20, fontSize: 20}}>
                    Email verification sent!
                </Text>

                <Input placeholder='6 Digits Verification Code' keyboardType='numeric' maxLength={6} onChangeText={setVerificationCode}/>

                <Button title="Reset password"
                        onPress={validateInput}
                        containerStyle={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginVertical: 30,
                        }}
                        buttonStyle={{
                            backgroundColor: "rgba(92, 99,216, 1)",
                            borderRadius: 5,
                        }}
                />

                <Button
                    buttonStyle={styles.backButton}
                    containerStyle={styles.buttonContainer}
                    icon={<Icon name='arrow-left' size={15} color='#006FFFFF'/>}
                    iconContainerStyle={{backgroundColor: '#ff3d00'}}
                    iconRight
                    onPress={() => navigation.navigate('Login')}
                    title='Go Back'
                    type='clear'
                />
            </View>
        </>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 100,
        paddingHorizontal: 10,
    },
})
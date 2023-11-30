import React, {useState, Component} from 'react';
import {View, Text, StyleSheet, Dimensions, Alert} from 'react-native';
import {Input, CheckBox, Icon, Header} from '@rneui/themed'
import {Button} from "@rneui/base";
import {NavigationContainer, useNavigation} from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

export default function Reset() {
    const navigation = useNavigation();
    const [password, setPassword] = useState({ value: '', error: '' });
    const [confirmPassword, setConfirmPassword] = useState({ value: '', error: '' });
    const validateInput = () => {
        let isValid = true
        if (password.value.length < 8) {
            setPassword({ ...password, error: 'Password requires at least 8 characters' });
            isValid = false;
        }
        if (password.value !== confirmPassword.value) {
            setConfirmPassword({ ...confirmPassword, error: 'Make sure you type the same password as above' });
            isValid = false;
        }
        if (!isValid) {
            return;
        }
        navigation.navigate('Login');
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
                <Input placeholder='Reset password'
                       onChangeText={(text) => setPassword({ value: text, error: '' })}
                       secureTextEntry={true}/>
                {password.error ? <Text style={{ color: 'red' }}>{password.error}</Text> : null}

                <Input placeholder='Confirm password'
                       onChangeText={(text) => setConfirmPassword({ value: text, error: '' })}
                       secureTextEntry={true}/>
                {confirmPassword.error ? <Text style={{ color: 'red' }}>{confirmPassword.error}</Text> : null}

                <Button title="Confirm"
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
                    onPress={() => navigation.navigate('Forgot')}
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
    }
})
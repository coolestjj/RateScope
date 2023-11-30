import React, {useState, Component} from 'react';
import {View, Text, StyleSheet, Dimensions, Alert} from 'react-native';
import {Input, CheckBox, Icon, Header} from '@rneui/themed'
import {Button} from "@rneui/base";
import {NavigationContainer, useNavigation} from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
export default function Register() {

    const navigation = useNavigation();
    const [username, setUsername] = useState({ value: '', error: '' });
    const [email, setEmail] = useState({ value: '', error: '' });
    const [password, setPassword] = useState({ value: '', error: '' });
    const [confirmPassword, setConfirmPassword] = useState({ value: '', error: '' });
    const validateInput = () => {
        const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        let isValid = true
        if (!emailRegex.test(email.value)) {
            setEmail({ ...email, error: 'Please enter a valid email' });
            isValid = false;
        }
        if (username.value.trim() === '') {
            setUsername({ ...username, error: 'Username cannot be empty' });
            isValid = false;
        }
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

        navigation.navigate('Personal');
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


                <Input placeholder='Email'
                       onChangeText={(text) => setEmail({ value: text, error: '' })}/>
                {email.error ? <Text style={{ color: 'red' }}>{email.error}</Text> : null}

                <Input placeholder='Username'
                       onChangeText={(text) => setUsername({ value: text, error: '' })}/>
                {username.error ? <Text style={{ color: 'red' }}>{username.error}</Text> : null}

                <Input placeholder='Password'
                       onChangeText={(text) => setPassword({ value: text, error: '' })}
                       secureTextEntry={true}/>
                {password.error ? <Text style={{ color: 'red' }}>{password.error}</Text> : null}

                <Input placeholder='Confirm password'
                       onChangeText={(text) => setConfirmPassword({ value: text, error: '' })}
                       secureTextEntry={true}/>
                {confirmPassword.error ? <Text style={{ color: 'red' }}>{confirmPassword.error}</Text> : null}

                <Button title="Join"
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

    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 100,
        paddingHorizontal: 10,
    }
})
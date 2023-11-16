import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Input, CheckBox, Icon, Header} from '@rneui/themed'
import {Button} from "@rneui/base";
import {NavigationContainer} from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
export default class Register extends Component {
    render() {
        return (
            <>
                <Header

                    backgroundColor="green"
                    backgroundImageStyle={{}}
                    barStyle="default"
                    centerComponent={{
                        text: "RateScope",
                        style: {color: "#fff", fontSize: windowWidth / 12},
                    }}
                    centerContainerStyle={{}}
                    containerStyle={{}}
                    // leftComponent={{ icon: "menu", color: "#fff" }}
                    leftContainerStyle={{}}
                    linearGradientProps={{}}
                    placement="center"
                    // rightComponent={{ icon: "home", color: "#fff" }}
                    rightContainerStyle={{}}
                    statusBarProps={{}}

                />

                <View style={styles.container}>


                    <Input placeholder='Email'/>

                    <Input placeholder='Username'/>

                    <Input placeholder='Password' secureTextEntry={true}/>

                    <Input placeholder='Confirm password' secureTextEntry={true}/>

                    <Button title="Join"
                            onPress={() => this.props.navigation.navigate('Login')}
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

                </View>
            </>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 100,
        paddingHorizontal: 10,
    }
})
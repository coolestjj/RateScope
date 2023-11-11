import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Input, CheckBox, Icon, Header} from '@rneui/themed'
import {Button} from "@rneui/base";
import {NavigationContainer} from '@react-navigation/native';

export default class Login extends Component {
    render() {
        return (
            <>
                <Header
                    backgroundColor="green"
                    backgroundImageStyle={{}}
                    barStyle="default"
                    centerComponent={{
                        text: "RateScope",
                        style: {color: "#fff", fontSize: 40},
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

                    <Input placeholder='Password' secureTextEntry={true}/>

                    <CheckBox title='Remember password'/>

                    <Button title="Login"
                            buttonStyle={{
                                backgroundColor: "rgba(92, 99,216, 1)",
                                borderRadius: 5,
                            }}
                            containerStyle={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginVertical: 10
                            }}
                            onPress={() => this.props.navigation.navigate('Personal')}
                    />

                    <Text style={{textAlign: 'center', textDecorationLine: 'underline'}}
                          onPress={'#'}>
                        Forgot your password?
                    </Text>


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
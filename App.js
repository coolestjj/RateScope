import * as React from 'react';
import Login from './pages/Login'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Personal from "./pages/Personal";
import Spending from "./pages/Spending";
import {View, Text, LogBox} from "react-native";
import Overview from "./pages/Overview";
import Loan from "./pages/Loan";
import Tax from "./pages/Tax";

import Loan from "./pages/Loan";

import Register from "./pages/Register";
import ExpensesContextProvider from './pages/context';

// import Menu from "./pages/Menu";

import Register from "./pages/Register";
import Saving from "./pages/Saving";


LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator();
export default function App() {
    return (
        <ExpensesContextProvider>
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={Login}  options={{ headerShown: false }}/>
                <Stack.Screen name="Personal" component={Personal} options={{ headerShown: false }}/>
                <Stack.Screen name="Spending" component={Spending} options={{ headerShown: false }}/>
                <Stack.Screen name="Overview" component={Overview} options={{ headerShown: false }}/>
                <Stack.Screen name="Loan" component={Loan} options={{ headerShown: false }}/>
                <Stack.Screen name="Tax" component={Tax} options={{ headerShown: false }}/>
                <Stack.Screen name="Loan" component={Loan} options={{ headerShown: false }}/>
                <Stack.Screen name="Saving" component={Saving} options={{ headerShown: false }}/>

                <Stack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
            </Stack.Navigator>
        </NavigationContainer>
        </ExpensesContextProvider>
    );
}

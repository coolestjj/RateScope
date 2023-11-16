import React, { useState, useEffect } from 'react';
import { Alert, View, Text, StyleSheet, Dimensions } from 'react-native';
import { Input, Header, Icon, Button } from '@rneui/themed';
import DropDownPicker from 'react-native-dropdown-picker';
import Svg, { Rect, Circle } from 'react-native-svg'; // Import SVG components
import { useNavigation } from "@react-navigation/native";

export default function RateScope() {
    const screenWidth = Dimensions.get("window").width;
    const navigation = useNavigation();

    // Initialize state variables with default values
    const [selectedCategory, setSelectedCategory] = useState('autoTax'); // Set default tax category to 'Auto Loan'
    const [selectedState, setSelectedState] = useState('IL'); // Set default state to 'Illinois'

    const taxCategories = [
        { label: 'Auto Tax', value: 'autoTax' },
        { label: 'Income Tax', value: 'incomeTax' },
        // Add more tax categories as needed
    ];

    const usStates = [
        { label: 'Alabama', value: 'AL' },
        { label: 'Alaska', value: 'AK' },
        // Add more states as needed
        { label: 'Illinois', value: 'IL' },
    ];

    // Sample hardcoded heatmap data (for demonstration purposes)
    const heatmapData = [
        { state: 'IL', value: 6.25 },
        { state: 'WI', value: 5.5 },
        { state: 'IN', value: 5.8 },
        // Add more data as needed
    ];

    return (
        <>
            <Header
                leftComponent={<Icon name='menu' onPress={() => navigation.openDrawer()} size={30} />}
                centerComponent={{ text: 'RateScope', style: { color: '#fff', fontSize: 20 } }}
                rightComponent={<Icon name='home' onPress={() => navigation.navigate('Login')} size={30} />}
            />

            <View style={styles.container}>
                <Text style={styles.title}>Tax Lookup</Text>

                <View style={styles.dropdownContainer}>
                    <DropDownPicker
                        items={taxCategories}
                        placeholder="Select Tax Category"
                        defaultValue={selectedCategory}
                        containerStyle={{ height: 40, width: screenWidth / 2 - 15 }}
                        style={{ backgroundColor: '#fafafa', zIndex: 1000 }}
                        itemStyle={{ justifyContent: 'flex-start' }}
                        dropDownStyle={{ backgroundColor: '#fafafa' }}
                        onChangeItem={(item) => setSelectedCategory(item.value)}
                    />

                    <DropDownPicker
                        items={usStates}
                        placeholder="Select State"
                        defaultValue={selectedState}
                        containerStyle={{ height: 40, width: screenWidth / 2 - 15 }}
                        style={{ backgroundColor: '#fafafa', zIndex: 1000 }}
                        itemStyle={{ justifyContent: 'flex-start' }}
                        dropDownStyle={{ backgroundColor: '#fafafa' }}
                        onChangeItem={(item) => setSelectedState(item.value)}
                    />
                </View>

                {/* Hardcoded heatmap for demonstration purposes */}
                <Svg height="100" width={screenWidth - 20}>
                    {heatmapData.map((item) => (
                        <Circle
                            key={item.state}
                            cx={(item.value - 5) * 50} // Adjust x-coordinate based on value
                            cy="50"
                            r="10"
                            fill="#ff0000" // Red color (you can adjust colors based on values)
                        />
                    ))}
                </Svg>

                {/* Display the text view with a value of 6.25% */}
                <View style={styles.bottomContainer}>
                    <Text style={styles.bottomText}>{`Tax Rate: 6.25%`}</Text>
                </View>
            </View>

            <View style={styles.backButtonContainer}>
                <Button
                    buttonStyle={styles.backButton}
                    containerStyle={styles.buttonContainer}
                    icon={<Icon name='arrow-left' size={15} color='#006FFFFF' />}
                    iconContainerStyle={{ backgroundColor: '#ff3d00' }}
                    iconRight
                    onPress={() => navigation.navigate('Spending')}
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
        padding: 20,
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        marginVertical: 20,
    },
    dropdownContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    bottomContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    bottomText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    backButtonContainer: {
        position: 'absolute',
        left: 20,
        bottom: 20,
    },
    // ... other styles
});

import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Header, Icon, Button} from '@rneui/themed';
import DropDownPicker from 'react-native-dropdown-picker';
import PieChart from 'react-native-pie-chart';
import {useNavigation, useRoute} from '@react-navigation/native';
import SideMenu from "react-native-side-menu";
import LeftMenu from "../UI/LeftMenu";
import {ExpensesContext} from "./context";
import MyButton from "../UI/MyButton";

const Overview = () => {
    const navigation = useNavigation();
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'This month', value: 'monthly'},
        {label: 'This year', value: 'yearly'},
        {label: 'Historical accumulation', value: 'total'},
    ]);

    const {expenses} = useContext(ExpensesContext);
    const [series, setSeries] = useState([])
    const [sliceColor, setSliceColor] = useState(['#FF0000', '#FFA500', '#FF1493',  '#FFFF00']);
    const [totalPayment, setTotalPayment] = useState(0);
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const expenseItems = expenses.filter((expense) => expense.type === 'expense');
        const total = expenseItems.reduce((sum, current) => sum + current.amount, 0);
        setTotalPayment(total.toFixed(2));
        const categories = [...new Set(expenseItems.map((expense) => expense.category))];
        setCategories(categories);
        let amounts = categories.map(
            (category) =>
                expenseItems
                    .filter((expense) => expense.category === category)
                    .reduce((sum, current) => sum + current.amount, 0)
        );
        if (amounts.every((amount) => amount === 0) || amounts.length === 0) {
            amounts = [1];
        }
        setSeries(amounts);
        setSliceColor(sliceColor.slice(0, amounts.length));
        setLoading(false);
    }, [expenses]);

    const [spendingData, setSpendingData] = useState([]);

    const widthAndHeight = 250;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    if (loading) {
        return <Text>Loading...</Text>;
    }

    return (
        <SideMenu menu={<LeftMenu setIsMenuOpen={()=>setIsMenuOpen(false)}/>} isOpen={isMenuOpen}>
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

                <ScrollView contentContainerStyle={styles.container}>

                    <Text style={styles.pageTitle}>Spending Overview</Text>

                    <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        containerStyle={styles.dropdownContainer}
                        onPress={() => setIsMenuOpen(false)}
                        placeholder="Select a time period"
                    />

                    <View style={styles.chartContainer}>
                        <PieChart widthAndHeight={widthAndHeight}
                                  series={series}
                                  sliceColor={sliceColor}/>
                        <View style={styles.legend}>
                            {categories.map((category, index) => (
                                <View key={index} style={styles.legendItem}>
                                    <View style={[styles.legendColor, { backgroundColor: sliceColor[index] }]} />
                                    <Text style={styles.legendText}>{category}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    <Text style={styles.totalPaymentText}>
                        Total Payment: {totalPayment}
                    </Text>

                    <MyButton style={styles.startSavingButton} onPress={() => {
                        navigation.navigate('Saving');
                        setIsMenuOpen(false);
                    }}>
                        Start saving
                    </MyButton>

                </ScrollView>
            </View>
        </SideMenu>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',

        padding: 16,
    },
    legend: {
        flexDirection: 'row', // Align items horizontally
        flexWrap: 'wrap', // Allow items to wrap to the next line
        justifyContent: 'center', // Center items horizontally
        marginTop: 20,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginRight: 20, // Add spacing between items
    },
    legendColor: {
        width: 20,
        height: 20,
        marginRight: 5, // Adjust the spacing between color and text
    },
    legendText: {
        fontSize: 16,
    },
    pageTitle: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 16,
        color: "white"
    },
    dropdownContainer: {
        width: '80%',
        marginVertical: 16,
    },
    chartContainer: {
        alignItems: 'center',
        marginVertical: 16,
    },
    startSavingButton: {
        minWidth: 200,
        marginHorizontal: 8,
        marginTop: 30,
        alignSelf: 'center',
        zIndex: 1,
    },
    buttonContainer: {
        marginVertical: 8,
    },
    totalPaymentText: {
        fontSize: 18,
        fontWeight: 'bold', // Add bold styling
        marginTop: 20, // Add marginTop for spacing
    },
});

export default Overview;
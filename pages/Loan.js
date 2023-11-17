import React, { useState, useCallback } from 'react';
import {Alert, View, Text, StyleSheet, Dimensions} from 'react-native';
import {Input, Header, Icon, Button} from '@rneui/themed';
import DropDownPicker from 'react-native-dropdown-picker';
import {BarChart} from "react-native-chart-kit";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import SideMenu from "react-native-side-menu";

export default function Loan() {
    const screenWidth = Dimensions.get("window").width;
    const navigation = useNavigation();

    // 初始化状态变量
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    useFocusEffect(
        useCallback(() => {
            setIsMenuOpen(false);
        }, [])
    );
    const [bestPayment, setBestPayment] = useState(null);
    const [ficoScore, setFicoScore] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [downPayment, setDownPayment] = useState('');
    const [totalAmount, setTotalAmount] = useState('');
    const [data, setData] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const chartConfig = {
        backgroundGradientFrom: "#fff",
        backgroundGradientTo: "#fff",
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        labelColor: (opacity = 1) => `#6a6a6a`,
        strokeWidth: 2,
        barPercentage: 0.8,
    };
    const [timeUnit, setTimeUnit] = useState(null); // 新状态变量

    const generateRandomData = () => {
        if (totalAmount.trim() === '') {
            Alert.alert('Missing Information', 'Please input your Total Amount.');
            return;
        }
        if (ficoScore.trim() === '') {
            Alert.alert('Missing Information', 'Please input your FICO Score.');
            return;
        }
        if (downPayment.trim() === '') {
            Alert.alert('Missing Information', 'Please input your Down Payment.');
            return;
        }
        if (selectedOption.trim() === '') {
            Alert.alert('Missing Information', 'Please input your Loan Term.');
            return;
        }
        if (parseFloat(totalAmount) - parseFloat(downPayment) <= 0) {
            Alert.alert('Wrong Input', 'Please make sure your Down Payment is lower than Total Loan Amount.');
            setBestPayment(null)
            setTimeUnit(null)
            return;
        }
        if (selectedOption.includes('year')) {
            const randomData = {
                labels: ["PNC", "JPM", "BOA"],
                datasets: [
                    {
                        data: [3.22, 3.6, 3.67]
                    },
                ]
            };
            const calculatedPayment = ((parseFloat(totalAmount) - parseFloat(downPayment))* 0.0322).toFixed(2);
            setBestPayment(calculatedPayment); // 更新最佳利润的状态
            const unit = '/year';
            setTimeUnit(unit);
            setData(randomData);
        }
        else {
            const randomData = {
                labels: ["PNC", "JPM", "BOA"],
                datasets: [
                    {
                        data: [2.01, 2.09, 2.88]
                    },
                ]
            };
            const calculatedPayment = ((parseFloat(totalAmount) - parseFloat(downPayment))* 0.0201).toFixed(2);
            setBestPayment(calculatedPayment); // 更新最佳利润的状态
            const unit = '/month';
            setTimeUnit(unit);
            setData(randomData);
        }
    };

    const menu =
        <View style={{flex: 1, justifyContent: 'center'}}>
            <Button title="Personal Profile" onPress={() => navigation.navigate('Personal')} style={{marginBottom: 8}}/>
            <Button title="Main" onPress={() => navigation.navigate('Spending')} style={{marginBottom: 8}}/>
            <Button title="Spending Overview" onPress={() => navigation.navigate('Overview')}
                    style={{marginBottom: 8}}/>
            <Button title="Tax Lookup Map" onPress={() => navigation.navigate('Tax')} style={{marginBottom: 8}}/>
            <Button title="Savings Planner" onPress={() => navigation.navigate('Saving')} style={{marginBottom: 8}}/>
            <Button title="Loan Planner" onPress={() => navigation.navigate('Loan')} style={{marginBottom: 8}}/>

            <View style={{flexDirection: 'row', alignItems: 'center', position: 'absolute', bottom: 20, right: 8}}>
                <Text onPress={() => navigation.navigate('Login')}>Logout</Text>
                <Icon name="logout" onPress={() => navigation.navigate('Login')} size={30}/>
            </View>
        </View>
    ;

    return (
        <SideMenu menu={menu}
                  isOpen={isMenuOpen}>
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <Header
                    leftComponent={<Icon name='menu'
                                         size={30}
                                         onPress={() => setIsMenuOpen(!isMenuOpen)}
                    />}
                    centerComponent={{text: 'RateScope', style: {color: '#fff', fontSize: 20}}}
                    rightComponent={<Icon name='home'
                                          onPress={() => navigation.navigate('Login')}
                                          size={30}/>}
                />

                <View style={styles.container}>
                    <Text style={styles.title}>Loan Planner</Text>
                    <View style={styles.rowContainer}>
                        <View style={styles.inputTotalAmount}>
                            <Text style={styles.label}>Total Amount:</Text>
                            <Input
                                containerStyle={styles.input}
                                value={totalAmount}
                                onChangeText={setTotalAmount}
                            />
                        </View>

                        <View style={styles.inputFICO}>
                            <Text style={styles.label}>FICO:</Text>
                            <Input
                                containerStyle={styles.input}
                                value={ficoScore}
                                onChangeText={setFicoScore}
                            />
                        </View>
                    </View>

                    <View style={styles.inputWithLabel}>
                        <Text style={styles.label}>Down Payment:</Text>
                        <Input
                            containerStyle={styles.input}
                            value={downPayment}
                            onChangeText={setDownPayment}
                        />
                    </View>
                    <View style={{marginBottom: 40, width: screenWidth - 20, zIndex: 1}}>
                        <DropDownPicker
                            open={isOpen}
                            value={selectedOption}
                            items={[
                                {label: '3 month', value: '3 month'},
                                {label: '6 month', value: '6 month'},
                                {label: '1 year', value: '1 year'},
                                {label: '3 year', value: '3 year'},
                                {label: '5 year', value: '5 year'},
                                {label: '10 year', value: '10 year'},
                                // ...更多选项
                            ]}
                            setOpen={setIsOpen}
                            setValue={setSelectedOption}
                            defaultValue={selectedOption}
                            placeholder="Select Loan Term"
                            containerStyle={{height: 40}}
                            style={{backgroundColor: '#fafafa', zIndex: 1000}}
                            itemStyle={{justifyContent: 'flex-start'}}
                            dropDownStyle={{backgroundColor: '#fafafa'}}
                            onChangeItem={item => setSelectedOption(item.value)}
                        />
                    </View>

                    <Button title="Calculate" onPress={generateRandomData} style={{zIndex: 0}}/>

                    {data && (
                        <BarChart
                            data={data}
                            width={screenWidth}
                            height={220}
                            fromZero
                            chartConfig={chartConfig}
                            verticalLabelRotation={30}
                        />
                    )}
                </View>
                <View style={styles.bestProfitContainer}>
                    <Text style={styles.bestProfitText}>Best Payment: {bestPayment}{timeUnit}</Text>
                </View>
            </View>
        </SideMenu>
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
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between', // 使容器中的元素均匀分布
        marginBottom: 1,
    },
    inputWithLabel: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputTotalAmount: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 2,
    },
    inputFICO: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    label: {
        marginRight: 10,
        fontSize: 16,
        color: 'black',
        // 根据需要调整样式
    },
    input: {
        flex: 1, // 使输入框填充剩余空间
        // 可能需要根据你的布局进一步调整样式
    },
    backButtonContainer: {
        position: 'absolute', // 使用绝对定位
        left: 20,   // 距离左边距20像素
        bottom: 20, // 距离底部20像素
    },
    bestProfitContainer: {
        marginBottom: 100,
        marginLeft: 50,
    },
    bestProfitText: {
        fontSize: 16,         // Font size for the text
        color: 'black',       // Text color
        textAlign: 'left',
        // Add more styling as needed
    }
    // ... 其他样式
});
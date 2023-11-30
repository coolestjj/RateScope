import React, { useState, useCallback } from 'react';
import {Alert, View, Text, StyleSheet, Dimensions} from 'react-native';
import {Input, Header, Icon, Button} from '@rneui/themed';
import DropDownPicker from 'react-native-dropdown-picker';
import {BarChart} from "react-native-chart-kit";
import {useNavigation} from "@react-navigation/native";
import SideMenu from "react-native-side-menu";
import { useFocusEffect } from '@react-navigation/native';

export default function Saving() {
    const screenWidth = Dimensions.get("window").width;
    const navigation = useNavigation();

    // 初始化状态变量
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    useFocusEffect(
        useCallback(() => {
            setIsMenuOpen(false);
        }, [])
    );
    const [bestProfit, setBestProfit] = useState(null);
    const [selectedOption, setSelectedOption] = useState('');
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
        if (selectedOption.trim() === '') {
            Alert.alert('Missing Information', 'Please input your Saving Term.');
            return;
        }
        if (selectedOption.includes('year')) {
            const randomData = {
                labels: ["PNC", "JPM", "BOA"],
                datasets: [
                    {
                        data: [3.8, 3.6, 3.23]
                    },
                ]
            };
            const calculatedProfit = (parseFloat(totalAmount) * 0.038).toFixed(2);
            setBestProfit(calculatedProfit); // 更新最佳利润的状态
            const unit = '/year';
            setTimeUnit(unit);
            setData(randomData);
        }
        else {
            const randomData = {
                labels: ["PNC", "JPM", "BOA"],
                datasets: [
                    {
                        data: [2.7, 2.1, 2.02]
                    },
                ]
            };
            const calculatedProfit = (parseFloat(totalAmount) * 0.027).toFixed(2);
            setBestProfit(calculatedProfit); // 更新最佳利润的状态
            const unit = '/month';
            setTimeUnit(unit);
            setData(randomData);
        }


    };

    const menu =
        <View style={{flex: 1, justifyContent: 'center'}}>
            <Button title="Main" onPress={() => {navigation.navigate('Spending'); setIsMenuOpen(false);}}
                    style={{marginBottom: 8}} type='clear'/>
            <Button title="Personal Profile" onPress={() => {navigation.navigate('Personal'); setIsMenuOpen(false);}}
                    style={{marginBottom: 8}} type='clear'/>
            <Button title="Spending Overview" onPress={() => {navigation.navigate('Overview'); setIsMenuOpen(false);}}
                    style={{marginBottom: 8}} type='clear'/>
            <Button title="Tax Lookup Map" onPress={() => {navigation.navigate('Tax'); setIsMenuOpen(false);}}
                    style={{marginBottom: 8}} type='clear'/>
            <Button title="Savings Planner" onPress={() => {navigation.navigate('Saving'); setIsMenuOpen(false);}}
                    style={{marginBottom: 8}} type='clear'/>
            <Button title="Loan Planner" onPress={() => {navigation.navigate('Loan'); setIsMenuOpen(false);}}
                    style={{marginBottom: 8}} type='clear'/>
            <View style={{flexDirection: 'row', alignItems: 'center', position: 'absolute', bottom: 20, right: 8}}>
                <Text onPress={() => navigation.navigate('Login')}>Logout</Text>
                <Icon name="logout" onPress={() => navigation.navigate('Login')} size={30}/>
            </View>
        </View>
    ;

    return (
        <SideMenu menu={menu}
                  isOpen={isMenuOpen}>
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

                <View style={styles.container}>
                    <Text style={styles.title}>Saving Planner</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Total Amount:</Text>
                        <Input
                            containerStyle={styles.input} // 容器宽度设置为屏幕宽度的一半减去一点间隙
                            placeholder='Total Amount'
                            value={totalAmount}
                            onChangeText={setTotalAmount}
                            keyboardType='numeric'
                        />
                    </View>

                    <View style={{marginBottom: 40, width: screenWidth - 20, zIndex: 1}}>
                        <DropDownPicker
                            onPress={() => setIsMenuOpen(false)}
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
                            placeholder="Select Saving Term"
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
                    <Text style={styles.bestProfitText}>Best Profit: {bestProfit}{timeUnit}</Text>
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
    inputContainer: {
        flexDirection: 'row', // 水平布局
        alignItems: 'center',
    },
    backButtonContainer: {
        position: 'absolute', // 使用绝对定位
        left: 20,   // 距离左边距20像素
        bottom: 20, // 距离底部20像素
    },
    bestProfitContainer: {
        marginBottom: 150,
        marginLeft: 50,
    },
    bestProfitText: {
        fontSize: 16,         // Font size for the text
        color: 'black',       // Text color
        textAlign: 'left',
        // Add more styling as needed
    },
    input: {
        flex: 1, // 使输入框填充剩余空间
        // 可能需要根据你的布局进一步调整样式
    },
    // ... 其他样式
});
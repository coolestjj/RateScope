import React, { useState, useCallback } from 'react';
import {Alert, View, Text, StyleSheet, Dimensions} from 'react-native';
import {Input, Header, Icon, Button} from '@rneui/themed';
import DropDownPicker from 'react-native-dropdown-picker';
import {BarChart} from "react-native-chart-kit";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import SideMenu from "react-native-side-menu";
import LeftMenu from "../UI/LeftMenu";
import MyButton from "../UI/MyButton";


export default function Loan() {
    const screenWidth = Dimensions.get("window").width;
    const navigation = useNavigation();
    const [inputFocusCount, setInputFocusCount] = useState(1);

    // 处理输入框获得焦点
    const handleInputFocus = () => {
        //Alert.alert('Missing Information', 'Please input your Total Amount.');
        setInputFocusCount(1);
    };

    // 处理输入框失去焦点
    const handleInputBlur = () => {

        setInputFocusCount(0);
    };
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
        handleInputBlur();
    };

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

                <View style={styles.container}>
                    <Text style={styles.title}>Loan Planner</Text>
                    <View style={styles.rowContainer}>
                        <View style={styles.inputTotalAmount}>
                            {/*<Text style={styles.label}>Total Amount:</Text>*/}
                            <Input
                                label="Total Amount:"
                                labelStyle={{color: 'white'}}
                                containerStyle={styles.input}
                                value={totalAmount}
                                onChangeText={setTotalAmount}
                                keyboardType='numeric'
                                placeholder='$'
                                onPressIn={handleInputFocus}
                                //onBlur={handleInputBlur}
                            />
                        </View>

                        <View style={styles.inputFICO}>
                            {/*<Text style={styles.label}>FICO:</Text>*/}
                            <Input
                                label="FICO:"
                                labelStyle={{color: 'white'}}
                                containerStyle={styles.input}
                                value={ficoScore}
                                onChangeText={setFicoScore}
                                keyboardType='numeric'
                                placeholder='Credit Score'
                                onPressIn={handleInputFocus}
                                //onBlur={handleInputBlur}
                            />
                        </View>
                    </View>

                    <View style={styles.inputWithLabel}>
                        {/*<Text style={styles.label}>Down Payment:</Text>*/}
                        <Input
                            label="Down Payment:"
                            labelStyle={{color: 'white'}}
                            containerStyle={styles.input}
                            value={downPayment}
                            onChangeText={setDownPayment}
                            keyboardType='numeric'
                            placeholder='One-time Initial Payment'
                            onPressIn={handleInputFocus}
                            //onBlur={handleInputBlur}
                        />
                    </View>
                    <View style={{marginBottom: 20, width: screenWidth - 50, zIndex: 1, alignSelf: 'center'}}>
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
                            placeholder="Select Loan Term"
                            containerStyle={{height: 40}}
                            style={{backgroundColor: '#fafafa', zIndex: 1000}}
                            itemStyle={{justifyContent: 'flex-start'}}
                            dropDownStyle={{backgroundColor: '#fafafa'}}
                            onChangeItem={item => setSelectedOption(item.value)}
                        />
                    </View>

                    <MyButton onPress={generateRandomData} style={styles.button}>calculate
                    </MyButton>

                    <View style={styles.chartContainer}>
                        {data && (
                            <BarChart
                                data={data}
                                width={screenWidth - 50}
                                height={220}
                                fromZero
                                chartConfig={chartConfig}
                                yAxisSuffix='%'
                                verticalLabelRotation={30}
                            />
                        )}
                    </View>
                </View>
                {inputFocusCount === 0 && (
                    <View style={styles.bestProfitContainer}>
                        <Text style={styles.bestProfitText}>Best Payment: $ {bestPayment}{timeUnit}</Text>
                    </View>
                )}
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
        marginVertical: 16,
        color: 'white',
        fontWeight: 'bold',
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between', // 使容器中的元素均匀分布
        marginBottom: 1,
    },
    button: {
        minWidth: 300,
        marginHorizontal: 8,
        marginBottom: 10,
        alignSelf: 'center',
        marginTop: 16,
        zIndex: 0,

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
        marginBottom: 75,
        alignItems: 'center',
    },
    bestProfitText: {
        fontSize: 16,         // Font size for the text
        color: 'black',       // Text color
        textAlign: 'left',
        // Add more styling as needed
    },
    // ... 其他样式
    chartContainer: {
        alignItems: 'center', // 水平居中
        justifyContent: 'center', // 垂直居中（如果需要）
        // 其他需要的样式
    }
});
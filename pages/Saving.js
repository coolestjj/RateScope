import React, {useState} from 'react';
import {Alert, View, Text, StyleSheet, Dimensions} from 'react-native';
import {Input, Header, Icon, Button} from '@rneui/themed';
import DropDownPicker from 'react-native-dropdown-picker';
import {BarChart} from "react-native-chart-kit";
import {useNavigation} from "@react-navigation/native";
import SideMenu from "react-native-side-menu";

export default function RateScope() {
    const screenWidth = Dimensions.get("window").width;
    const navigation = useNavigation();

    // 初始化状态变量
    const [ficoScore, setFicoScore] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [downPayment, setDownPayment] = useState('');
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

    const generateRandomData = () => {
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
        const randomData = {
            labels: ["PNC", "JPM", "BOA"],
            datasets: [
                {
                    data: [2.1, 2.7, 2.9]
                },
            ]
        };
        setData(randomData);
    };

    const menu =
        <View style={{flex: 1, justifyContent: 'center'}}>
            <Button title="Personal Profile" onPress={() => navigation.navigate('Personal')} style={{marginBottom: 8}}/>
            <Button title="Main" onPress={() => navigation.navigate('Spending')} style={{marginBottom: 8}}/>
            <Button title="Spending Overview" onPress={() => navigation.navigate('Overview')}
                    style={{marginBottom: 8}}/>
            <Button title="Savings Planner" onPress={() => navigation.navigate('Saving')} style={{marginBottom: 8}}/>


            <View style={{flexDirection: 'row', alignItems: 'center', position: 'absolute', bottom: 20, right: 8}}>
                <Text onPress={() => navigation.navigate('Login')}>Logout</Text>
                <Icon name="logout" onPress={() => navigation.navigate('Login')} size={30}/>
            </View>
        </View>
    ;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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

                    <View style={styles.inputContainer}>
                        <Input
                            containerStyle={{width: screenWidth / 2 - 10}} // 容器宽度设置为屏幕宽度的一半减去一点间隙
                            placeholder='FICO Score'
                            value={ficoScore}
                            onChangeText={setFicoScore}
                        />

                        <Input
                            containerStyle={{width: screenWidth / 2 - 10}} // 同上
                            placeholder='Down Payment'
                            value={downPayment}
                            keyboardType='numeric'
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
                <View style={styles.backButtonContainer}>
                    <Button
                        buttonStyle={styles.backButton}
                        containerStyle={styles.buttonContainer}
                        icon={<Icon name='arrow-left' size={15} color='#006FFFFF'/>}
                        iconContainerStyle={{backgroundColor: '#ff3d00'}}
                        iconRight
                        onPress={() => navigation.navigate('Spending')}
                        title='Go Back'
                        type='clear'
                    />
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
        justifyContent: 'space-between', // 两个输入框之间有间隙
        marginBottom: 20,
    },
    backButtonContainer: {
        position: 'absolute', // 使用绝对定位
        left: 20,   // 距离左边距20像素
        bottom: 20, // 距离底部20像素
    },
    // ... 其他样式
});
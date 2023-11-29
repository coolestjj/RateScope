import { StyleSheet, Text, View, Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ExpensesContext } from './context';
import IconButton from '../UI/IconButton';
import { useContext } from 'react';

const deviceWidth = Dimensions.get('window').width;
function getFormattedDate(date) {
  return date.toISOString().slice(0, 10);
}

export function SpendingItem({ id, description, amount, date, category, plan, rate, type }) {
    const navigation = useNavigation();
    const expensesCtx = useContext(ExpensesContext);


    function expensePressHandler() {
        navigation.navigate('ManageExpense', {
            expenseId: id
        });
    }

    function rateCalc(num) {
        if (plan === "income" || rate === "None") {
            return num;
        } else {
            if (rate === "AL") {
                return num*1.052;
            } else if (rate === "AK") {
                return num*1.068;
            } else if (rate === "IL") {
                return num*1.045;
            }
        }
    }
    return (
        
            <View style={styles.items}>
                <View>
                    <Text style={{margin: 3, fontSize: 18}}>
                        {description}
                    </Text>
                    <Text style={{margin: 3, fontSize: 10}}>
                        {getFormattedDate(date)}
                    </Text>
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{textAlign:'center', margin: 10}}>
                        
                        {type === "expense" ? "-" : "+"}{rateCalc(amount).toFixed(2)}
                    </Text>
                    <View style={{margin:4}}><IconButton icon="pencil" size={24} color="#5b6efc" onPress={expensePressHandler}/></View>
                    <View style={{margin:4}}><IconButton icon="trash" size={24} color="#f26b6b" onPress={()=> {expensesCtx.deleteExpense(id);}}/></View>
                </View>
            </View>

    );
}

const styles = StyleSheet.create({
    items: {
        width: deviceWidth * 0.85,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 10,
        margin: 5,
        backgroundColor: "white",
        padding: 2,
        opacity:0.9
    },
});

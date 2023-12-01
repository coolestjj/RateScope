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

    const autoTax = {
      "AL": 5.2,
      "AK": 6.8,
      "AZ": 5.6,
      "AR": 6.9,
      "CA": 7.25,
      "CO": 5.3,
      "CT": 6.35,
      "DE": 6.6,
      "DC": 5.75,
      "FL": 6.0,
      "GA": 7.25,
      "HI": 4.45,
      "ID": 7.25,
      "IL": 4.5,
      "IN": 7.0,
      "IA": 6.0,
      "KS": 6.5,
      "KY": 6.0,
      "LA": 5.0,
      "ME": 5.5,
      "MD": 6.0,
      "MA": 6.65,
      "MI": 4.35,
      "MN": 5.3,
      "MS": 7.0,
      "MO": 5.4,
      "MT": 7.0,
      "NE": 5.5,
      "NV": 7.75,
      "NH": 5.2,
      "NJ": 6.6,
      "NM": 5.1,
      "NY": 4.3,
      "NC": 5.25,
      "ND": 5.0,
      "OH": 5.75,
      "OK": 5.5,
      "OR": 0.0,
      "PA": 6.0,
      "RI": 7.0,
      "SC": 6.0,
      "SD": 4.5,
      "TN": 7.0,
      "TX": 6.15,
      "UT": 4.7,
      "VT": 6.35,
      "VA": 4.3,
      "WA": 6.5,
      "WV": 6.0,
      "WI": 5.32,
      "WY": 5.5,
    };



    function expensePressHandler() {
        navigation.navigate('ManageExpense', {
            expenseId: id
        });
    }

    function rateCalc(num) {
        if (plan === "income" || rate === "None") {
            return num;
        } else {
            return num*(1+autoTax[rate]/100);
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

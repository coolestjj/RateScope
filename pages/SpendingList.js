import { useContext } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { ExpensesContext } from './context';
import { SpendingItem } from './SpendingItem';
import { FontAwesome } from '@expo/vector-icons'; 
import IconButton from '../UI/IconButton';

function getFormattedDate(date) {
  return date.toISOString().slice(0, 10);
}

function renderSpendingItem(itemData) {
    return <SpendingItem {...itemData.item} />;
}

export function SpendingList({ expenses }) {
    const expensesCtx = useContext(ExpensesContext);

    return (
        <View>
            
            <FlatList
                data={expenses}
                renderItem={(itemData) => {
                    return (
                        <View style={styles.items}>
                            <View>
                                <Text style={{textAlign:'center', margin: 3, fontSize: 15}}>
                                    {itemData.item.description}
                                </Text>
                                <Text style={{margin: 3, fontSize: 10}}>
                                    {getFormattedDate(itemData.item.date)}
                                </Text>
                            </View>
                            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                <Text style={{textAlign:'center', margin: 10}}>
                                        -{itemData.item.amount}
                                </Text>
                                <View style={{margin:4}}><IconButton icon="pencil" size={24} color="black" onPress={() => {}}/></View>
                                <View style={{margin:4}}><IconButton icon="trash" size={24} color="black" onPress={()=> {expensesCtx.deleteExpense(itemData.item.id);}}/></View>
                            </View>
                        </View>           
                    );
                }}
                keyExtractor={(item) => item.id}
                />
            
        </View>
    );
}

const styles = StyleSheet.create({
    items: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: 'black',
    margin: 4,
  },
});
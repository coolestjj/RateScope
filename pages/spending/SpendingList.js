import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ExpensesContext } from '../../context/context';
import { SpendingItem } from './SpendingItem';


function renderSpendingItem(itemData) {
    return <SpendingItem {...itemData.item} />;
}
export default function SpendingList() {
    const expensesCtx = useContext(ExpensesContext);

    return (
        <View>
            <FlatList
                data={expensesCtx.expenses}
                renderItem={renderSpendingItem}
                keyExtractor={(item) => item.id}
                />
        </View>
    );
}
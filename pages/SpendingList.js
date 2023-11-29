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
    return (
        <FlatList
            data={expenses}
            renderItem={renderSpendingItem}
            keyExtractor={(item) => item.id}
        />
    );
}
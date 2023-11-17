import { StyleSheet, Text, View } from 'react-native';

function getFormattedDate(date) {
  return date.toISOString().slice(0, 10);
}

export function SpendingItem({ id, description, amount, date }) {
    return (
        <View>
            <View>
                <Text>
                    {description}
                </Text>
                <Text>{getFormattedDate(date)}</Text>
            </View>
            <View>
                <Text>{amount.toFixed(2)}</Text>
            </View>
        </View>
    );
}

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CountersInfoScreen from '../../screens/counters/CountersInfoAndSendDataScreen/CountersInfoScreen';
import StatisticsCountersScreen from '../../screens/counters/StatisticsCountersScreen/StatisticsCountersScreen';

function CountersReadingNavigator() {
    const Stack = createNativeStackNavigator();

    return (
        <View style={styles.container}>
            <Stack.Navigator
                initialRouteName="CountersInfoScreen"
            >
                <Stack.Screen name={'CountersInfoScreen'}
                    component={CountersInfoScreen}
                    options={{
                        headerShown: false, // Скрыть заголовок
                    }}
                />
                <Stack.Screen name={'StatisticsCountersScreen'}
                    component={StatisticsCountersScreen}
                    options={{
                        headerShown: false, // Скрыть заголовок
                    }}
                />
            </Stack.Navigator>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
})

export default CountersReadingNavigator;
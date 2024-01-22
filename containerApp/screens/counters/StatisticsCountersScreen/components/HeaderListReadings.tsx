import { FlatList, StyleSheet, TouchableOpacity, View, Text } from "react-native"
import ChartReadings from "./ChartReadings";

type HeaderComponent = {
    dataForChart: any;
    years: number[];
    selectedYear: number;
    selectYear: (number: number) => void;
}

type RenderSwitchYear = {
    item: any;
    selectedYear: number;
    selectYear: (number: number) => void;
}

/** Компонент header у списка статистики показаний счетчиков */
const HeaderListReadings: React.FC<HeaderComponent> = ({ dataForChart, years, selectedYear, selectYear }) => {

    const RenderSwitchYear: React.FC<RenderSwitchYear> = ({ item, selectedYear, selectYear }) => {
        return (
            <TouchableOpacity style={selectedYear?.toString() === item?.toString() ? styles.underlinedText : ''} onPress={() => selectYear(item)}>
                <Text style={styles.textButton}>{item}</Text>
            </TouchableOpacity >
        )
    }

    const ItemSeparator = () => {
        return (
            <View style={{ paddingHorizontal: 8 }}></View>
        )
    }


    return (
        <View style={styles.container}>
            <View style={styles.flatListContainer}>
                <FlatList
                    data={years}
                    renderItem={({ item }) => <RenderSwitchYear item={item} selectedYear={selectedYear} selectYear={selectYear} />}
                    keyExtractor={item => item.index}
                    style={styles.flatList} // Применение стилей к FlatList
                    ItemSeparatorComponent={ItemSeparator}
                    contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
                    horizontal={true}
                />
            </View>
            <ChartReadings dataForChart={dataForChart} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: 30,
        marginTop: 70,
        marginBottom: 30,
    },
    flatListContainer: {
        height: 50,
        paddingLeft: 20,
        paddingBottom: 10,
    },
    flatList: {
        // height: 50,
        // paddingLeft: 10,
        // paddingBottom: 10,
        // width: 30,
    },
    textButton: {
        fontSize: 12,
        fontWeight: '500',

    },
    underlinedText: {
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
    },
})

export default HeaderListReadings;
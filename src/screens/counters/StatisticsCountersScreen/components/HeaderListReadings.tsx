import { FlatList, StyleSheet, TouchableOpacity, View, Text, LayoutAnimation } from "react-native"
import ChartReadings from "./ChartReadings";
import { useEffect, useState } from "react";

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

    const [isShowChart, setShowChart] = useState<boolean>(false);

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

    useEffect(() => {
        setShowChart(true);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.flatListContainer}>
                <FlatList
                    data={years}
                    renderItem={({ item }) => <RenderSwitchYear item={item} selectedYear={selectedYear} selectYear={selectYear} />}
                    keyExtractor={item => item}
                    style={styles.flatList} // Применение стилей к FlatList
                    ItemSeparatorComponent={ItemSeparator}
                    contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
                    horizontal={true}
                />
            </View>
            <View style={[styles.chart]}> 
                <ChartReadings dataForChart={dataForChart} />
            </View> 

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
    chart: {
        width: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        opacity: 1,
        minHeight: 150,
        maxHeight: 300,
    },
    chartHide: {
        opacity: 0,
    }
})

export default HeaderListReadings;
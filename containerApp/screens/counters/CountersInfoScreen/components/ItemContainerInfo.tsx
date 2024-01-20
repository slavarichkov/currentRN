import { StyleSheet, Text, View } from "react-native";
import { useTranslate } from '../../../../contexts/translate/TranslateContext';
import { useTheme } from '../../../../contexts/theme/ThemeContext';
import { TypeCounterInfo } from "../../types/types";
import TextInputWithLabelInside from "../../../../componentsShared/Inputs/TextInputWithLabelInside";

interface ItemContainerInfoProps {
    dataCounter: TypeCounterInfo | any; // Замените на ваш тип данных
}

/**
 * Компонент для отображения элемента списка данных всех счетчиков по актуальным измерениям.
 * @param param0 
 * @returns 
 */
const ItemContainerInfo: React.FC<ItemContainerInfoProps> = ({ dataCounter }) => {

    const { selectedTranslations } = useTranslate();
    const { colorText } = useTheme();

    const backgroundColorArray = {
        'Горячая вода': 'rgba(255,0,0,0.1)',
        'Холодная вода': '#87CEEB',
        'Электричество': 'rgba(255,255,0,0.1)',
        'Отопление': 'rgba(0,0,0,0.1)',
        'Газ': '#87CEEB',
    }

    function getCost() {
        let cost = '0';
        if (dataCounter && dataCounter.closestReading && dataCounter.previousReading) {
            const closestReading = Number(dataCounter.closestReading.data);
            const previousReading = Number(dataCounter.previousReading.data);
            const volume = closestReading - previousReading;
            cost = (volume * Number(dataCounter.costOfaUnitOfMeasurement)).toString();
        }
        return cost;
    }

    function getVolume() {
        let volume = '0';
        if (dataCounter.closestReading && dataCounter.previousReading) {
            const closestReading = Number(dataCounter.closestReading.data);
            const previousReading = Number(dataCounter.previousReading.data);
            volume = (closestReading - previousReading).toString();
        }
        return volume;
    }

    return (
        <View style={[styles.container]}>
            <Text style={[styles.title, colorText]}>{dataCounter.name}</Text>
            <TextInputWithLabelInside
                label={selectedTranslations.volume}
                placeholder={selectedTranslations.volume}
                value={getVolume()}
                onClickInput={() => { }}
                onChangeText={() => { }}
            />
            <TextInputWithLabelInside
                label={selectedTranslations.cost}
                placeholder={selectedTranslations.cost}
                value={getCost()}
                onClickInput={() => { }}
                onChangeText={() => { }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 5,
        paddingHorizontal: 5,
        // backgroundColor: 'rgba(255,0,0,0.1)',
        borderRadius: 10,
        marginTop: 10,
    },
    title: {
        fontSize: 15,
        fontWeight: '700',
    }
})

export default ItemContainerInfo;
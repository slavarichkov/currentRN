import { StyleSheet, Text, View } from "react-native";
import { useTranslate } from '../../../../contexts/translate/TranslateContext';
import { useTheme } from '../../../../contexts/theme/ThemeContext';
import { TypeCounterInfo } from "../../types/types";
import TextInputWithLabelInside from "../../../../componentsShared/Inputs/TextInputWithLabelInside";

interface ItemContainerInfoProps {
    dataCounter: {
        date: string;
        id: number;
        idAddress: string;
        meterReading: any;
        nameCounter: string;
    }
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
        const data = dataCounter.meterReading;
        const cost = data.cost.toString();
        return cost;
    }

    function getVolume() {
        const data = dataCounter.meterReading;
        const volume = data.volume.toString();
        return volume;
    }

    function getCounterName(){
        const data = dataCounter.meterReading;
        let name = dataCounter.nameCounter.toString();
        const findCurrentName = selectedTranslations?.arrayUnitsOfMeasurement.find((item: any) => item.name === name);
        name = findCurrentName?.nameCounter;
        return name;
    }

    return (
        <View style={[styles.container]}>
            <Text style={[styles.title, colorText]}>{getCounterName()}</Text>
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
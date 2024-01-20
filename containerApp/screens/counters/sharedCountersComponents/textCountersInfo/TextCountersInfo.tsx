import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from "../../../../contexts/theme/ThemeContext";
import { useTranslate } from '../../../../contexts/translate/TranslateContext';
import { TypeCounterInfo } from '../../types/types';
import { formatDate } from '../../../../utils/funtions';

interface TextCountersInfoPropsTypes {
    dataCounter: TypeCounterInfo;
    onClickCounter: () => void;
}

/**
 * Пропсы компонента TextCountersInfo.
 * @typedef {Object} TextCountersInfoPropsTypes
 * @property {TypeCounterInfo} dataCounter - Информация о счетчике.
 * @property {() => void} onClickCounter - Обработчик клика на компонент.
 */

/**
 * Компонент для отображения информации о счетчике.
 * @param {TextCountersInfoPropsTypes} props - Пропсы компонента.
 * @returns {React.ReactNode} Компонент TextCountersInfo.
 */
const TextCountersInfo: React.FC<TextCountersInfoPropsTypes> = ({ dataCounter, onClickCounter }) => {
    const { colorText } = useTheme();
    const { selectedTranslations } = useTranslate();

    function getUnitOfMeasurement() {
        const unitFindObj = selectedTranslations.arrayUnitsOfMeasurement.filter((unitObj: any) => unitObj.name === dataCounter.name);
        let unitCouner = '';
        if (unitFindObj) {
            unitCouner = unitFindObj[0].value;
        }
        return unitCouner;
    }

    return (
        <TouchableOpacity style={styles.container} onPress={onClickCounter}>
            <Text style={[styles.title, colorText]}>{selectedTranslations.counterData}</Text>
            <Text style={[styles.text, colorText]}>№ {dataCounter.counterNumber}</Text>
            <Text style={[styles.text, colorText]}>{selectedTranslations.dateOfCounterVerification}: {formatDate(dataCounter.dateOfCounterVerification)}</Text>
            <Text style={[styles.text, colorText]}>{selectedTranslations.dateOfCounterVerificationNext}: {formatDate(dataCounter.dateOfCounterVerification)}</Text>
            <Text style={[styles.text, colorText]}>{selectedTranslations.costOfaUnitOfMeasurement} {getUnitOfMeasurement()}: {dataCounter.costOfaUnitOfMeasurement} {selectedTranslations.currency}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingHorizontal: 30,
    },
    title: {
        color: 'rgba(0,0,0,1)',
        fontSize: 14,
        fontWeight: '700',
        paddingTop: 5,
        paddingBottom: 3,
    },
    text: {
        color: 'rgba(0,0,0,1)',
        fontSize: 12,
        fontWeight: '500',
        paddingTop: 1,
    }
});

export default TextCountersInfo;
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from "../../../../contexts/theme/ThemeContext";
import { useTranslate } from '../../../../contexts/translate/TranslateContext';
import { TypeCounterInfo } from '../../types/types';
import { formatDate } from '../../../../utils/funtions';

interface TextCountersInfoPropsTypes {
    dataCounter: TypeCounterInfo;
    onClickCounter: ()=>void;
}

const TextCountersInfo: React.FC<TextCountersInfoPropsTypes> = ({ dataCounter, onClickCounter }) => {
    const { colorText } = useTheme();
    const { selectedTranslations } = useTranslate();

    return (
        <TouchableOpacity style={styles.container} onPress={onClickCounter}>
            <Text style={[styles.title, colorText]}>{selectedTranslations.counterData}</Text>
            <Text style={[styles.text, colorText]}>№ {dataCounter.counterNumber}</Text>
            <Text style={[styles.text, colorText]}>{selectedTranslations.dateOfCounterVerification}: {formatDate(dataCounter.dateOfCounterVerification)}</Text>
            <Text style={[styles.text, colorText]}>{selectedTranslations.dateOfCounterVerificationNext}: {formatDate(dataCounter.dateOfCounterVerification)}</Text>
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
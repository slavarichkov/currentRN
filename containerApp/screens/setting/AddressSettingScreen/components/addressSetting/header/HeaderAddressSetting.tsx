import { View, StyleSheet, Text, Dimensions } from "react-native";
import { useTranslate } from '../../../../../../contexts/translate/TranslateContext';
import { useTheme } from '../../../../../../contexts/theme/ThemeContext';

import ActiveAddress from "../activeAddress/ActiveAddress";

/**
 * Заголовок для экрана настроек адресов.
 *
 * @component
 * @example
 * // Пример использования компонента:
 * <HeaderAddressSetting />
 */
const HeaderAddressSetting = () => {

    const { selectedTranslations } = useTranslate();
    const { colorText } = useTheme();

    return (
        <View style={styles.container}>
            {/* <Text style={[styles.title, colorText]}>{selectedTranslations.settingsScreen}</Text> */}
            <ActiveAddress />
            <Text style={[styles.subTitle, colorText]}>{selectedTranslations.addresses}</Text>
            <Text style={[styles.instrucetion, colorText]}>{selectedTranslations.instructionAddress}</Text>
        </View>
    )
}

// Получение ширины экрана
const screenWidth = Dimensions.get('window').width * 0.8;

const styles = StyleSheet.create({
    container: {
        width: screenWidth,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 17,
        fontWeight: '700',
        textAlign: 'center',
        paddingTop: 30,
    },
    subTitle: {
        fontSize: 15,
        fontWeight: '700',
        textAlign: 'center',
        paddingTop: 10,
    },
    instrucetion: {
        fontSize: 12,
        fontWeight: '400',
        paddingTop: 10,
        paddingBottom: 20,
    }
})

export default HeaderAddressSetting;
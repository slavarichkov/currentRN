import { StyleSheet, Text, View } from "react-native";
import ButtonSetting from "./components/ButtonSetting";
//Контекст
import { useTheme } from '../../../contexts/theme/ThemeContext';
import { useGlobal } from '../../../contexts/global/GlobalContext';
import { useTranslate } from '../../../contexts/translate/TranslateContext';


function GlobalSettingScreen() {

    const { backgroundColor, colorText, changeTheme } = useTheme();
    const { address } = useGlobal();
    const { selectedTranslations, changeLocaleUser } = useTranslate();

    return (
        <View style={[styles.container, backgroundColor]}>
            {/* Выбор темы */}
            <View style={[styles.containerButtons, { backgroundColor: 'rgba(0,0,0,0.3)' }]}>
                <ButtonSetting text={selectedTranslations.lightThemeButtonName} onClick={() => changeTheme('light')} />
                <Text style={styles.textNameButtonContainer}>{selectedTranslations.buttonNameTheme}</Text>
                <ButtonSetting text={selectedTranslations.darkThemeButtonName} onClick={() => changeTheme('dark')} />
            </View>
            {/* Выбор Языка */}
            <View style={[styles.containerButtons, { backgroundColor: 'rgba(0,0,0,0.3)' }]}>
                <ButtonSetting text={selectedTranslations.en} onClick={() => changeLocaleUser('en')} />
                <Text style={styles.textNameButtonContainer}>{selectedTranslations.buttonNameLanguage}</Text>
                <ButtonSetting text={selectedTranslations.ru} onClick={() => changeLocaleUser('ru')} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingStart: 25,
        // alignItems: 'center',
    },
    containerButtons: {
        marginTop: 20,
        alignItems: 'center',
        width: '90%',
        padding: 20,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textNameButtonContainer: {
        fontSize: 15,
        fontWeight: '500',
        color: 'rgba(0,0,0,1)',
    },
})

export default GlobalSettingScreen;
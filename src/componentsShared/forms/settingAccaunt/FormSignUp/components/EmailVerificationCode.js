import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useTranslate } from "../../../../../contexts/translate/TranslateContext";
import { useTheme } from "../../../../../contexts/theme/ThemeContext"; 

import styles from "../styles/styles";

import Loader from "../../../../loaders/Loader";

function EmailVerificationCode({ email,
    setEmail,
    sendVerificationCode,
    isValidationForm,
    validationEmailText,
    isLoadingEmail,
    theme,
    localeUser
}) {

    const { selectedTranslations } = useTranslate();
    const { colorText } = useTheme();

    return (
        <>
            <TextInput
                style={[[styles.input]]}
                placeholder={selectedTranslations.placeHolderEmail}
                value={email}
                onChangeText={setEmail}
                placeholderTextColor={'rgba(0,0,0,0.5)'}
                maxLength={350}
                keyboardType='email-address'
                onSubmitEditing={sendVerificationCode}
                returnKeyType={'done'}
            />
            <TouchableOpacity
                style={[
                    styles.containerSubmitButton,
                    theme === 'light' ? styles.backgroundColorSubmitButtonLight : styles.backgroundColorSubmitButtonDark,
                    isValidationForm ? '' : styles.validationForm
                ]}
                onPress={sendVerificationCode}>
                {isLoadingEmail ?
                    <View style={styles.loader}>
                        <Loader />
                    </View>
                    :
                    <Text style={styles.textSubmitButton}>{selectedTranslations.sendVerificationCodebuttonName}</Text>}
            </TouchableOpacity>
            <>
                <Text style={styles.validationText}>{validationEmailText}</Text>
                {localeUser === 'ru' ?
                    <Text style={styles.validationTexEmail}>Обратите внимание, что регистрация возможна только на почтовые домены РФ(.ru, .рф, .ру) согласно Федеральному закону от 31.07.2023 N 406-ФЗ "О внесении изменений в Федеральный закон "Об информации, информационных технологиях и о защите информации" и Федеральный закон "О связи"</Text>
                    : <></>}
            </>
        </>
    )
}

export default EmailVerificationCode;
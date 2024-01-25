import { View, Text, TextInput, TouchableOpacity } from "react-native";

import { useTranslate } from '../../../contexts/translate/TranslateContext';

import styles from "../styles/styles";
import Loader from "../../Loader";

function EmailVerificationCode({ email, setEmail, sendVerificationCode, isValidationForm, validationEmailText, isLoadingEmail, theme, localeUser }) {

    const { selectedTranslations } = useTranslate();

    return (
        <>
            <TextInput
                style={[styles.input]}
                placeholder={selectedTranslations.placeHolderEmail}
                value={email}
                onChangeText={setEmail}
                placeholderTextColor={'rgba(0,0,0,0.5)'}
                maxLength={150}
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
                {localeUser === 'ru-RU' ?
                    <Text style={styles.validationTexEmail}>translation.ru.disclaimerEmail</Text>
                    : <></>}
            </>
        </>
    )
}

export default EmailVerificationCode;
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useTranslate } from "../../../../../contexts/translate/TranslateContext";
import { useTheme } from "../../../../../contexts/theme/ThemeContext";
import styles from "../styles/styles";

import Loader from "../../../../loaders/Loader";

function SenderVerificationCode({
    updateEmail,
    verificateEmail,
    email,
    verificationСode,
    setVerificationСode,
    isValidationForm,
    validationMessage,
    isLoadingSendVerificationCode,
    theme,
    localeUser,
}) {

    const { selectedTranslations } = useTranslate();
    const { colorText } = useTheme();

    return (
        <>
            {/* <TouchableOpacity style={styles.containerEmailButton} onPress={updateEmail}>
                <Text style={styles.email}>{email}</Text>
            </TouchableOpacity> */}
            <TextInput
                style={[styles.input]}
                placeholder={selectedTranslations.placeHolderEmailVerificationCode}
                value={verificationСode}
                onChangeText={setVerificationСode}
                placeholderTextColor={'rgba(0,0,0,0.5)'}
                minLength={4}
                maxLength={10}
                keyboardType="numeric"
                onSubmitEditing={verificateEmail}
                returnKeyType={'done'}
            />
            {/* Отправить код */}
            <TouchableOpacity
                style={[
                    styles.containerSubmitButton,
                    theme === 'light' ? styles.backgroundColorSubmitButtonLight : styles.backgroundColorSubmitButtonDark,
                    isValidationForm ? '' : styles.validationForm
                ]}
                onPress={verificateEmail}>
                {isLoadingSendVerificationCode ?
                    <View style={styles.loader}>
                        <Loader />
                    </View>
                    :
                    <Text style={styles.textSubmitButton}>{selectedTranslations.verificateEmailCodeButtonName}</Text>}
            </TouchableOpacity>
            <Text style={styles.validationText}>{validationMessage}</Text>
            {/* Вернуться к отправке кода */}
            <TouchableOpacity
                style={[
                    styles.buttonSendCode,
                    theme === 'light' ? styles.backgroundColorSubmitButtonLight : styles.backgroundColorSubmitButtonDark,
                    // isValidationForm ? '' : styles.validationForm
                ]}
                onPress={updateEmail}>
                <Text style={styles.textSubmitVerification}>{selectedTranslations.repeatSendVerificationCodeEmailButtonName}</Text>
            </TouchableOpacity>
        </>
    )
}

export default SenderVerificationCode;
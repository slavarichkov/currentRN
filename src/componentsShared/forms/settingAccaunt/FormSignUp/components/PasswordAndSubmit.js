import { Text, TextInput, TouchableOpacity } from "react-native";
import { useTranslate } from "../../../../../contexts/translate/TranslateContext"; 
import { useTheme } from "../../../../../contexts/theme/ThemeContext"; 

import styles from "../styles/styles";

import Loader from "../../../../loaders/Loader";
import Checkbox from "../../../../checkboxs/Checkbox";

function PasswordAndSubmit({
    onSubmit,
    textSubmitButton,
    password,
    setPassword,
    isValidationForm,
    validationPasswordText,
    validationAccess,
    isLoadingSubmit,
    isCheckedPrivacyPolicy,
    setCheckedPrivacyPolicy,
    theme,
    localeUser,
}) {

    const { selectedTranslations } = useTranslate();
    const { colorText } = useTheme();

    return (
        <>
            <TextInput
                style={[styles.input]}
                placeholder={selectedTranslations.placeHolderPassword}
                value={password}
                onChangeText={setPassword}
                placeholderTextColor={'rgba(0,0,0,0.5)'}
                maxLength={50}
                onSubmitEditing={onSubmit}
                returnKeyType={'done'}
            />
            <TouchableOpacity
                style={[
                    styles.containerSubmitButton,
                    theme === 'light' ? styles.backgroundColorSubmitButtonLight : styles.backgroundColorSubmitButtonDark,
                    isValidationForm ? '' : styles.validationForm
                ]}
                onPress={onSubmit}>
                {isLoadingSubmit ?
                    <Loader />
                    :
                    <Text style={styles.textSubmitButton}>{selectedTranslations.send}</Text>}
            </TouchableOpacity>
            <>
                <Text style={styles.validationText}>{validationPasswordText}</Text>
                <Text style={styles.validationText}>{validationAccess}</Text>
            </>
            {isCheckedPrivacyPolicy !== undefined ?
                <Checkbox isChecked={isCheckedPrivacyPolicy} setChecked={setCheckedPrivacyPolicy} linkText={selectedTranslations.privacyPolicy} linkName={selectedTranslations.privacyPolicyButtonName} link={selectedTranslations.privacyPolicyLink} />
                : <></>}
        </>
    )

}

export default PasswordAndSubmit;
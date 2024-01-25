import { Text, TextInput, TouchableOpacity } from "react-native";

import { useTranslate } from '../../../contexts/translate/TranslateContext';

import styles from "../styles/styles";
import Loader from "../../Loader";
import Checkbox from "../../Checkbox";

function PasswordAndSubmit({
    onSubmit,
    password,
    setPassword,
    isValidationForm,
    validationPasswordText,
    validationAccess,
    isLoadingSubmit,
    theme,
    localeUser,
}) {

    const { selectedTranslations } = useTranslate();

    return (
        <>
            <TextInput
                style={[styles.input]}
                placeholder={selectedTranslations.placeHolderPasswordUpdate}
                value={password}
                onChangeText={setPassword}
                placeholderTextColor={'rgba(0,0,0,0.5)'}
                maxLength={50}
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
                    <Text style={styles.textSubmitButton}>{selectedTranslations.recoverPasswordButtonName}</Text>}
            </TouchableOpacity>
            <>
                <Text style={styles.validationText}>{validationPasswordText}</Text>
                <Text style={styles.validationText}>{validationAccess}</Text>
            </>
        </>
    )

}

export default PasswordAndSubmit;
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, LayoutAnimation } from "react-native";
import ModalWithChildren from "../../modals/ModalWithChildren";
import PasswordAndSubmit from "./FormSignUp/components/PasswordAndSubmit";
import FormTwoTextButton from "../FormTwoTextButton";
import { validationPassword } from "./FormSignUp/components/utils/passwordAndSubmitUtils"; 
import { useTranslate } from "../../../contexts/translate/TranslateContext"; 

function FormRemoveProfile({ isOpenFormDeleteProfile, closeFormDeleteProfile, theme, deleteProfile, loading, localeUser }) {

    const [password, setPassword] = useState('');
    const [isOpenFormPasswordSubmit, setIsOpenFormPasswordSubmit] = useState(false);
    const [isOpenFormTwoButton, setIsOpenFormTwoButton] = useState(true);
    const [isValidationPassword, setIsValidationPassword] = useState(false);
    const [validationPasswordText, setValidationPasswordText] = useState('');

    const { selectedTranslations } = useTranslate();

    function openFormPasswordSubmit() {
        setIsOpenFormPasswordSubmit(true);
        setIsOpenFormTwoButton(false);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }

    function removeProfile() {
        deleteProfile(password);
    }

    function closeForm() {
        closeFormDeleteProfile();
    }

    useEffect(() => {
        validationPassword(
            password,
            setIsValidationPassword,
            setValidationPasswordText,
            selectedTranslations.messageErrorPasswordValue,
            selectedTranslations.messageErrorPasswordLenght,
            selectedTranslations.messageErrorPasswordRegex,
            1
        )
    }, [password])

    useEffect(() => {
        setIsOpenFormPasswordSubmit(false);
        setIsOpenFormTwoButton(true);
    }, [isOpenFormDeleteProfile])

    return (
        <ModalWithChildren
            isVisible={isOpenFormDeleteProfile}
            onClose={closeFormDeleteProfile}
            theme={theme}
            childComponent={
                <View style={styles.containerFormSignOut}>
                    <Text style={styles.titleFormSignOut}>{selectedTranslations.formRemoveProfileName}</Text>
                    {isOpenFormTwoButton ?
                        <FormTwoTextButton
                            text={''}
                            onClickOne={openFormPasswordSubmit}
                            onClickTwo={closeForm}
                            textButtonOne={selectedTranslations.yes}
                            textButtonTwo={selectedTranslations.no}
                            isSubmitLoading={loading}
                        />
                        : <></>}
                    {isOpenFormPasswordSubmit ?
                        <View style={styles.passwordAndSubmit}>
                            <PasswordAndSubmit
                                onSubmit={removeProfile}
                                textSubmitButton={selectedTranslations.removeAccauntUserButtonName}
                                localeUser={localeUser}
                                password={password}
                                setPassword={setPassword}
                                isValidationForm={isValidationPassword}
                                validationPasswordText={validationPasswordText}
                            />
                        </View>
                        : <></>}
                </View>
            }
            isHiddeButtonUpdateAndRemove={true}
        />
    )

}

const styles = StyleSheet.create({
    containerFormSignOut: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
    },
    titleFormSignOut: {
        color: 'rgba(0,0,0,1)',
        fontWeight: '500',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    passwordAndSubmit: {
        paddingTop: 30,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default FormRemoveProfile;
import { View, Text, TextInput, StyleSheet, LayoutAnimation } from 'react-native';
import { useEffect, useState } from 'react';

import apiUser from '../../../utils/api/apiUser';

import ModalWithChildren from '../../modals/ModalWithChildren';
import Button from '../../buttons/Button';

import { regexPassword, regexLogin } from '../../../utils/regex'
import { getToken, getUserId } from '../../../utils/db/secureStore/SecureStore';
import { getDeviceId } from '../../../utils/db/asyncStorage/AsyncStore';

import { useGlobal } from '../../../contexts/global/GlobalContext'; 
import { useTranslate } from '../../../contexts/translate/TranslateContext'; 

function FormUpdateUser({
    visible,
    closeForm,
    theme,
    userAppLogin,
}) {

    const [updatePassword, setUpdatePassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [login, setLogin] = useState('')
    //Валидация
    const [isValidationForm, setValidationForm] = useState(false);
    const [textValidationPasswordForm, setTextValidationPasswordForm] = useState('')
    const [textValidationLoginForm, setTextValidationLoginForm] = useState('')
    //Лоадер
    const [isLoading, setLoading] = useState(false);
    // Отображение
    const [isInputCurrentPassword, setInputCurrentPassword] = useState(false);

    const { selectedTranslations } = useTranslate();
    const { handleChangeUserData, setHandleChangeUserData, auth } = useGlobal();

    // Напполнить инпуты при первой отрисовке 
    useEffect(() => {

        if (userAppLogin) {
            setLogin(userAppLogin);
        }
    }, [userAppLogin])

    function validationPassword() {

        let validPassword = false;

        // updatePassword
        if (updatePassword.length > 0 && updatePassword.length < 4) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setTextValidationPasswordForm(selectedTranslations.messageErrorPasswordLenght);
            validPassword = false;
        } else {
            if (updatePassword !== '') {
                if (!regexPassword.test(updatePassword) && updatePassword.length > 0) {
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                    setTextValidationPasswordForm(selectedTranslations.messageErrorPasswordRegex);
                    validPassword = false;
                } else {

                    if (currentPassword.length > 0) {

                        if (!regexPassword.test(currentPassword)) {
                            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                            setTextValidationPasswordForm(selectedTranslations.messageErrorCurrentPasswordRegex);
                            validPassword = false;
                        } else {
                            setTextValidationPasswordForm('');
                            validPassword = true;
                        }

                    } else {
                        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                        setTextValidationPasswordForm(selectedTranslations.messageErrorCurrentPasswordValue);
                        validPassword = false;
                    }

                }
            } else {
                validPassword = true;
            }
        }

        return validPassword;

    }

    async function validationLogin() {
        let validLogin = false;

        // логин
        if (login === '') {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setTextValidationLoginForm(selectedTranslations.messageErrorLoginValue);
            validLogin = false;
        } else {
            if (!regexLogin.test(login)) {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                setTextValidationLoginForm(selectedTranslations.messageErrorLoginRegex);
                validLogin = false;
            } else {
                setLoading(true);
                const token = await getToken();
                const idDevice = await getDeviceId();
                await apiUser.checkLoginVacation(token, login, idDevice)
                    .then(() => {
                        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                        setTextValidationLoginForm('');
                        validLogin = true;
                        setLoading(false);
                    })
                    .catch(err => {

                        if (err.message === 'Пользователь с таким логином найден') {
                            if (!updatePassword.length > 0 && login !== userAppLogin) {
                                setTextValidationLoginForm(selectedTranslations.messageErrorLoginBusy);
                            } else {
                                setTextValidationLoginForm('');
                            }
                        } else {
                            setTextValidationLoginForm(selectedTranslations.messageErrorLogin);
                        }
                        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                        validLogin = false;

                        setLoading(false);
                    });
            }
        }

        return validLogin;

    }

    // Валидация
    useEffect(() => {

        // Если пользователь внес изменения
        if (updatePassword !== '' || login !== userAppLogin) {

            let validPassword = validationPassword();
            let validLogin = validationLogin();

            if (validPassword === false || validLogin === false) {
                setValidationForm(false);
            } else {
                setValidationForm(true);
            }

        } else {
            setValidationForm(false);
            setTextValidationLoginForm(selectedTranslations.messageErrorNoChanges)
        }
    }, [login, updatePassword, currentPassword])

    useEffect(() => {

        if (updatePassword.length > 0 && !isInputCurrentPassword) {
            setInputCurrentPassword(true);
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        } else if (updatePassword.length === 0 && isInputCurrentPassword) {
            setInputCurrentPassword(false);
            setTextValidationPasswordForm('');
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        }

    }, [updatePassword])

    function onCloseForm() {
        closeForm();
        setLogin(userAppLogin);
        setUpdatePassword('');
        setCurrentPassword('');
    }

    async function submitForm() {
        if (isValidationForm) {
            setLoading(true);

            let userDataUpdate = {};

            if (login !== userAppLogin) {
                userDataUpdate.login = login;
            }
            if (updatePassword) {
                userDataUpdate.updatePassword = updatePassword;
            }
            if (currentPassword) {
                userDataUpdate.currentPassword = currentPassword;
            }

            const idUser = await getUserId();
            const token = await getToken();
            const idDevice = await getDeviceId();
            userDataUpdate.idUser = idUser;

            await apiUser.updateUser(token, userDataUpdate, idDevice)
                .then(() => {
                    setLoading(false);
                    if (login !== userAppLogin) {
                        setHandleChangeUserData(!handleChangeUserData)
                    }
                    onCloseForm();
                })
                .catch(() => {
                    setLoading(false);
                })
        }
    }

    return (
        <ModalWithChildren
            isVisible={visible}
            onClose={onCloseForm}
            theme={theme}
            childComponent={
                <View style={styles.container}>
                    <TextInput
                        style={[styles.input]}
                        placeholder={selectedTranslations.placeHolderLogin}
                        value={login}
                        onChangeText={setLogin}
                        placeholderTextColor={'rgba(0,0,0,0.5)'}
                        maxLength={50}
                    />
                    <Text style={styles.label}>{selectedTranslations.placeHolderLoginUpdateUser}</Text>
                    <TextInput
                        style={[styles.input]}
                        placeholder={'**************'}
                        value={updatePassword}
                        onChangeText={setUpdatePassword}
                        placeholderTextColor={'rgba(0,0,0,0.5)'}
                        maxLength={50}
                    />
                    <Text style={styles.label}>{selectedTranslations.placeHolderPasswordUpdateUser}</Text>
                    {isInputCurrentPassword ?
                        <>
                            <TextInput
                                style={[styles.input]}
                                placeholder={selectedTranslations.placeHolderCurrentPasswordUpdateUser}
                                value={currentPassword}
                                onChangeText={setCurrentPassword}
                                placeholderTextColor={'rgba(0,0,0,0.5)'}
                                maxLength={50}
                            />
                            <Text style={styles.label}>{selectedTranslations.currentPasswordUpdateUserNameInput}</Text>
                        </>
                        : <></>}
                    <View style={styles.buttonSubmit}>
                        <Button
                            onClick={submitForm}
                            text={selectedTranslations.updateButtonName}
                            isLoading={isLoading}
                            disabled={!isValidationForm}
                        />
                    </View>
                    <View style={styles.containerValidation}>
                        {textValidationLoginForm !== '' ?
                            <Text style={styles.textValidation}>{textValidationLoginForm}</Text>
                            : <></>}
                        {textValidationPasswordForm !== '' ?
                            < Text style={styles.textValidation}>{textValidationPasswordForm}</Text>
                            : <></>}
                    </View>
                </ View>
            }
        />
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 50,
    },
    input: {
        color: 'rgba(0,0,0,1)',
        fontWeight: '500',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.5)',
        marginVertical: 5,
        paddingVertical: 3,
        width: '100%',
    },
    buttonSubmit: {
        marginTop: 35,
    },
    opacityButtonSubmit: {
        opacity: 0.3,
    },
    textValidation: {
        paddingTop: 3,
        marginVertical: 0,
        textAlign: 'center',
        color: 'rgba(255, 0, 0, 0.7)',
        fontWeight: '500',
        fontSize: 12,
    },
    containerValidation: {
        width: '100%',
        justifyContent: 'center',
        paddingTop: 10,
    },
    label: {
        width: '100%',
        fontSize: 10,
        color: 'rgba(0,0,0,0.5)',
        textAlign: 'left',
    }
})

export default FormUpdateUser;
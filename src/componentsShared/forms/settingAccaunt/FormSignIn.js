import { BlurView } from '@react-native-community/blur';
import { useEffect, useState, useRef } from "react";
import { Modal, StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Keyboard, KeyboardAvoidingView, LayoutAnimation } from "react-native";
import { useTranslate } from '../../../contexts/translate/TranslateContext';
import { useTheme } from '../../../contexts/theme/ThemeContext';
import Checkbox from '../../checkboxs/Checkbox';
import Button from '../../buttons/Button';

import apiUser from "../../../utils/api/apiUser";
import { regexEmail, regexEmailEn, regexPassword } from "../../../utils/regex";
import { saveToken, saveUserId } from "../../../utils/db/secureStore/SecureStore";
import { getDeviceId } from '../../../utils/db/asyncStorage/AsyncStore';

import imgArrow from "../../../../images/arrow-sm-left-svgrepo-com.png";

function FormSignIn({ visible, onClose, handleSubmit, openRecoveryPassword }) {

    const { selectedTranslations, locale } = useTranslate();
    const { theme } = useTheme();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isCheckedPrivacyPolicy, setCheckedPrivacyPolicy] = useState(false);
    //Валидация
    const [isValidationForm, setValidationForm] = useState('');
    const [validationEmailText, setValidationEmailText] = useState('');
    const [validationPasswordText, setValidationPasswordText] = useState('');
    // Лоадер
    const [isLoading, setLoading] = useState(false);
    //Отображение
    const [isSignIn, setSignIn] = useState(true);
    const [isRecoveryPassword, setRecoveryPassword] = useState(false)
    //Клавиатура
    const [isShowKeyboard, setIsShowKeyboard] = useState(false);
    //Чекбокс
    const [isShowCheckBox, setIsShowCheckBox] = useState(false);

    async function onSubmit() {
        if (isValidationForm) {
            setLoading(true);
            const idDevice = await getDeviceId();
            apiUser.signIn(email, password, idDevice)
                .then(async (info) => {
                    await saveUserId(info.idUser)
                    await saveToken(info.token)
                    setLoading(false);
                    handleSubmit();
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err.message);
                    if (err.message === 'Неверные данные для авторизации') {
                        setValidationEmailText(selectedTranslations.messageErrorAuth)
                    } else if (err.message.includes('Повторная авторизация возможна через')) {
                        if (countriesCIS.includes(locale)) {
                            setValidationEmailText(err.message)
                        } else {
                            setValidationEmailText('Repeat Later')
                        }
                    } else {
                        setValidationEmailText(selectedTranslations.messageError)
                    }
                    setLoading(false);
                })
        }
    }

    function close() {
        onClose();
    }

    function validationEmail(email) {

        let validation = false;

        if (email === '') {
            validation = false;
            setValidationEmailText(selectedTranslations.messageErrorEmailValue);
            return false;
        } else {
            let validationEmail = false;
            if (locale.includes('ru')) {
                validationEmail = !regexEmail.test(email);
            } else {
                validationEmail = !regexEmailEn.test(email);
            }
            if (validationEmail) {
                validation = false;
                if (locale.includes('ru')) {
                    setValidationEmailText(selectedTranslations.messageErrorEmailRegex);
                } else {
                    setValidationEmailText(selectedTranslations.messageErrorEmailRegex);
                }
                return false;
            } else {
                validation = true;
                setValidationEmailText('');
            }
        }

        return validation;
    }

    function validationPassword(password) {

        let validation = false;

        if (password === '') {
            validation = false;
            setValidationPasswordText(selectedTranslations.messageErrorPasswordValue);
        } else {

            if (password.length < 1) {
                validation = false;
                setValidationPasswordText(selectedTranslations.messageErrorPasswordLenght);
            } else {

                if (!regexPassword.test(password)) {
                    validation = false;
                    setValidationPasswordText(selectedTranslations.messageErrorPasswordRegex);
                } else {
                    validation = true;
                    setValidationPasswordText('');
                }

            }
        }

        return validation;
    }

    //Валидация
    useEffect(() => {
        const validationPasswordUser = validationPassword(password);
        const validationEmailUser = validationEmail(email);

        if (validationPasswordUser && validationEmailUser) {
            if (isCheckedPrivacyPolicy) {
                setValidationForm(true);
                setValidationEmailText('');
            } else {
                setValidationForm(false);
                setValidationEmailText('');
                setIsShowCheckBox(true);
            }
        } else {
            setValidationForm(false);
        }

    }, [email, password, isCheckedPrivacyPolicy])

    // Управление клавиатурой 
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setIsShowKeyboard(true);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setIsShowKeyboard(false);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    // Управление инпутами с клавиатуры
    let inputPasswordRef = useRef(null);

    const handleInputEmailSubmit = () => {
        // Фокусировка на следующем TextInput
        if (inputPasswordRef) {
            inputPasswordRef.current.focus();
        }
    };

    const handleInputPasswordSubmit = () => {
        onSubmit()
    };

    return (
        <View>
            <Modal visible={visible} animationType={'slide'} transparent={true} onRequestClose={close}>
                <BlurView
                    style={styles.blur}
                    intensity={70}
                    blurType={'light'}
                    overlayColor="rgba(255,255,255,0.3)"
                />
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={styles.container}>
                        <TouchableOpacity style={styles.buttonClose} onPress={onClose}>
                            <Image source={imgArrow} style={styles.imgButtonClose} />
                        </TouchableOpacity>
                        <>
                            <TextInput
                                style={[styles.input]}
                                placeholder={selectedTranslations.placeHolderEmail}
                                value={email}
                                onChangeText={setEmail}
                                placeholderTextColor={'rgba(0,0,0,0.5)'}
                                maxLength={150}
                                onSubmitEditing={handleInputEmailSubmit}
                                returnKeyType={'next'}
                            />
                            <TextInput
                                style={[styles.input]}
                                placeholder={selectedTranslations.placeHolderPassword}
                                value={password}
                                onChangeText={setPassword}
                                placeholderTextColor={'rgba(0,0,0,0.5)'}
                                maxLength={50}
                                ref={inputPasswordRef}
                                onSubmitEditing={handleInputPasswordSubmit}
                                returnKeyType={'done'}
                            />
                            {isShowCheckBox ?
                                <Checkbox
                                    isChecked={isCheckedPrivacyPolicy}
                                    setChecked={setCheckedPrivacyPolicy}
                                    linkText={selectedTranslations.privacyPolicy}
                                    linkName={selectedTranslations.privacyPolicyButtonName}
                                    link={selectedTranslations.privacyPolicyLink}
                                />
                                : <></>}
                            <View style={styles.containerSubmitButton}>
                                <Button text={selectedTranslations.buttonSignIn} onClick={onSubmit} disabled={!isValidationForm} isLoading={isLoading} />
                            </View>
                        </>
                        <>
                            {validationEmailText !== '' ?
                                <Text style={styles.validationText}>{validationEmailText}</Text>
                                : <></>}
                            {validationPasswordText !== '' ?
                                < Text style={styles.validationText}>{validationPasswordText}</Text>
                                : <></>}
                        </>
                        <TouchableOpacity style={styles.buttonRecoveryPassword} onPress={openRecoveryPassword}>
                            <Text style={styles.textButtonRecoveryPassword}>{selectedTranslations.recoverPasswordButtonName}</Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
            </Modal >
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 30,
        paddingHorizontal: '10%',
    },
    blur: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    input: {
        color: 'rgba(0,0,0,1)',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.5)',
        marginVertical: 5,
        paddingVertical: 3,
        width: '100%',
    },
    containerSubmitButton: {
        zIndex: 3,
        marginTop: 30,
        marginBottom: 10,
    },
    textSubmitButton: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        padding: 10,
    },
    validationForm: {
        opacity: 0.3,
    },
    validationText: {
        textAlign: 'center',
        paddingTop: 3,
        fontSize: 12,
        color: '#5B0000',
    },
    validationTexEmail: {
        textAlign: 'center',
        paddingTop: 30,
        paddingHorizontal: 10,
        fontSize: 12,
        color: 'rgba(0, 0,0,0.8)',
    },
    containerEmailButton: {
        width: '100%',
        borderBottomColor: 'rgba(0,0,0,0.8)',
        borderBottomWidth: 1,
    },
    email: {
        paddingVertical: 3,
    },
    buttonClose: {
        position: 'absolute',
        width: '100%',
        top: 70,
        left: 20,
        paddingBottom: 10,
        opacity: 0.7,
    },
    imgButtonClose: {
        width: 30,
        height: 30,
    },
    buttonRecoveryPassword: {
        marginTop: 10,
        marginBottom: 10,
        paddingVertical: 10,
        borderRadius: 50,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0,3)',
    },
    textButtonRecoveryPassword: {
        color: 'rgba(0,0,0,1)',
        fontSize: 12,
        fontWeight: 'bold',
    }
})

export default FormSignIn;
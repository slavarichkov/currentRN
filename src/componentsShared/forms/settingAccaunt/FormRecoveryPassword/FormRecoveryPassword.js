import { useEffect, useState } from "react";
import { Modal, TouchableOpacity, Image, Keyboard, KeyboardAvoidingView, LayoutAnimation } from "react-native";
import { BlurView } from '@react-native-community/blur';

import { useGlobal } from "../../../../contexts/global/GlobalContext";
import { useTranslate } from "../../../../contexts/translate/TranslateContext";

import { saveToken, saveUserId } from "../../../../utils/db/secureStore/SecureStore";
import { regexEmail, regexEmailEn, regexPassword, regexVerificationCode } from "../../../../utils/regex";
import { getDeviceId } from "../../../../utils/db/asyncStorage/AsyncStore";

import apiUser from "../../../../utils/api/apiUser";

import EmailVerificationCode from "../FormSignUp/components/EmailVerificationCode";
import SenderVerificationCode from "../FormSignUp/components/SenderVerificationCode";
import PasswordAndSubmit from "../FormSignUp/components/PasswordAndSubmit";

import styles from "./styles/styles";
import imgArrow from "../../../../../images/arrow-sm-left-svgrepo-com.png";

function FormRecoveryPassword({ visible, onClose, theme, handleSubmit }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verificationСode, setVerificationСode] = useState('');
    //Валидация
    const [isValidationFormEmailVerificationCode, setValidationFormEmailVerificationCode] = useState(false);
    const [validationEmailText, setValidationEmailText] = useState('');
    const [isValidationPassword, setIsValidationPassword] = useState(false);
    const [validationPasswordText, setValidationPasswordText] = useState('');
    const [validationAccess, setValidationAccess] = useState('');
    const [isValidVerificationСode, setIsValidVerification] = useState(false);
    const [validationMessageSenderVerificationCode, setValidationMessageSenderVerificationCode] = useState('');
    //Отображение 
    const [isInputCodeVerificationShow, setIsInputCodeVerificationShow] = useState(true); // Отобразить инпут для отправки кода на почту
    const [isSendVerificationCode, setVerificationCode] = useState(false);
    const [passwordAndSubmit, setPasswordAndSubmit] = useState(false);
    //Лоадеры
    const [isLoadingEmail, setLoadingCheckVacationEmail] = useState(false);
    const [isLoadingSendVerificationCode, setIsLoadingSendVerificationCode] = useState(false);
    const [isLoadingSignUp, setIsLoadingSignUp] = useState(false);
    //Клавиатура
    const [isShowKeyboard, setIsShowKeyboard] = useState(false);

    const { setAuth } = useGlobal();
    const { selectedTranslations, locale } = useTranslate();

    async function onSubmit() {
        try {
            if (isValidationPassword) {
                setIsLoadingSignUp(true);
                const idDevice = await getDeviceId();
                const info = await apiUser.recoveryPassword(password, email, idDevice);
                const token = info.token;
                await saveToken(token);
                await saveUserId(info.idUser)
                setIsLoadingSignUp(false);
                setAuth(true);
                handleSubmit();
                close();
            }
        }
        catch (error) {
            setIsLoadingSignUp(false);
            setValidationAccess(selectedTranslations.messageErrorRecoveryPassword)
        }
    }

    function close() {
        onClose();
        setIsInputCodeVerificationShow(true);
        setVerificationCode(false);
        setPasswordAndSubmit(false);


    }

    async function validationEmail(email) {

        if (email === '') {
            setValidationFormEmailVerificationCode(false);
            setValidationEmailText(selectedTranslations.messageErrorEmailValue);
        } else {

            let emailRegex = false;
            if (locale === 'ru') {
                emailRegex = !regexEmail.test(email);
            } else {
                emailRegex = !regexEmailEn.test(email);
            }

            if (emailRegex) {
                setValidationFormEmailVerificationCode(false);
                if (locale === 'ru') {
                    setValidationEmailText(translations.ru.messageErrorEmailRegex);
                } else {
                    setValidationEmailText(translations.en.messageErrorEmailRegex);
                }
            } else {

                setLoadingCheckVacationEmail(true);
                const idDevice = await getDeviceId();
                apiUser.checkEmailVaction(email, idDevice)
                    .then((message) => {

                        setLoadingCheckVacationEmail(false);
                        setValidationFormEmailVerificationCode(true);
                        setValidationEmailText('');

                    })
                    .catch(err => {

                        setLoadingCheckVacationEmail(false);

                        if (err.message === 'Пользователь с такой почтой не найден') {
                            setValidationFormEmailVerificationCode(false);
                            setValidationEmailText(selectedTranslations.messageErrorEmailNotFound);
                        } else {
                            console.log(err)
                            setValidationFormEmailVerificationCode(false);
                            setValidationEmailText(selectedTranslations.messageError);
                        }

                    });
            }
        }
    }

    function validationPassword(password) {

        if (password === '') {
            setIsValidationPassword(false);
            setValidationPasswordText(selectedTranslations.messageErrorPasswordValue);
        } else {

            if (password.length < 4) {
                setIsValidationPassword(false);
                setValidationPasswordText(selectedTranslations.messageErrorPasswordLenght);
            } else {

                if (!regexPassword.test(password)) {
                    setIsValidationPassword(false);
                    setValidationPasswordText(selectedTranslations.messageErrorPasswordRegex);
                } else {
                    setIsValidationPassword(true);
                    setValidationPasswordText('');
                }

            }
        }
    }

    function validationVerificationСode(verificationСode) {

        if (verificationСode.length > 1 && verificationСode.length < 70) {
            if (!regexVerificationCode.test(verificationСode)) {
                setIsValidVerification(false);
                setValidationMessageSenderVerificationCode(selectedTranslations.messageErrorVerificationCodeRegex)
            } else {
                setIsValidVerification(true);
                setValidationMessageSenderVerificationCode('')
            }
        } else {
            setIsValidVerification(false);
            setValidationMessageSenderVerificationCode(selectedTranslations.messageErrorVerificationCodeValue)
        }

    }

    // Отправить проверочный код на почту пользователя
    async function sendVerificationCode() {

        if (isValidationFormEmailVerificationCode) {
            setIsLoadingSendVerificationCode(true);

            let timer = new Date();
            let currentTime = new Date(); // Текущее время

            // Разница в секундах
            let timeDifferenceInSeconds = Math.floor((currentTime - timer) / 1000);

            if (currentTime >= timer) {
                const idDevice = await getDeviceId();
                apiUser.sendVerificationEmail(email, idDevice)
                    .then((message) => {
                        timer.setMinutes(timer.getMinutes() + 1); // Увеличить на 1 минуту
                        setIsInputCodeVerificationShow(false);
                        setVerificationCode(true);
                        setIsLoadingSendVerificationCode(false);
                    })
                    .catch((err) => {
                        if (err.message.includes("Повторная отправка кода")) {
                            if (countriesCIS.includes(localeUser)) {
                                setValidationEmailText(err.message);
                            } else {
                                setValidationEmailText('Repeat later');
                            }
                        } else {
                            setValidationEmailText(selectedTranslations.messageErrorVerificationSend);
                        }
                        console.log(err)
                        setIsLoadingSendVerificationCode(false);
                    })
            } else {
                setValidationEmailText(`${messageErrorVerificationSendRepeatTimer} ${timeDifferenceInSeconds}`);
                setIsLoadingSendVerificationCode(false);
            }
        }
    }

    function updateEmail() {
        setIsInputCodeVerificationShow(true); // возвращает на страницу ввода почты
        setVerificationCode(false);
    }

    async function verificateEmail() {
        if (isValidVerificationСode) {
            setIsLoadingSendVerificationCode(true);
            const idDevice = await getDeviceId();
            apiUser.verificationEmail(email, verificationСode, idDevice)
                .then(() => {
                    setVerificationCode(false);
                    setIsLoadingSendVerificationCode(false);
                    setPasswordAndSubmit(true);
                })
                .catch((err) => {
                    console.log(err)
                    setValidationMessageSenderVerificationCode(selectedTranslations.messageError)
                    if (err.message.includes('Повторная авторизация')) {
                        if (countriesCIS.includes(localeUser)) {
                            setValidationMessageSenderVerificationCode(err.message)
                        } else {
                            setValidationEmailText('Repeat later');
                        }
                    }
                    if (err.message.includes('код')) {
                        if (countriesCIS.includes(localeUser)) {
                            setValidationMessageSenderVerificationCode(err.message)
                        } else {
                            setValidationEmailText('Repeat later');
                        }
                    }
                    setIsLoadingSendVerificationCode(false);
                });
        }

    }

    //Валидация
    useEffect(() => {

        validationPassword(password)
        validationEmail(email)
        validationVerificationСode(verificationСode)

    }, [email, password, verificationСode])

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

    useEffect(() => {
        const configureKeyboardLayoutAnimation = () => {
          LayoutAnimation.configureNext(LayoutAnimation.create(
            250, // длительность анимации в миллисекундах
            LayoutAnimation.Types.easeInEaseOut, // тип анимации
            LayoutAnimation.Properties.opacity, // свойство, по которому происходит анимация
          ));
        };
    
        const keyboardDidShowListener = Keyboard.addListener(
          Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow',
          configureKeyboardLayoutAnimation
        );
    
        const keyboardDidHideListener = Keyboard.addListener(
          Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide',
          configureKeyboardLayoutAnimation
        );
    
        return () => {
          keyboardDidShowListener.remove();
          keyboardDidHideListener.remove();
        };
      }, []);

    return (
        <Modal visible={visible} animationType={'slide'} transparent={true} onRequestClose={close}>
            <BlurView style={styles.blur} intensity={90} blurType={'light'} />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}>
                <TouchableOpacity style={styles.buttonClose} onPress={close}>
                    <Image source={imgArrow} style={styles.imgButtonClose} />
                </TouchableOpacity>

                {/* ОТПРАВКА КОДА НА ПОЧТУ*/}
                {isInputCodeVerificationShow ?
                    <EmailVerificationCode
                        email={email} setEmail={setEmail}
                        sendVerificationCode={sendVerificationCode}
                        validationEmailText={validationEmailText}
                        isLoadingEmail={isLoadingEmail}
                        isValidationForm={isValidationFormEmailVerificationCode}
                        theme={theme}
                        localeUser={locale}
                    />
                    : <></>}

                {/* ОТПРАВИТЬ КОД НА ПРОВЕРКУ */}
                {isSendVerificationCode ?
                    <SenderVerificationCode
                        updateEmail={updateEmail}
                        verificateEmail={verificateEmail}
                        email={email}
                        verificationСode={verificationСode}
                        setVerificationСode={setVerificationСode}
                        isValidationForm={isValidVerificationСode}
                        validationMessage={validationMessageSenderVerificationCode}
                        isLoadingSendVerificationCode={isLoadingSendVerificationCode}
                        theme={theme}
                        localeUser={locale}
                    />
                    : <></>}
                {/* Если почта подтверждена */}
                {passwordAndSubmit ?
                    <PasswordAndSubmit
                        onSubmit={onSubmit}
                        password={password}
                        setPassword={setPassword}
                        isValidationForm={isValidationPassword}
                        validationPasswordText={validationPasswordText}
                        validationAccess={validationAccess}
                        theme={theme}
                        isLoadingSubmit={isLoadingSignUp}
                        localeUser={locale}
                    />
                    : <></>
                }
            </KeyboardAvoidingView>
        </Modal >
    )

}



export default FormRecoveryPassword;
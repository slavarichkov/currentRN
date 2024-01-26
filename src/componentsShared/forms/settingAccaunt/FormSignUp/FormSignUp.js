import { BlurView } from '@react-native-community/blur';
import { useEffect, useState } from "react";
import { Modal, View, TouchableOpacity, Image } from "react-native";
import { useTranslate } from '../../../../contexts/translate/TranslateContext.tsx';
import apiUser from "../../../../utils/api/apiUser.ts";
import { saveToken, saveUserId } from "../../../../utils/db/secureStore/SecureStore.js";

import EmailVerificationCode from "./components/EmailVerificationCode.js";
import SenderVerificationCode from "./components/SenderVerificationCode.js";
import PasswordAndSubmit from "./components/PasswordAndSubmit.js";

import styles from "./components/styles/styles.js"
import { regexEmail, regexPassword, regexVerificationCode } from "../../../../utils/regex.ts";

import imgArrow from "../../../../../images/arrow-sm-left-svgrepo-com.png";
import { getDeviceId } from '../../../../utils/db/asyncStorage/AsyncStore.ts';

function FormSignUp({ visible, onClose, theme, handleSubmit }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verificationСode, setVerificationСode] = useState('');
    //Подтверждение политики
    const [privacyPolicy, setPrivacyPolicy] = useState(false);
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

    const { locale } = useTranslate();

    async function onSubmit() {
        try {
            if (isValidationPassword) {
                setIsLoadingSignUp(true);
                const idDevice = await getDeviceId();
                const info = await apiUser.signUp(email, password, idDevice)
                const token = info.token;
                await saveToken(token);
                await saveUserId(info.userId)
                setIsLoadingSignUp(false);
                handleSubmit();
                close();
            }
        }
        catch (error) {
            setIsLoadingSignUp(false);
            setValidationAccess('Ошибка при регистрации')
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
            setValidationEmailText('Не заполнен Email');
        } else {

            if (!regexEmail.test(email)) {
                setValidationFormEmailVerificationCode(false);
                setValidationEmailText('Не допустимые символы в Email - почта должна содержать @ и оканчиваться на .ru или .рф');
            } else {

                setLoadingCheckVacationEmail(true);
                const idDevice = await getDeviceId();
                apiUser.checkEmailVaction(email, idDevice)
                    .then((message) => {

                        setLoadingCheckVacationEmail(false);

                        if (message.message === 'Пользователь с такой почтой существует') {
                            setValidationFormEmailVerificationCode(false);
                            setValidationEmailText('Пользователь с такой почтой существует');
                        } else {
                            setValidationFormEmailVerificationCode(true);
                            setValidationEmailText('');
                        }
                    })
                    .catch(err => {
                        setLoadingCheckVacationEmail(false);

                        if (err.message === 'Пользователь с такой почтой не найден') {
                            setValidationFormEmailVerificationCode(true);
                            setValidationEmailText('');
                        } else {
                            console.log(err)
                            setValidationFormEmailVerificationCode(false);
                            setValidationEmailText('Ошибка на сервере');
                        }

                    });
            }
        }
    }

    function validationPassword(password) {

        if (password === '') {
            setIsValidationPassword(false);
            setValidationPasswordText('Не заполнен Пароль');
        } else {

            if (password.length < 4) {
                setIsValidationPassword(false);
                setValidationPasswordText('Минимальная длина пароля 4 символа');
            } else {

                if (!regexPassword.test(password)) {
                    setIsValidationPassword(false);
                    setValidationPasswordText('Не допустимые символы в Пароле');
                } else {

                    if (privacyPolicy) {
                        setIsValidationPassword(true);
                        setValidationPasswordText('');
                    } else {
                        setIsValidationPassword(false);
                        setValidationPasswordText('Не принята политика конфиденциальности');
                    }

                }

            }
        }
    }

    function validationVerificationСode(verificationСode) {

        if (verificationСode.length > 1 && verificationСode.length < 70) {
            if (!regexVerificationCode.test(verificationСode)) {
                setIsValidVerification(false);
                setValidationMessageSenderVerificationCode('Не допустимые символы')
            } else {
                setIsValidVerification(true);
                setValidationMessageSenderVerificationCode('')
            }
        } else {
            setIsValidVerification(false);
            setValidationMessageSenderVerificationCode('Не заполнен код')
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
                            setValidationEmailText(err.message);
                        } else {
                            setValidationEmailText('Ошибка при отправке проверочного кода');
                        }
                        console.log(err)
                        setIsLoadingSendVerificationCode(false);
                    })
            } else {
                setValidationEmailText(`Повторная отправка кода возможна через ${timeDifferenceInSeconds} секунд`);
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
                    setValidationMessageSenderVerificationCode('Произошла ошибка')
                    if (err.message.includes('Повторная авторизация')) {
                        setValidationMessageSenderVerificationCode(err.message)
                    }
                    if (err.message.includes('код')) {
                        setValidationMessageSenderVerificationCode(err.message)
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

    }, [email, password, verificationСode, privacyPolicy])

    return (
        <Modal visible={visible} animationType={'slide'} transparent={true} onRequestClose={close}>
            <BlurView style={styles.blur} intensity={10} blurType='light' />
            <View style={styles.container}>
                <TouchableOpacity style={styles.buttonClose} onPress={onClose}>
                    <Image source={imgArrow} style={styles.imgButtonClose} />
                </TouchableOpacity>
                <View style={{ width: '80%', justifyContent: 'center', alignItems: 'center' }}>
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
                            isCheckedPrivacyPolicy={privacyPolicy}
                            setCheckedPrivacyPolicy={setPrivacyPolicy}
                            theme={theme}
                            isLoadingSubmit={isLoadingSignUp}
                        />
                        : <></>
                    }
                </View>
            </View>
        </Modal >
    )

}



export default FormSignUp;
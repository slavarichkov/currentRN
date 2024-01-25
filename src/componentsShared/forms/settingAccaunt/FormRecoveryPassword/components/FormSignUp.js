import { BlurView } from "expo-blur";
import { useEffect, useState } from "react";
import { Modal, View, Text, TouchableOpacity, Image } from "react-native";

import apiUser from "../../utils/api/apiUser";
import { saveToken, saveUserId } from "../../utils/SecureStore";

import EmailVerificationCode from "./components/EmailVerificationCode";
import SenderVerificationCode from "./components/SenderVerificationCode";
import PasswordAndSubmit from "./components/PasswordAndSubmit";

import styles from "./styles/styles"
import { regexEmail, regexPassword, regexVerificationCode } from "../../utils/regex/regex";

import imgArrow from "../../images/Buttons/light/arrow-sm-left-svgrepo-com.png";

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

    async function onSubmit() {
        try {
            if (isValidationPassword) {
                setIsLoadingSignUp(true);
                const info = await apiUser.signUp(email, password)
                console.log(info)
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

    function validationEmail(email) {

        if (email === '') {
            setValidationFormEmailVerificationCode(false);
            setValidationEmailText('Не заполнен Email');
        } else {

            if (!regexEmail.test(email)) {
                setValidationFormEmailVerificationCode(false);
                setValidationEmailText('Не допустимые символы в Email - почта должна содержать @ и оканчиваться на .ru или .рф');
            } else {

                setLoadingCheckVacationEmail(true);

                apiUser.checkEmailVaction(email)
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
    function sendVerificationCode() {

        if (isValidationFormEmailVerificationCode) {
            setIsLoadingSendVerificationCode(true);

            let timer = new Date();
            let currentTime = new Date(); // Текущее время

            // Разница в секундах
            let timeDifferenceInSeconds = Math.floor((currentTime - timer) / 1000);

            if (currentTime >= timer) {
                apiUser.sendVerificationEmail(email)
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

    function verificateEmail() {
        if (isValidVerificationСode) {
            setIsLoadingSendVerificationCode(true);

            apiUser.verificationEmail(email, verificationСode)
                .then(() => {
                    setVerificationCode(false);
                    setIsLoadingSendVerificationCode(false);
                    setPasswordAndSubmit(true);
                })
                .catch((err) => {
                    console.log(err)
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
            <BlurView style={styles.blur} intensity={90}>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.buttonClose}>
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
            </BlurView>
        </Modal >
    )

}



export default FormSignUp;
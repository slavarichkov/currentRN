import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

//Контекст
import { useTheme } from '../../../contexts/theme/ThemeContext';
import { useGlobal } from '../../../contexts/global/GlobalContext';
import { useTranslate } from '../../../contexts/translate/TranslateContext';
import { deleteToken, getToken, getUserId, saveUserId } from "../../../utils/db/secureStore/SecureStore";
import { getDeviceId } from "../../../utils/db/asyncStorage/AsyncStore";
import apiUser from "../../../utils/api/apiUser";

import ButtonSetting from "./components/ButtonSetting";
import FormSignUp from "../../../componentsShared/forms/settingAccaunt/FormSignUp/FormSignUp";
import FormSignIn from "../../../componentsShared/forms/settingAccaunt/FormSignIn";
import FormUpdateUser from "../../../componentsShared/forms/settingAccaunt/FormUpdateUser";
import FormRecoveryPassword from "../../../componentsShared/forms/settingAccaunt/FormRecoveryPassword/FormRecoveryPassword";
import FormLogOut from "../../../componentsShared/forms/settingAccaunt/FormLogOut";
import FormRemoveProfile from "../../../componentsShared/forms/settingAccaunt/FormRemoveProfile";
import Button from "../../../componentsShared/buttons/Button";


function GlobalSettingScreen() {

    const { backgroundColor, colorText, changeTheme, theme } = useTheme();
    const { address, auth, userData, isAuthLoading, handleChangeUserData, setHandleChangeUserData, } = useGlobal();
    const { selectedTranslations, changeLocaleUser, locale } = useTranslate();

    const [isOpenFormSignUp, setIsOpenFormSignUp] = useState(false);
    const [isOpenFormSignIn, setIsOpenFormSignIn] = useState(false);
    const [isOpenFormUpdateUser, setIsOpenFormUpdateUser] = useState(false);
    const [isOpenFormSignOut, setIsOpenFormSignOut] = useState(false);
    const [isOpenFormDeleteProfile, setIsOpenFormDeleteProfile] = useState(false);
    const [isOpenFormRecoveryPassword, setIsOpenFormRecoveryPassword] = useState(false);
    // Данные профиля
    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');
    const [isNotification, setIsNotification] = useState(false);

    function openFormDeleteProfile() {
        setIsOpenFormDeleteProfile(true);
    }

    function closeFormDeleteProfile() {
        setIsOpenFormDeleteProfile(false);
    }

    function openFormSignOut() {
        setIsOpenFormSignOut(true);
    }

    function closeFormSignUp() {
        setIsOpenFormSignUp(false);
    }

    function handleSuccessfulRegistration() {
        setHandleChangeUserData(!handleChangeUserData); // Произойдет повторная авторизация для проверки
        closeFormSignUp();
    }

    function openFormSignUp() {
        setIsOpenFormSignUp(true);
    }

    function openFormSignIn() {
        setIsOpenFormSignIn(true);
    }

    function openFormUpdateUser() {
        setIsOpenFormUpdateUser(true);
    }

    function closeFormUpdateUser() {
        setIsOpenFormUpdateUser(false);
    }

    function closeFormSignIn() {
        setIsOpenFormSignIn(false);
    }

    function handleSuccessfulSignIn() {
        setHandleChangeUserData(!handleChangeUserData); // Произойдет повторная авторизация для проверки
        closeFormSignIn();
    }

    function openFormRecoveryPassword() {
        setIsOpenFormRecoveryPassword(true);
        setIsOpenFormSignIn(false);
    }

    function closeFormRecoveryPassword() {
        setIsOpenFormRecoveryPassword(false);
    }

    function handleAccessRecoveryPassword() {

    }

    function closeFormSignOut() {
        setIsOpenFormSignOut(false);
    }

    async function logOut() {
        const token = await getToken();
        const idUser = await getUserId();
        const idDevice = await getDeviceId();
        await apiUser.logOut(idUser, idDevice, token);
        await deleteToken();
        await saveUserId('userId');
        closeFormSignOut();
        setHandleChangeUserData(!handleChangeUserData); // Произойдет повторная авторизация для проверки
    }

    async function removeProfile(password: string) {

        try {
            const token = await getToken();
            const idUser = await getUserId();
            const idDevice = await getDeviceId();

            apiUser.removeProfile(token, idUser, password, idDevice);
            await deleteToken();
            await saveUserId('userId');
            closeFormSignOut();
            setHandleChangeUserData(!handleChangeUserData); // Произойдет повторная авторизация для проверки
        }
        catch (err) {
            console.log(err)
        }

    }


    useEffect(() => {
        console.log("userData", userData.email)
        if (auth && userData) {
            console.log("userData")
            const userEmail = userData.email;
            setEmail(userEmail);
            const userLogin = userData.login;
            setLogin(userLogin);
        }
    }, [userData, auth])

    return (
        <View style={[styles.container, backgroundColor]}>
            <View style={[styles.containerClientInfo, { backgroundColor: 'rgba(0,0,0,0.3)' }]}>
                {auth ?
                    <>
                        <View style={styles.containerTextClientInfo}>
                            <Text style={[styles.text, colorText]}>{selectedTranslations.settingClientInfoEmail}: {email ? email : ''}</Text>
                            <Text style={[styles.text, colorText]}>{selectedTranslations.settingClientInfoLogin}: {login}</Text>
                        </View>
                        <Button text={selectedTranslations.updateButtonName} onClick={openFormUpdateUser} />
                    </>
                    :
                    <View style={styles.containerAuthBitton}>
                        <View style={styles.buttonAuth}>
                            <Button text={selectedTranslations.signUpButtonName} onClick={openFormSignUp} />
                        </View>
                        <Button text={selectedTranslations.signInButtonName} onClick={openFormSignIn} isLoading={isAuthLoading} />
                    </View>
                }
            </View>
            {/* Выбор темы */}
            <View style={[styles.containerButtons, { backgroundColor: 'rgba(0,0,0,0.3)' }]}>
                <ButtonSetting text={selectedTranslations.lightThemeButtonName} onClick={() => changeTheme('light')} />
                <Text style={[styles.textNameButtonContainer, colorText]}>{selectedTranslations.buttonNameTheme}</Text>
                <ButtonSetting text={selectedTranslations.darkThemeButtonName} onClick={() => changeTheme('dark')} />
            </View>
            {auth ?
                <View style={[styles.containerButtons, { backgroundColor: 'rgba(0,0,0,0.3)' }]}>
                    <ButtonSetting text={selectedTranslations.removeAccauntUserButtonName} onClick={openFormDeleteProfile} isLoading={isAuthLoading} />
                    <Text style={[styles.textNameButtonContainer, colorText]}>{selectedTranslations.buttonNameProfile}</Text>
                    <ButtonSetting text={selectedTranslations.signOutButtonName} onClick={openFormSignOut} isLoading={isAuthLoading} />
                </View>
                : <></>}
            {/* Выбор Языка */}
            <View style={[styles.containerButtons, { backgroundColor: 'rgba(0,0,0,0.3)' }]}>
                <ButtonSetting text={selectedTranslations.en} onClick={() => changeLocaleUser('en')} />
                <Text style={[styles.textNameButtonContainer, colorText]}>{selectedTranslations.buttonNameLanguage}</Text>
                <ButtonSetting text={selectedTranslations.ru} onClick={() => changeLocaleUser('ru')} />
            </View>

            <FormSignUp
                handleSubmit={handleSuccessfulRegistration}
                visible={isOpenFormSignUp}
                theme={theme}
                onClose={closeFormSignUp}
            />
            <FormSignIn
                visible={isOpenFormSignIn}
                handleSubmit={handleSuccessfulSignIn}
                onClose={closeFormSignIn}
                openRecoveryPassword={openFormRecoveryPassword}
            />
            <FormUpdateUser
                visible={isOpenFormUpdateUser}
                closeForm={closeFormUpdateUser}
                theme={theme}
                userAppLogin={login}
            />
            <FormRecoveryPassword
                visible={isOpenFormRecoveryPassword}
                onClose={closeFormRecoveryPassword}
                theme={theme}
                handleSubmit={handleAccessRecoveryPassword}
            />
            <FormLogOut
                isOpenFormSignOut={isOpenFormSignOut}
                closeFormSignOut={closeFormSignOut}
                logOut={logOut}
                theme={theme}
                localeUser={locale} />
            <FormRemoveProfile
                loading={false}
                isOpenFormDeleteProfile={isOpenFormDeleteProfile}
                closeFormDeleteProfile={closeFormDeleteProfile}
                theme={theme}
                deleteProfile={removeProfile}
                localeUser={locale}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        paddingStart: 25,
        //justifyContent: 'center',
        alignItems: 'center',
    },
    containerButtons: {
        marginTop: 20,
        alignItems: 'center',
        width: '90%',
        padding: 20,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textNameButtonContainer: {
        fontSize: 15,
        fontWeight: '500',
        color: 'rgba(0,0,0,1)',
    },
    containerClientInfo: {
        marginTop: 30,
        alignItems: 'center',
        width: '90%',
        padding: 20,
        borderRadius: 20,
    },
    containerTextClientInfo: {
        color: 'rgba(0,0,0,1)',
        paddingBottom: 20,
        width: '100%',
    },
    text: {
        color: 'rgba(0,0,0,1)',
        fontSize: 17,
    },
    containerAuthBitton: {
        //flexDirection: 'row',
    },
    buttonAuth: {
        marginVertical: 15,
    },
})

export default GlobalSettingScreen;
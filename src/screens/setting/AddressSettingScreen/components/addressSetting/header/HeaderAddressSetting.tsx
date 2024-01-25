import { useEffect, useState } from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { useTranslate } from '../../../../../../contexts/translate/TranslateContext';
import { useTheme } from '../../../../../../contexts/theme/ThemeContext';
import { useGlobal } from "../../../../../../contexts/global/GlobalContext";

import apiUser from "../../../../../../utils/api/apiUser";

import ActiveAddress from "../activeAddress/ActiveAddress";
import Switcher from "../../../../../../componentsShared/switchers/Switcher";
import ModalWithChildren from "../../../../../../componentsShared/modals/ModalWithChildren";
import { getToken, getUserId } from "../../../../../../utils/db/secureStore/SecureStore";
import { getFcmToken } from "../../../../../../utils/push/pushUtils";
import { getDeviceId, savePushTokenToAsyncStorage } from "../../../../../../utils/db/asyncStorage/AsyncStore";

/**
 * Заголовок для экрана настроек адресов.
 *
 * @component
 * @example
 * // Пример использования компонента:
 * <HeaderAddressSetting />
 */
const HeaderAddressSetting = () => {

    const { selectedTranslations } = useTranslate();
    const { colorText } = useTheme();
    const { auth, userData } = useGlobal();
    const [isNotification, setIsNotification] = useState<boolean>(false);
    const [isOpenInfoTool, setIsOpenInfoTool] = useState<boolean>(false);

    async function onNotifications() {

        if (auth) {
            try {
                const token = await getToken();
                const idUser = await getUserId();
                let data = {
                    stateNotifications: true,
                };

                const pushFMCToken = await getFcmToken();
                
                if (pushFMCToken) {
                    await savePushTokenToAsyncStorage(pushFMCToken);
                    data.pushToken = pushFMCToken;
                    const idDevice = await getDeviceId();
                    await apiUser.controlNotifications(token, idUser, data, idDevice);
                } else {
                    setIsNotification(false);
                }

            }
            catch (err) {
                setIsNotification(false);
                console.log(err)
            }
        } else {
            setIsOpenInfoTool(true);
        }
    }

    async function offNotifications() {
        try {
            const token = await getToken();
            const idUser = await getUserId();
            const idDevice = await getDeviceId();
            let data = {
                stateNotifications: false,
            };
            await apiUser.controlNotifications(token, idUser, data, idDevice);
            setIsNotification(false);

        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {

        if (auth && userData) {
            const isNotification = userData.notificationsEnabled
            setIsNotification(isNotification);
        }

    }, [userData, auth])

    return (
        <View style={styles.container}>
            {/* <Text style={[styles.title, colorText]}>{selectedTranslations.settingsScreen}</Text> */}
            <ActiveAddress />
            {/* Уведомления */}
            <View style={[styles.containerSwitcher]}>
                <Switcher
                    textOn={selectedTranslations.switherNotification} textOff={selectedTranslations.switherNotification}
                    on={onNotifications} off={offNotifications}
                    isEnabled={isNotification} setIsEnabled={auth ? setIsNotification : () => { }}
                />
                <Text style={[styles.switcherText, colorText]}>{selectedTranslations.remindNotifications}</Text>
            </View>
            <Text style={[styles.subTitle, colorText]}>{selectedTranslations.addresses}</Text>
            <Text style={[styles.instrucetion, colorText]}>{selectedTranslations.instructionAddress}</Text>
            <ModalWithChildren
                isVisible={isOpenInfoTool}
                onClose={() => setIsOpenInfoTool(false)}
                childComponent={
                    <Text style={[styles.info, colorText]}>{selectedTranslations.needAuth}</Text>
                }
            />
        </View>
    )
}

// Получение ширины экрана
const screenWidth = Dimensions.get('window').width * 0.8;

const styles = StyleSheet.create({
    container: {
        width: screenWidth,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 17,
        fontWeight: '700',
        textAlign: 'center',
        paddingTop: 30,
    },
    subTitle: {
        fontSize: 15,
        fontWeight: '700',
        textAlign: 'center',
        paddingTop: 10,
    },
    instrucetion: {
        fontSize: 12,
        fontWeight: '400',
        paddingTop: 10,
        paddingBottom: 20,
    },
    containerSwitcher: {
        marginTop: 20,
        alignItems: 'center',
        width: '100%',
        padding: 20,
        borderRadius: 20,
        flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,0.1)',
        marginBottom: 30,
    },
    switcherText: {
        fontSize: 12,
        fontWeight: '400',
        paddingLeft: 10,
    },
    info: {
        paddingTop: 30,
        paddingBottom: 10,
        fontSize: 17,
        fontWeight: '500',
        textAlign: 'center',
        color: 'rgba(0,0,0,1)',
    }
})

export default HeaderAddressSetting;
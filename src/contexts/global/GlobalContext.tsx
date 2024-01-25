import React, { createContext, useEffect, useState, useContext } from 'react';
import * as Localization from 'react-native-localize';
import {
    openOrCreateDatabase as openOrCreateDatabaseAddresses,
    getAllAddresses,
    createNewAddress,
} from '../../utils/db/SQLite/dbAddress';
import { TypeAddress, TypeAddressData } from '../../utils/types/addressTypes';
import { openOrCreateDatabaseMeterCounterRecord } from '../../utils/db/SQLite/dbMeterReadingSubmission';
import apiUser from '../../utils/api/apiUser';
import { getToken, getUserId, saveUserId } from '../../utils/db/secureStore/SecureStore';
import { generateAndSaveDeviceId, getDeviceId } from '../../utils/db/asyncStorage/AsyncStore';
import { Platform } from 'react-native';

/**
     * Контекст для работы с общей информацией: адрес.
     *
     */
const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {

    const firstAddressRu = {
        name: 'Первый адрес',
        arrayCountersName: JSON.stringify(['Холодная вода', 'Горячая вода', 'Электричество', 'Отопление', 'Газ']),
        city: 'Адрес: Город',
        street: 'Улица',
        building: 'Здание',
        apartment: 'Помещение',
        email: 'email@email.ru',
        active: 'true',
    }

    const firstAddressEn = {
        name: 'First Address',
        arrayCountersName: JSON.stringify(['Холодная вода', 'Горячая вода', 'Электричество', 'Отопление', 'Газ']),
        city: 'You city',
        street: 'You street',
        building: 'You building',
        apartment: 'You apartment',
        email: 'email@email.ru',
        active: 'true',
    }

    const [address, setAddress] = useState<TypeAddressData | TypeAddress>();
    const [addressesArray, setAddresses] = useState<TypeAddressData[]>([]);
    const [counterNamesArray, setCounters] = useState<string[]>([]);
    // Пользователь
    const [auth, setAuth] = useState(false);
    const [userData, setUserData] = useState({}); // объект данных о юзере
    const [handleChangeUserData, setHandleChangeUserData] = useState(false); // слушатель изменений для перерисовки
    // Лоадеры
    const [statusAuthLoading, setStatusAuthLoading] = useState<"starting" | "completed">('starting');

    const currentLocale = Localization.getLocales()[0].languageCode;

    const firstAddress = currentLocale.includes('ru') ? firstAddressRu : firstAddressEn;

    async function getAddressData() {
        try {
            await openOrCreateDatabaseAddresses(() => { }, () => { });
            const addressesArray = await getAllAddresses();
            let activeAddress: TypeAddress = firstAddressRu;
            if (addressesArray.length < 1) {
                const firstAddressObj = await createNewAddress(firstAddress);
                activeAddress = firstAddressObj;
            } else {
                const activeAddressObj = addressesArray.find((address) => address.active === 'true');
                if (activeAddressObj) {
                    activeAddress = activeAddressObj;
                }
            }
            setAddress(activeAddress);
            setAddresses(addressesArray);
        }
        catch (err) {
            console.log(err)
        }
    }

    /** Добавляет новый адрес в список адресов пользователя */
    function pushArrayAddress(address: TypeAddressData) {
        let updateArray: TypeAddressData[] = [...addressesArray];
        updateArray.push(address);
        setAddresses(updateArray);
    }

    /** Ищет объект в массиве по address.id и заменяет его */
    function updateContextAddressById(updateAddress: TypeAddressData) {
        setAddresses((prevAddresses: any) => {
            const updatedArray = prevAddresses.map((item: any) =>
                item.id === updateAddress.id ? { ...item, ...updateAddress } : item
            );
            if (address && updateAddress.id === address.id) {
                setAddress(updateAddress);
            }
            return updatedArray;
        });
    }

    /** Обновляет активный адрес */
    function updateContextActiveAddress(updateAddress: TypeAddressData) {
        setAddress(updateAddress);
    }


    /** Убирает адрес из списка адресов пользователя */
    function removeAddress(idAddress: string) {
        let updateArray = addressesArray.filter((element: TypeAddressData) => element.id.toString() !== idAddress);
        setAddresses(updateArray);
    }

    async function getAuth() {
        try {
            setStatusAuthLoading('starting');
            const token = await getToken();
            let idUser = await getUserId();
            console.log(`idUser ${idUser}`);
            if (!idUser) {
                await saveUserId('userId');
                idUser = 'userId';
            }
            await generateAndSaveDeviceId();
            const deviceId = await getDeviceId();
            // Получить данные о пользователе и проверить авторизацию
            const userData = await apiUser.getSelfUser(token, idUser, deviceId);
            const platform = Platform.OS;
            await apiUser.getLocaleAndPlatformUserApp(token, idUser, currentLocale, platform, deviceId);
            setUserData(userData.user);
            setAuth(true);
            setStatusAuthLoading('completed');
        }
        catch (err) {
            console.log(err);
            setAuth(false);
        }

    }

    useEffect(() => {
        getAuth()
    }, [handleChangeUserData])

    useEffect(() => {
        getAddressData();
    }, [])

    useEffect(() => {
        openOrCreateDatabaseMeterCounterRecord(() => { }, () => { });
    }, [])

    return (
        <GlobalContext.Provider value={{
            auth,
            setAuth,
            handleChangeUserData,
            setHandleChangeUserData,
            userData,
            setUserData,
            statusAuthLoading,
            address,
            addressesArray,
            counterNamesArray,
            pushArrayAddress,
            updateContextAddressById,
            updateContextActiveAddress,
            removeAddress,
        }}>
            {children}
        </GlobalContext.Provider>
    )

}

export const useGlobal = () => {
    return useContext(GlobalContext);
};
import { useState } from "react";
import { FlatList, View, StyleSheet, Dimensions, LayoutAnimation, Text } from "react-native";
import { useGlobal } from '../../../contexts/global/GlobalContext';
import { useTheme } from '../../../contexts/theme/ThemeContext';
import { useTranslate } from '../../../contexts/translate/TranslateContext';

import { createNewAddress, updateAddressById } from "../../../utils/db/SQLite/dbAddress";
import { TypeAddress, TypeAddressData } from "../../../utils/types/addressTypes";
import { deleteAddressById } from "../../../utils/db/SQLite/dbAddress";

import AddressItem from "./components/addressSetting/adress/AddressItem";
import HeaderAddressSetting from "./components/addressSetting/header/HeaderAddressSetting";
import Button from "../../../componentsShared/buttons/Button";
import FormAddAddress from "../../../componentsShared/forms/address/FormAddAddress";
import FormUpdateAddress from "../../../componentsShared/forms/address/FormUpdateAddress";
import FormControlAddress from "../../../componentsShared/forms/address/FormControlAddress";
import FormTwoTextButton from "../../../componentsShared/forms/FormTwoTextButton";
import ModalWithChildren from "../../../componentsShared/modals/ModalWithChildren";

/**
 * Экран настроек приложения.
 *
 * @component
 * @example
 * // Пример использования компонента:
 * <SettingsScreen />
 */
const AddressSettingScreen = () => {

    const { address, addressesArray, pushArrayAddress, updateContextAddressById, updateContextActiveAddress, removeAddress } = useGlobal();
    const { backgroundColor, theme, colorText, colorTextModal } = useTheme();
    const { selectedTranslations } = useTranslate();
    // Получение ширины экрана
    const screenWidth = Dimensions.get('window').width;

    const [styleButton, setStyleButton] = useState({ position: 'absolute', bottom: 99, width: 150, right: screenWidth / 2 - 75 });
    //Формы
    const [isOpenedModalForms, setIsOpenedModalForms] = useState<boolean>(false);
    const [isOpeningFormAddAddress, setIsOpeningFormAddAddress] = useState<boolean>(false);
    const [isOpeningFormUpdateAddress, setIsOpeningFormUpdateAddress] = useState<boolean>(false);
    const [isOpeningFormControlAddress, setIsOpeningFormControlAddress] = useState<boolean>(false);
    const [isOpeningFormRemoveAddress, setIsOpeningFormRemoveAddress] = useState<boolean>(false);
    const [isOpenInfoMessage, setisOpenInfoMessage] = useState<boolean>(false);
    const [infoMessage, setInfoMessage] = useState<string>('');
    //Лоадеры
    const [isLoadingAddAddress, setIsLoadingAddAddress] = useState<boolean>(false);
    const [isLoadingUpdateAddress, setIsLoadingUpdateAddress] = useState<boolean>(false);
    const [isLoadingRemove, setIsLoadingRemove] = useState<boolean>(false);
    //
    const [isButtonAddressActivating, setIsButtonAddressActivating] = useState<boolean>(false);
    //Адрес
    const [selectedAddress, setSelectedAddress] = useState<TypeAddressData>();

    const handleScroll = (event) => {
        // event.nativeEvent.contentOffset.y - текущая позиция скролла по вертикали
        const offsetY = event.nativeEvent.contentOffset.y;

        // логику для обработки скроллинга
        // Проверка, что пользователь проскроллил на самый верх
        if (offsetY <= 10) {
            if (JSON.stringify(styleButton) !== JSON.stringify({ position: 'absolute', bottom: 99, width: 150, right: screenWidth / 2 - 75 })) {
                console.log('Пользователь проскроллил на самый верх');
                setStyleButton({ position: 'absolute', bottom: 99, width: 150, right: screenWidth / 2 - 75 });
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            }
        } else {
            if (JSON.stringify(styleButton) !== JSON.stringify({ position: 'absolute', bottom: 99, width: 50, right: 10, minWidth: 0 })) {
                setStyleButton({ position: 'absolute', bottom: 99, width: 50, right: 10, minWidth: 0 });
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            }

        }
    };

    /** Открыть форму добавления адреса */
    function openFormAddAddress() {
        setIsOpeningFormAddAddress(true);
    }

    /** Свернуть форму добавления адреса */
    function closeFormAddAddress() {
        setIsOpeningFormAddAddress(false);
    }

    /** Добавить адрес */
    async function addAddress(data: TypeAddress) {
        setIsLoadingAddAddress(true);
        const newAddress = await createNewAddress(data);
        pushArrayAddress(newAddress);
        setTimeout(() => {
            setIsLoadingAddAddress(false);
            closeFormAddAddress();
        }, 700)

    }

    /** Открыть форму работы с адресом */
    function openFormControlAddress() {
        openModalForms();
        setIsOpeningFormControlAddress(true);
    }

    /** Свернуть форму работы с адресом */
    function closeFormControlAddress() {
        setIsOpeningFormControlAddress(false);
    }

    /** Разделитель адресов в списке */
    const Separator = () => (
        <View style={styles.separator} />
    );

    /** Действие при клике на адрес - открыть форму управления адресом */
    function onClickItem(addressSelected: TypeAddressData) {
        setSelectedAddress(addressSelected);
        if (addressSelected?.id !== address.id) {
            setIsButtonAddressActivating(true);
        } else {
            setIsButtonAddressActivating(false);
        }
        openFormControlAddress();
    }

    /** Открыть форму удаления*/
    function openFormRemoveAddress() {
        setIsOpeningFormControlAddress(false);
        setIsOpeningFormRemoveAddress(true);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }

    /** Свернуть форму удаления*/
    function closeFormRemoveAddress() {
        setIsOpeningFormRemoveAddress(false);
    }

    /** Открыть модальное окно*/
    function openModalForms() {
        setIsOpenedModalForms(true);
    }

    /** Свернуть модальное окно*/
    function closeModalForms() {
        setIsOpenedModalForms(false);
        setIsOpeningFormControlAddress(false);
        setIsOpeningFormUpdateAddress(false);
        setIsOpeningFormRemoveAddress(false);
        setisOpenInfoMessage(false);
        setInfoMessage('');
    }

    function openFormUpdateAddress() {
        setIsOpeningFormControlAddress(false);
        setIsOpeningFormUpdateAddress(true);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }

    /** Удалить*/
    function remove() {
        if (address.id.toString() !== selectedAddress.id.toString()) {
            setIsLoadingRemove(true);
            if (selectedAddress && selectedAddress.id) {
                deleteAddressById(selectedAddress.id.toString(),
                    () => {
                        removeAddress(selectedAddress.id.toString());
                        setTimeout(() => { setIsLoadingRemove(false); closeModalForms() }, 500)
                    },
                    (err) => {
                        setIsLoadingRemove(false);
                        setIsOpeningFormRemoveAddress(false);
                        setInfoMessage(selectedTranslations.errorMessage);
                        setisOpenInfoMessage(true);
                        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                    })
            }
        } else {
            setIsLoadingRemove(false);
            setIsOpeningFormRemoveAddress(false);
            setInfoMessage(selectedTranslations.choiseAddress);
            setisOpenInfoMessage(true);
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        }
    }

    // function openInfoMessage(text: string) {
    //     setisOpenInfoMessage(true);
    //     setInfoMessage(text);
    //     setIsOpenedModalForms(false);
    //     setIsOpeningFormControlAddress(false);
    //     setIsOpeningFormRemoveAddress(false);
    // }

    /**Редактировать адрес */
    async function updateAddress(address: TypeAddressData) {
        setIsLoadingUpdateAddress(true);
        const updatedAddress = await updateAddressById(address);
        updateContextAddressById(updatedAddress);
        setTimeout(() => { setIsLoadingUpdateAddress(false); closeModalForms() }, 700)
    }

    /** Сделать адрес активным */
    async function onActivateAddress() {
        setIsLoadingUpdateAddress(true);
        if (address && selectedAddress) {
            selectedAddress.active = 'true';
            const updatedActiveAddress = await updateAddressById(selectedAddress);
            updateContextAddressById(updatedActiveAddress);
            updateContextActiveAddress(updatedActiveAddress);
            address.active = 'false';
            const updatedAddress = await updateAddressById(address);
            updateContextAddressById(updatedActiveAddress);
            setTimeout(() => { setIsLoadingUpdateAddress(false); closeModalForms() }, 700)
        }
    }

    return (
        <View style={[styles.container, backgroundColor]}>
            <FlatList
                data={addressesArray}
                renderItem={({ item }) => <AddressItem addressData={item} onClick={(item: TypeAddressData) => onClickItem(item)} />}
                keyExtractor={item => item.id}
                style={styles.flatList} // Применение стилей к FlatList
                ListHeaderComponent={() => <HeaderAddressSetting />} // Компонент-заголовок
                ListFooterComponent={<></>} // компонент-футер
                ItemSeparatorComponent={Separator} // Добавляем разделитель
                contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
                onScroll={handleScroll} // Обработчик события скроллинга
            />
            <Button onClick={openFormAddAddress} text={'+'} style={styleButton} />
            <FormAddAddress
                sumbit={addAddress}
                isSubmitLoading={isLoadingAddAddress}
                onCloseForm={closeFormAddAddress}
                visible={isOpeningFormAddAddress}
            />
            <ModalWithChildren
                isVisible={isOpenedModalForms}
                onClose={closeModalForms}
                theme={theme}
                childComponent={
                    <>
                        {isOpeningFormControlAddress ?
                            <FormControlAddress
                                isButtonAddressActivating={isButtonAddressActivating}
                                onEdit={openFormUpdateAddress}
                                onRemove={openFormRemoveAddress}
                                isSubmitLoading={isLoadingUpdateAddress}
                                activateAddress={onActivateAddress}
                            />
                            : <></>}
                        {isOpeningFormUpdateAddress && selectedAddress ?
                            <FormUpdateAddress
                                address={selectedAddress}
                                sumbit={updateAddress}
                                isSubmitLoading={isLoadingUpdateAddress}
                            />
                            : <></>}
                        {isOpeningFormRemoveAddress ?
                            // Форма удаления
                            <FormTwoTextButton
                                text={selectedTranslations.remove}
                                onClickOne={remove}
                                onClickTwo={closeModalForms}
                                textButtonOne={selectedTranslations.yes}
                                textButtonTwo={selectedTranslations.no}
                                isSubmitLoading={isLoadingRemove}
                            />
                            : <></>}
                        {isOpenInfoMessage ?
                            <Text style={[styles.infoText, colorTextModal]}>{infoMessage}</Text>
                            : <></>}
                    </>
                }
            />
        </View>
    )
}

// Получение ширины экрана
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    flatList: {
        width: screenWidth,
        backgroundColor: 'transparent',
    },
    buttonCreate: {
        paddingHorizontal: 10,
        position: 'absolute',
        bottom: 99,
        width: screenWidth,
        justifyContent: 'center',
    },
    infoText: {
        fontSize: 15,
        fontWeight: '500',
        textAlign: 'center',
    },
    separator: {
        height: 8,
        backgroundColor: 'transpsrent',
    },
})

export default AddressSettingScreen;
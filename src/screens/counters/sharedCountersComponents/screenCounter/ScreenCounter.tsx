import React, { useEffect, useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView, Keyboard, Platform, Dimensions, LayoutAnimation } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TypeCounterInfo, TypeCounterMeters } from "../../types/types";
import { useTheme } from '../../../../contexts/theme/ThemeContext';
import { useTranslate } from "../../../../contexts/translate/TranslateContext";
import FormAddCountersData from "../../../../componentsShared/forms/counters/FormAddCountersData";
import TextCountersInfo from "../textCountersInfo/TextCountersInfo";
import FormUpdateCounter from "../forms/FormUpdateCounter";
import ButtonClickCounter from "../buttons/ButtonClickCounter";

interface ScreenCounterPropsTypes {
    placeholder: string;
    saveData: any;
    onClickCounter: () => void;
    openFormUpdateAndInfo: any;
    closeFormUpdateAndInfo: any;
    theme: string;
    isLoaderSaveData: boolean;
    isOpenedInfotool: boolean;
    isOpenedFormUpdateAndInfo: boolean;
    currentReading: TypeCounterMeters | undefined;
    dataCounter: TypeCounterInfo;
    sumbitUpdateCounter?: any;
    isLoadingUpdateCounter?: boolean;
}

/**
 * Props для компонента ScreenCounter.
 *
 * @typedef {Object} ScreenCounterPropsTypes
 * @property {string} placeholder - Заглушка для ввода данных.
 * @property {*} saveData - Функция обработки сохранения данных.
 * @property {*} openFormUpdateAndInfo - Функция открытия формы обновления и информации.
 * @property {*} closeFormUpdateAndInfo - Функция закрытия формы обновления и информации.
 * @property {string} theme - Тема компонента.
 * @property {boolean} isLoaderSaveData - Флаг загрузки сохранения данных.
 * @property {boolean} isOpenedInfotool - Флаг отображения инфо-тула.
 * @property {boolean} isOpenedFormUpdateAndInfo - Флаг отображения формы обновления и информации.
 * @property {TypeCounterMeters | undefined} currentReading - Текущие показания счетчика.
 * @property {TypeCounterInfo} dataCounter - Информация о счетчике.
 */

/**
 * Компонент для отображения информации о счетчике и форма занесения информации о показаниях.
 *
 * @component
 * @param {ScreenCounterPropsTypes} props - Props для компонента ScreenCounter.
 * 
 * @returns {JSX.Element}
 */
const ScreenCounter: React.FC<ScreenCounterPropsTypes> = ({
    dataCounter,
    placeholder,
    saveData,
    sumbitUpdateCounter,
    isLoadingUpdateCounter,
    isLoaderSaveData,
    isOpenedInfotool,
    isOpenedFormUpdateAndInfo,
    openFormUpdateAndInfo,
    currentReading,
    onClickCounter,
    closeFormUpdateAndInfo,
}) => {

    const { backgroundColor } = useTheme();
    const { selectedTranslations } = useTranslate();
    const insets = useSafeAreaInsets();

    const [keyboardOpen, setKeyboardOpen] = useState(false);

    const labelFind = selectedTranslations.arrayUnitsOfMeasurement.find((item: any) => item.name === dataCounter.name);
    let label = dataCounter.name;
    if (labelFind) {
        label = labelFind.nameCounter;
    }

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
                setKeyboardOpen(true);
            }
        );

        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
                setKeyboardOpen(false);
            }
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1, }}>
            <View style={[styles.container, backgroundColor]}>
                {!keyboardOpen?
                    <View style={[styles.containerInfoCounter]}>
                        <TextCountersInfo
                            dataCounter={dataCounter}
                            onClickCounter={onClickCounter}
                        />
                        <View style={styles.buttonInfoCounter}>
                            <ButtonClickCounter
                                text={selectedTranslations.update}
                                onClick={onClickCounter}
                            />
                        </View>
                    </View>
                    : <></>
                }
                <FormAddCountersData
                    onSubmitForm={saveData}
                    inputOneLabel={label}
                    onePlaceholder={placeholder}
                    onClickInfoOneCounter={openFormUpdateAndInfo}
                    currentOneCurrentMeter={currentReading ? currentReading.data : ''}
                    isLoadingSubmit={isLoaderSaveData}
                    dateReading={currentReading ? currentReading.date : ''}
                />
                {isOpenedFormUpdateAndInfo ?
                    <FormUpdateCounter
                        isOpen={isOpenedFormUpdateAndInfo}
                        onClose={() => setTimeout(closeFormUpdateAndInfo, Platform.OS === 'ios' ? 270 : 0)}
                        dataCounter={dataCounter}
                        sumbitUpdateCounter={sumbitUpdateCounter}
                        isLoadingUpdateCounter={isLoadingUpdateCounter}
                    />
                    : <></>}
            </View>
        </KeyboardAvoidingView >
    )
}

const ScreenHeight = Dimensions.get("window").height;
const padding = ScreenHeight > 770 ? 170 : 70
console.log(ScreenHeight)
const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: padding,
    },
    containerInfoCounter: {
        flex: 1,
        width: '100%',
    },
    buttonInfoCounter: {
        paddingTop: 10,
        paddingLeft: 30,
        opacity: 0.7,
    }
});

export default ScreenCounter;
import React from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
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

    const labelFind = selectedTranslations.arrayUnitsOfMeasurement.find((item: any) => item.name === dataCounter.name);
    let label = dataCounter.name;
    if (labelFind) {
        label = labelFind.nameCounter;
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1, }}>
            <View style={[styles.container, backgroundColor]}>
                <View style={styles.containerInfoCounter}>
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
                <FormAddCountersData
                    onSubmitForm={saveData}
                    inputOneLabel={label}
                    onePlaceholder={placeholder}
                    onClickInfoOneCounter={openFormUpdateAndInfo}
                    currentOneCurrentMeter={currentReading ? currentReading.data : ''}
                    isLoadingSubmit={isLoaderSaveData}
                    dateReading={currentReading ? currentReading.date : ''}
                />
                {/* <ModalWithChildren
                isVisible={isOpenedFormUpdateAndInfo}
                onClose={closeFormUpdateAndInfo}
                theme={theme}
            /> */}
                <FormUpdateCounter
                    isOpen={isOpenedFormUpdateAndInfo}
                    onClose={closeFormUpdateAndInfo}
                    dataCounter={dataCounter}
                    sumbitUpdateCounter={sumbitUpdateCounter}
                    isLoadingUpdateCounter={isLoadingUpdateCounter}
                />
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 170,
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
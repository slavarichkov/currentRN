import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

import { useTheme } from '../../contexts/theme/ThemeContext';

import DateSelector from '../date/DateSelector';

interface DateSelectorProps {
    showPicker: boolean;
    setShowPicker: React.Dispatch<React.SetStateAction<boolean>>;
    selectedDate: Date;
    setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
    text: string,
    colorText?: string,
}
/**
 * Инпут для выбора и отображения выбранной даты.
 *
 * @component
 * @example
 * // Пример использования компонента
 * <DateSelector
 *   showPicker={showPickerState}
 *   setShowPicker={setShowPickerState}
 *   selectedDate={selectedDateState}
 *   setSelectedDate={setSelectedDateState}
 *   localeUser="ru"
 * />
 *
 * @param {object} props - Свойства компонента.
 * @param {boolean} props.showPicker - Флаг, указывающий, отображается ли выбор даты.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} props.setShowPicker - Функция для установки значения showPicker.
 * @param {Date | undefined} props.selectedDate - Выбранная дата.
 * @param {React.Dispatch<React.SetStateAction<Date | undefined>>} props.setSelectedDate - Функция для установки значения selectedDate.
 * @param {string} props.localeUser - Языковая локаль для отображения даты.
 * @returns {React.ReactElement} Возвращает JSX-элемент компонента DateSelector.
 */
const DateSelectorInput: React.FC<DateSelectorProps> = ({ showPicker, setShowPicker, selectedDate, setSelectedDate, text, colorText }) => {

    const { theme } = useTheme();

    return (
        <View style={styles.containerDate}>
            <Text style={[styles.textDate, { color: colorText ? colorText : 'rgba(0,0,0,1)' }]}>{text}</Text>
            <View style={Platform.OS === 'android' && theme === 'dark' ? styles.containerDateSelectorForAndroidAndDarkTheme : ''}>
                <DateSelector
                    showPicker={showPicker}
                    setShowPicker={setShowPicker}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerDate: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        borderBottomColor: 'rgba(0,0,0,0.3)',
        borderBottomWidth: 1,
        paddingBottom: 5,
    },
    textDate: {
        fontWeight: '500',
        color: 'rgba(0,0,0,1)',
        fontSize: 14,
    },
    containerDateSelectorForAndroidAndDarkTheme: {
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: 'rgba(0, 0, 0, 1)',
    },
});

export default DateSelectorInput;
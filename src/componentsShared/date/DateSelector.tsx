import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../contexts/theme/ThemeContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { arrayLocale } from '../utils/constants';

interface DateSelectorProps {
  showPicker: boolean;
  setShowPicker: React.Dispatch<React.SetStateAction<boolean>>;
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
}

/**
 * Компонент для выбора даты.
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
const DateSelector: React.FC<DateSelectorProps> = ({ showPicker, setShowPicker, selectedDate, setSelectedDate }) => {

  let locale = 'ru-RU';
  const { colorText } = useTheme();

  const handleDateChange = (event, date) => {
    if (date !== undefined) {
      setSelectedDate(date);
    }
    //setShowPicker(Platform.OS === 'ios');
    setShowPicker(!showPicker);
  };

  const showDatepicker = () => {
    setShowPicker(true);
  };

  let options = { year: 'numeric', month: 'long', day: 'numeric' };

  // let formattedDate = new Date();
  let formattedDate = new Date().toLocaleDateString(locale, options);
  if (selectedDate) {
    formattedDate = selectedDate.toLocaleDateString(locale, options);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={showDatepicker}>
        <Text style={[styles.selectedDate, colorText]}>
          {formattedDate}
        </Text>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
          style={colorText}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 15,
    marginBottom: 10,
  },
  selectedDate: {
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default DateSelector;

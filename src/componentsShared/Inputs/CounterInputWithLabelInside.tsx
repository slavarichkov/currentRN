import React, { useEffect, useRef } from 'react';
import { TextInput, StyleSheet, Text, View, Platform } from "react-native";
import ButtonImage from '../buttons/ButtonImage';
import Button from '../buttons/Button';
import imgInfo from '../../../images/info-svgrepo-com.png';
//Контекст
import { useTheme } from '../../contexts/theme/ThemeContext';
import { formatDate } from '../../utils/funtions';

type KeyboardType =
    | 'default'
    | 'numeric'
    | 'email-address'
    | 'phone-pad'
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'url'
    | 'name-phone-pad'
    | 'decimal-pad'
    | 'twitter'
    | 'web-search';

type ReturnKeyType =
    | 'done'
    | 'go'
    | 'next'
    | 'search'
    | 'send';

interface TypesCounterInputWithLabelInside {
    label: string,
    placeholder?: string,
    value: string,
    onChangeText: (value: string) => void,
    maxLength?: number,
    placeholderTextColor?: string,
    keyboardType?: KeyboardType,
    editable?: boolean,
    multiline?: boolean,
    numberOfLines?: number,
    onFocus?: any,
    forwardedRef?: React.MutableRefObject<HTMLInputElement | null>,
    handleInputSubmit?: () => void,
    returnKeyType?: ReturnKeyType,
    onClickInfo?: () => void,
    dateReading?: string,
}

/**
 * Компонент ввода значений счетчика с меткой внутри.
 *
 * @component
 * @example
 * // Пример использования:
 * <CounterInputWithLabelInside
 *   label="Label"
 *   placeholder="Placeholder"
 *   value={inputValue}
 *   onChangeText={handleTextChange}
 *   maxLength={10}
 *   placeholderTextColor="#999"
 *   keyboardType="numeric"
 *   editable={true}
 *   multiline={false}
 *   numberOfLines={1}
 *   onFocus={handleFocus}
 *   forwardedRef={inputRef}
 *   handleInputSubmit={handleSubmit}
 *   returnKeyType="done"
 * />
 *
 * @param {Object} props - Свойства компонента.
 * @param {string} props.label - Текст метки.
 * @param {string} [props.placeholder] - Текст заполнителя для ввода.
 * @param {string} props.value - Значение ввода.
 * @param {Function} props.onChangeText - Обработчик изменения текста ввода.
 * @param {number} [props.maxLength] - Максимальная длина ввода.
 * @param {string} [props.placeholderTextColor] - Цвет текста заполнителя.
 * @param {KeyboardType} [props.keyboardType] - Тип клавиатуры.
 * @param {boolean} [props.editable] - Редактируем ли ввод.
 * @param {boolean} [props.multiline] - Многострочный ли ввод.
 * @param {number} [props.numberOfLines] - Количество строк в многострочном вводе.
 * @param {Function} [props.onFocus] - Обработчик фокуса ввода.
 * @param {React.Ref} [props.forwardedRef] - Ref для передачи внешнему коду.
 * @param {Function} [props.handleInputSubmit] - Обработчик события подтверждения ввода (нажатие клавиши "Return").
 * @param {ReturnKeyType} [props.returnKeyType] - Действие, выполняемое по нажатию клавиши "Return".
 * @returns {React.ReactElement} Компонент ввода с меткой внутри.
 */
const CounterInputWithLabelInside: React.FC<TypesCounterInputWithLabelInside> = ({
    label,
    placeholder,
    value,
    onChangeText,
    maxLength,
    placeholderTextColor,
    keyboardType,
    editable,
    multiline,
    numberOfLines,
    onFocus,
    forwardedRef,
    handleInputSubmit,
    returnKeyType,
    onClickInfo,
    dateReading,
}) => {

    const { colorText } = useTheme();

    let inputRef = useRef(null);

    useEffect(() => {
        // Прокидываем ref из пропс в локальный ref
        if (forwardedRef && forwardedRef.current) {
            forwardedRef.current = inputRef.current;
        }
    }, [forwardedRef]);

    const onPressInput = () => {
        if (inputRef && inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <View style={styles.containerInput}>
            <View style={styles.containerLabel}>
                <Text style={[styles.label, colorText]}>{label}</Text>
                {/* <ButtonImage
                    URLImg={imgInfo}
                    onPress={onClickInfo}
                    style={{ width: 20, height: 20, marginBottom: 10, }}
                /> */}
            </View>
            <TextInput
                ref={inputRef}
                style={[styles.input, colorText]}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                placeholderTextColor={placeholderTextColor ? placeholderTextColor : 'rgba(0,0,0,0.5)'}
                maxLength={maxLength}
                keyboardType={keyboardType ? keyboardType : "numeric"}
                editable={true}
                multiline={multiline ? multiline : false}
                numberOfLines={numberOfLines ? numberOfLines : 1}
                onFocus={onFocus ? onFocus : () => { }}
                disableFullscreenUI={true}
                returnKeyType={returnKeyType ? returnKeyType : 'done'}
                onSubmitEditing={handleInputSubmit ? handleInputSubmit : () => { }} // самбит при нажатии кнопки на клавиатуре при активном инпуте
            />
            <Text style={[styles.date, colorText]}>{dateReading ? formatDate(dateReading) : ''}</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    containerInput: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 15,
    },
    input: {
        fontSize: 14,
        fontWeight: '500',
        paddingHorizontal: 5,
        paddingVertical: Platform.OS === 'ios' ? 15 : 11,
        margin: 0,
        width: 290,
        color: 'rgba(0,0,0,1)',
        textAlign: 'center',
        borderWidth: 2,
        borderRadius: 50,
        borderColor: 'rgba(0,0,0,0.5)',
        marginVertical: 5,
    },
    label: {
        fontSize: 15,
        fontWeight: '700',
        paddingBottom: 10,
    },
    containerLabel: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    date: {
        fontSize: 11,
        fontWeight: '500',
    }
})

export default CounterInputWithLabelInside;
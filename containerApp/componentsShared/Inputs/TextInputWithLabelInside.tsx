import React, { useEffect, useRef } from 'react';
import { TextInput, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useTheme } from '../../contexts/theme/ThemeContext';

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

interface TypesTextInputWithLabelInside {
    label: string,
    placeholder?: string,
    value: string | number,
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

const TextInputWithLabelInside: React.FC<TypesTextInputWithLabelInside> = ({
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
}) => {
    let inputRef = useRef(null);

    const { colorText, theme } = useTheme();

    useEffect(() => {
        // Прокидываем ref из пропс в локальный ref
        if (forwardedRef !== undefined) {
            forwardedRef.current = inputRef.current;
        }
    }, [forwardedRef]);

    const onPressInput = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <TouchableOpacity onPress={onPressInput} style={styles.containerInput}>
            {value !== '' ?
                <Text style={styles.label}>{label}</Text>
                : <></>}
            <TextInput
                ref={inputRef}
                style={[styles.input, colorText]}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                placeholderTextColor={placeholderTextColor ? placeholderTextColor : 'rgba(255,255,255,0.5)'}
                maxLength={maxLength}
                keyboardType={keyboardType ? keyboardType : "default"}
                editable={editable}
                multiline={multiline}
                numberOfLines={numberOfLines}
                onFocus={onFocus}
                disableFullscreenUI={true}
                returnKeyType={returnKeyType ? returnKeyType : 'done'}
                onSubmitEditing={handleInputSubmit ? handleInputSubmit : () => { }} // самбит при нажатии кнопки на клавиатуре при активном инпуте
            />
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    containerInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.5)',
        marginVertical: 5,
        paddingVertical: 3,
    },
    input: {
        fontSize: 14,
        padding: 0,
        margin: 0,
        //width: '70%',
        // color: 'rgba(0,0,0,1)',
        textAlign: 'right',
    },
    label: {
        //width: '30%',
        fontSize: 14,
        color: 'rgba(255,255,255,0.7)',
    },
})

export default TextInputWithLabelInside;
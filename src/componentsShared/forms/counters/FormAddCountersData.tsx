import { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Text } from "react-native";
import CounterInputWithLabelInside from "../../Inputs/CounterInputWithLabelInside";
import Button from '../../buttons/Button';
//Контекст
import { useTranslate } from '../../../contexts/translate/TranslateContext';
// Утилиты
import { chekRegexCounters } from "../../../utils/regex";

interface FormAddCountersDataProps {
    inputOneLabel: string,
    inputTwoLabel?: string,
    onePlaceholder: string,
    isLoadingSubmit?: boolean,
    onSubmitForm: any,
    onClickInfoOneCounter?: () => void,
    onClickInfoTwoCounter?: () => void,
    currentOneCurrentMeter: string,
    currentTwoCurrentMeter?: string,
    dateReading?: string,
}

/**
 * Компонент формы добавления данных счетчиков.
 *
 * @component
 * @example
 * // Пример использования:
 * <FormAddCountersData
 *   inputOneLabel="Input One"
 *   inputTwoLabel="Input Two"
 *   onePlaceholder="Placeholder"
 *   isLoadingSubmit={false}
 *   onSubmitForm={handleFormSubmit}
 * />
 *
 * @param {Object} props - Свойства компонента.
 * @param {string} props.inputOneLabel - Метка для первого ввода.
 * @param {string} props.inputTwoLabel - Метка для второго ввода.
 * @param {string} props.onePlaceholder - Текст заполнителя для обоих вводов.
 * @param {boolean} props.isLoadingSubmit - Флаг загрузки для отображения состояния загрузки.
 * @param {Function} props.onSubmitForm - Обработчик отправки формы.
 * @param {string} props.currentOneCurrentMeter - предыдущие показания счетчика.
 * @param {string} props.currentTwoCurrentMeter - предыдущие показания счетчика.
 * @returns {React.ReactElement} Компонент формы добавления данных счетчиков.
 */
const FormAddCountersData: React.FC<FormAddCountersDataProps> = ({
    inputOneLabel,
    onePlaceholder,
    isLoadingSubmit,
    onSubmitForm,
    onClickInfoOneCounter,
    currentOneCurrentMeter,
    dateReading,
}) => {

    const { selectedTranslations } = useTranslate();

    const [inputOne, setInputOne] = useState<string>('');
    const [inputTwo, setInputTwo] = useState<string>('');
    const [isValidForm, setIsValidForm] = useState<boolean>(false);
    const [messageValid, setMessageValid] = useState<string>('');

    // Управление инпутами с клавиатуры
    let inputOneRef = useRef(null);
    let inputTwoRef = useRef(null);

    function replaceCommasWithDots(inputString: string) {
        const input = inputString.toString();
        return input.replace(/,/g, '.');
    }

    function onSubmit() {
        if (isValidForm) {
            let obgData = {
                inputOne: replaceCommasWithDots(inputOne),
                inputTwo,
            }
            onSubmitForm(obgData);
        }
    }

    function handleInputOneSubmit() {
        onSubmit();
    };

    // Валидация
    function validateForm() {
        if ((inputOne === '')) {
            setIsValidForm(false);
            setMessageValid(selectedTranslations.validMessageValues);
            return;
        }

        const regexOne = chekRegexCounters(inputOne);

        if (regexOne) {
            setIsValidForm(true);
            setMessageValid('')
        } else {
            setIsValidForm(false);
            setMessageValid(selectedTranslations.validMessageRegex)
        }
    }

    useEffect(() => {
        validateForm();
    }, [inputOne, inputTwo]);

    //Наполнить инпуты
    useEffect(() => {
        if (currentOneCurrentMeter && currentOneCurrentMeter !== '') {
            setInputOne(currentOneCurrentMeter)
        }
    }, [currentOneCurrentMeter])


    return (
        <View style={styles.container}>
            <CounterInputWithLabelInside
                label={inputOneLabel}
                placeholder={onePlaceholder}
                value={inputOne}
                onChangeText={setInputOne}
                maxLength={150}
                placeholderTextColor={'rgba(0,0,0,0.5)'}
                forwardedRef={inputOneRef}
                handleInputSubmit={handleInputOneSubmit}
                returnKeyType={'done'}
                onClickInfo={onClickInfoOneCounter}
                dateReading={dateReading}
            />
            <View style={styles.buttonSubmit}>
                <Button
                    onClick={onSubmit}
                    text={selectedTranslations.save}
                    isLoading={isLoadingSubmit}
                    disabled={!isValidForm}
                />
            </View>
            <Text style={styles.textValid}>{messageValid}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    buttonSubmit: {
        width: 190,
        marginTop: 40,
    },
    textValid: {
        color: 'rgba(255,0,0, 0.37)',
        fontSize: 12,
        fontWeight: '500',
        paddingVertical: 5,
    }
});

export default FormAddCountersData;
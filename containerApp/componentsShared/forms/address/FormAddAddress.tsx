import React, { useEffect, useRef, useState } from 'react';

//Контекст
import { useTranslate } from '../../../contexts/translate/TranslateContext';

import { regexStrokeInput, regexEmailEn } from '../../../utils/regex';
import { TypeAddress } from '../../../utils/types/addressTypes';

import Form from "../Form"
import CountersSelector from '../../selectors/counters/CountersSelector';
import TextInputWithLabelInside from '../../Inputs/TextInputWithLabelInside';

interface FormProps {
    sumbit: (obj: TypeAddress) => void;
    isSubmitLoading: boolean;
    onCloseForm: () => void;
    visible: boolean;
}

const FormAddAddress: React.FC<FormProps> = ({
    sumbit,
    isSubmitLoading,
    onCloseForm,
    visible,
}) => {

    const { selectedTranslations } = useTranslate();

    const [nameAddress, setNameAddress] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [street, setStreet] = useState<string>('');
    const [building, setBuilding] = useState<string | number>('');
    const [apartment, setApartment] = useState<string | number>('');
    const [email, setEmail] = useState<string>('');
    const [isValidForm, setValidForm] = useState<boolean>(false);
    const [validationMessage, setValidationMessage] = useState<string>('');
    const [arrayCountersName, setArrayCountersName] = useState<string[]>([]);

    // Управление инпутами с клавиатуры
    let inputNameRef = useRef(null);
    let inputCityRef = useRef(null);
    let inputStreetRef = useRef(null);
    let inputBuildingRef = useRef(null);
    let inputApartmentRef = useRef(null);
    let inputEmailRef = useRef(null);

    const handleInputNameAddressSubmit = () => {
        // Фокусировка на следующем TextInput
        if (inputStreetRef) {
            inputStreetRef.current.focus();
        }
    };

    const handleInputCitySubmit = () => {
        // Фокусировка на следующем TextInput
        if (inputCityRef) {
            inputCityRef.current.focus();
        }
    };

    const handleInputStreetSubmit = () => {
        // Фокусировка на следующем TextInput
        if (inputBuildingRef) {
            inputBuildingRef.current.focus();
        }
    };

    const handleInputBuildingSubmit = () => {
        // Фокусировка на следующем TextInput
        if (inputApartmentRef) {
            inputApartmentRef.current.focus();
        }
    };

    const handleInputApartmentSubmit = () => {
        // Фокусировка на следующем TextInput
        if (inputEmailRef) {
            inputEmailRef.current.focus();
        }
    };

    const handleInputEmailSubmit = () => {
        if (isValidForm) {
            sumbit(obj)
        }
    };

    function handleCurrents(arrayCounters: string[]) {
        setArrayCountersName(arrayCounters);
    }

    function onSubmitForm() {
        if (isValidForm) {
            const obj = {
                name: nameAddress,
                arrayCountersName: JSON.stringify(arrayCountersName),
                city,
                street,
                building,
                apartment,
                email,
                active: 'false',
            }
            sumbit(obj);
        }
    }


    //Валидация
    useEffect(() => {
        // Функция проверки соответствия строки регулярному выражению
        const isValidString = (str: string, regex: RegExp) => regex.test(str);

        // Проверка наличия значений во всех инпутах
        const areInputsNotEmpty = nameAddress.trim() !== '' && city.trim() !== '' && street.trim() !== '' && building.toString().trim() !== '' && apartment.toString().trim() !== '' && email.toString().trim() !== '';

        // Проверка соответствия значений регулярному выражению, только если строки не пустые
        const areInputsValid =
            (nameAddress.trim() === '' || isValidString(nameAddress, regexStrokeInput)) &&
            (city.trim() === '' || isValidString(city, regexStrokeInput)) &&
            (street.trim() === '' || isValidString(street, regexStrokeInput)) &&
            (building.toString().trim() === '' || isValidString(building.toString(), regexStrokeInput)) &&
            (apartment.toString().trim() === '' || isValidString(apartment.toString(), regexStrokeInput)) &&
            (email.toString().trim() === '' || isValidString(email.toString(), regexEmailEn));

        // Установка состояния в зависимости от результатов проверок
        setValidForm(areInputsNotEmpty && areInputsValid);

        // Установка сообщения валидации
        setValidationMessage(areInputsNotEmpty && areInputsValid ? '' : selectedTranslations.validMessage);

    }, [nameAddress, city, street, building, apartment, email])

    return (
        <Form
            nameForm={selectedTranslations.addAddress}
            isFormValid={isValidForm}
            sumbit={onSubmitForm}
            isSubmitLoading={isSubmitLoading}
            onCloseForm={onCloseForm}
            visible={visible}
            messageValidation={validationMessage}
            child={
                <>
                    <CountersSelector
                        handleChangeSelectors={handleCurrents}
                    />
                    <TextInputWithLabelInside
                        label={selectedTranslations.nameAddress}
                        placeholder={selectedTranslations.nameAddress}
                        value={nameAddress}
                        onChangeText={setNameAddress}
                        maxLength={70}
                        forwardedRef={inputNameRef}
                        handleInputSubmit={handleInputNameAddressSubmit}
                        returnKeyType={'next'}
                    />
                    <TextInputWithLabelInside
                        label={selectedTranslations.city}
                        placeholder={selectedTranslations.city}
                        value={city}
                        onChangeText={setCity}
                        maxLength={70}
                        forwardedRef={inputCityRef}
                        handleInputSubmit={handleInputCitySubmit}
                        returnKeyType={'next'}
                    />
                    <TextInputWithLabelInside
                        label={selectedTranslations.street}
                        placeholder={selectedTranslations.street}
                        value={street}
                        onChangeText={setStreet}
                        maxLength={170}
                        forwardedRef={inputStreetRef}
                        handleInputSubmit={handleInputStreetSubmit}
                        returnKeyType={'next'}
                    />
                    <TextInputWithLabelInside
                        label={selectedTranslations.building}
                        placeholder={selectedTranslations.building}
                        value={building}
                        onChangeText={setBuilding}
                        maxLength={70}
                        keyboardType="numeric"
                        forwardedRef={inputBuildingRef}
                        handleInputSubmit={handleInputBuildingSubmit}
                        returnKeyType={'next'}
                    />
                    <TextInputWithLabelInside
                        label={selectedTranslations.apartment}
                        placeholder={selectedTranslations.apartment}
                        value={apartment}
                        onChangeText={setApartment}
                        maxLength={70}
                        keyboardType="numeric"
                        forwardedRef={inputApartmentRef}
                        handleInputSubmit={handleInputApartmentSubmit}
                        returnKeyType={'next'}
                    />
                    <TextInputWithLabelInside
                        label={selectedTranslations.email}
                        placeholder={selectedTranslations.emailAddressPlaiceholder}
                        value={email}
                        onChangeText={setEmail}
                        maxLength={370}
                        keyboardType="email-address"
                        forwardedRef={inputEmailRef}
                        handleInputSubmit={handleInputEmailSubmit}
                        returnKeyType={'done'}
                    />
                </>}
        />
    )
}

export default FormAddAddress;
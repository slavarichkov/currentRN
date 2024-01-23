import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

//Контекст
import { useTranslate } from '../../../contexts/translate/TranslateContext';
import { useTheme } from '../../../contexts/theme/ThemeContext';

import { regexStrokeInput, regexEmailEn } from '../../../utils/regex';
import { TypeAddressData } from '../../../utils/types/addressTypes';

import CountersSelector from '../../selectors/counters/CountersSelector';
import TextInputWithLabelInside from '../../Inputs/TextInputWithLabelInside';
import Button from '../../buttons/Button';

interface FormProps {
    sumbit: (obj: TypeAddressData) => void;
    isSubmitLoading: boolean;
    address: TypeAddressData;

}

const FormUpdateAddress: React.FC<FormProps> = ({
    sumbit,
    isSubmitLoading,
    address,
}) => {

    const { selectedTranslations } = useTranslate();
    const { theme } = useTheme();

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
        if (inputStreetRef && inputStreetRef.current) {
            inputStreetRef.current.focus();
        }
    };

    const handleInputCitySubmit = () => {
        // Фокусировка на следующем TextInput
        if (inputCityRef && inputCityRef.current) {
            inputCityRef.current.focus();
        }
    };

    const handleInputStreetSubmit = () => {
        // Фокусировка на следующем TextInput
        if (inputBuildingRef && inputBuildingRef.current) {
            inputBuildingRef.current.focus();
        }
    };

    const handleInputBuildingSubmit = () => {
        // Фокусировка на следующем TextInput
        if (inputApartmentRef && inputApartmentRef.current) {
            inputApartmentRef.current.focus();
        }
    };

    const handleInputApartmentSubmit = () => {
        // Фокусировка на следующем TextInput
        if (inputEmailRef && inputEmailRef.current) {
            inputEmailRef.current.focus();
        }
    };

    const handleInputEmailSubmit = () => {
        onSubmitForm();
    };

    function handleCurrents(arrayCounters: string[]) {
        setArrayCountersName(arrayCounters);
    }

    function onSubmitForm() {
        if (isValidForm) {
            const obj = {
                id: address.id,
                name: nameAddress,
                arrayCountersName: JSON.stringify(arrayCountersName),
                city,
                street,
                building,
                apartment,
                email,
                active: address.active,
            }
            sumbit(obj);
        }
    }

    //Наполнить форму
    useEffect(() => {
        if (address) {
            console.log(address.email)
            setNameAddress(address.name);
            setCity(address.city);
            setStreet(address.street);
            setBuilding(address.building);
            setApartment(address.apartment);
            setEmail(address.email);
            setArrayCountersName(JSON.parse(address.arrayCountersName));
        }

    }, [address])


    //Валидация
    useEffect(() => {

        //Проверка на изменения в строках
        if (email !== address.email || nameAddress !== address.name || city !== address.city || street !== address.street || building !== address.building || apartment !== address.apartment || JSON.stringify(arrayCountersName) !== address.arrayCountersName) {
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
        } else {
            setValidForm(false);
            setValidationMessage('');
        }

    }, [nameAddress, city, street, building, apartment, email, arrayCountersName])

    return (
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
                placeholderTextColor={theme === 'light' ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)'}
                styleColorText={theme === 'light' ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)'}
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
                placeholderTextColor={theme === 'light' ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)'}
                styleColorText={theme === 'light' ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)'}
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
                placeholderTextColor={theme === 'light' ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)'}
                styleColorText={theme === 'light' ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)'}
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
                placeholderTextColor={theme === 'light' ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)'}
                styleColorText={theme === 'light' ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)'}
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
                placeholderTextColor={theme === 'light' ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)'}
                styleColorText={theme === 'light' ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)'}
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
                placeholderTextColor={theme === 'light' ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)'}
                styleColorText={theme === 'light' ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)'}
                returnKeyType={'done'}
            />
            <View style={styles.containerButtonSubmit}>
                <Button onClick={onSubmitForm} text={selectedTranslations.update} isLoading={isSubmitLoading} disabled={!isValidForm} />
                <Text style={styles.messageValidation}>{validationMessage}</Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    messageValidation: {
        color: 'rgba(255,0,0, 0.37)',
        fontSize: 12,
        fontWeight: '500',
        paddingVertical: 5,
        textAlign: 'center',
    },
    containerButtonSubmit: {
        paddingTop: 30,
    },
});

export default FormUpdateAddress;
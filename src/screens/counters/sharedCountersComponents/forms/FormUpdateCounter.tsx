import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import DateSelectorInput from "../../../../componentsShared/Inputs/DateSelectorInput";
import ModalWithChildren from "../../../../componentsShared/modals/ModalWithChildren";
import Button from "../../../../componentsShared/buttons/Button";
import TextInputWithLabelInside from "../../../../componentsShared/Inputs/TextInputWithLabelInside";
//Контекст
import { useTranslate } from '../../../../contexts/translate/TranslateContext';
import { useTheme } from "../../../../contexts/theme/ThemeContext";

import { TypeCounterInfo } from "../../types/types";

import { regexStrokeInput } from "../../../../utils/regex";
import { addAdditionalCostOptionAsyncStore, getAdditionalCostOptionAsyncStore } from "../../../../utils/db/asyncStorage/AsyncStore";

interface FormUpdateCounter {
    isOpen: boolean,
    onClose: () => void,
    dataCounter: TypeCounterInfo,
    sumbitUpdateCounter?: any,
    isLoadingUpdateCounter?: boolean,
}

const FormUpdateCounter: React.FC<FormUpdateCounter> = ({
    isOpen,
    onClose,
    dataCounter,
    sumbitUpdateCounter,
    isLoadingUpdateCounter,
}) => {

    const { selectedTranslations } = useTranslate();
    const { theme, colorText } = useTheme();

    const [isVisible, setIsVisible] = useState(false);
    const [dateOfCounterVerification, setDateOfCounterVerification] = useState<Date>(new Date());
    const [isShowDateOfCounterVerification, setShowdateOfCounterVerification] = useState<boolean>(false);
    const [dateOfCounterVerificationNext, setDateOfCounterVerificationNext] = useState<Date>(new Date());
    const [cost, setCost] = useState<any>('');
    const [additionalCost, setAdditionalCost] = useState<string>('0');
    const [initAdditionalCost, setInitAdditionalCost] = useState<string>('0');
    const [summaryCost, setSummaryCost] = useState<string>('0');
    const [isShowDateOfCounterVerificationNext, setShowDateOfCounterVerificationNext] = useState<boolean>(false);
    const [numberCounter, setNumberCounter] = useState<string>('');
    const [isValidForm, setValidForm] = useState<boolean>(false);
    const [isAdditionalCost, setIsAdditionalCost] = useState<boolean>(false);

    async function onUpdate() {
        if (isValidForm) {
            const updateObj = {
                id: dataCounter.id.toString(),
                name: dataCounter.name,
                address: dataCounter.address,
                counterNumber: numberCounter,
                costOfaUnitOfMeasurement: isAdditionalCost ? summaryCost.toString() : cost.toString(),
                dateOfCounterVerification: dateOfCounterVerification.toString(),
                dateOfCounterVerificationNext: dateOfCounterVerificationNext.toString(),
            }
            if (isAdditionalCost) {
                await addAdditionalCostOptionAsyncStore(dataCounter.name, additionalCost.toString());
            }
            sumbitUpdateCounter(updateObj);
        }
    }

    function replaceCommasWithDots(inputString: string) {
        const input = inputString.toString();

        // Заменяем все запятые и точки на одну точку
        const replacedString = input.replace(/[,\.]+/g, '.');

        return replacedString;
    }

    function getCost(cost: string) {
        const costData = replaceCommasWithDots(cost.toString());
        setCost(costData);
    }

    function getAdditionalCost(additionalCost: string) {
        const additionaCostData = replaceCommasWithDots(additionalCost.toString());
        setAdditionalCost(additionaCostData);
    }

    useEffect(() => {
        const update = replaceCommasWithDots(cost);
        setCost(update);
        if (isAdditionalCost) {
            const update = replaceCommasWithDots(cost);
            setCost(update);
        }
        if (isAdditionalCost) {
            const summary = Number(cost) + Number(additionalCost);
            setSummaryCost(summary.toFixed(2));
        }
    }, [cost, additionalCost])

    async function getAdditionalCosts() {
        const arrayIsAdditionalCost = ['Горячая вода', 'Холодная вода']
        const isCheckAdditionalCost = arrayIsAdditionalCost.includes(dataCounter.name);
        setIsAdditionalCost(isCheckAdditionalCost);
        if (isCheckAdditionalCost) {
            const findedAdditionalCost = await getAdditionalCostOptionAsyncStore(dataCounter.name);
            let optionCost = '0';
            if (!findedAdditionalCost) {
                await addAdditionalCostOptionAsyncStore(dataCounter.name, additionalCost.toString());
            } else {
                optionCost = findedAdditionalCost.toString();
            }
            setInitAdditionalCost(optionCost);
            setAdditionalCost(optionCost);
        }
    }

    useEffect(() => {

        if (dataCounter && dataCounter.counterNumber) {
            setNumberCounter(dataCounter.counterNumber)
        }

        if (dataCounter && dataCounter.dateOfCounterVerification) {
            setDateOfCounterVerification(new Date(dataCounter.dateOfCounterVerification))
        }

        if (dataCounter && dataCounter.costOfaUnitOfMeasurement) {
            setCost(dataCounter.costOfaUnitOfMeasurement);
        }

        if (dataCounter && dataCounter.dateOfCounterVerificationNext) {
            setDateOfCounterVerificationNext(new Date(dataCounter.dateOfCounterVerificationNext))
        }

        getAdditionalCosts();

    }, [dataCounter])

    //Валидация
    useEffect(() => {
        if (dataCounter) {
            if (dateOfCounterVerification.toString() !== dataCounter.dateOfCounterVerification ||
                cost.toString() !== dataCounter.costOfaUnitOfMeasurement ||
                dateOfCounterVerificationNext.toString() !== dataCounter.dateOfCounterVerificationNext ||
                numberCounter !== dataCounter.counterNumber
                || additionalCost !== initAdditionalCost
            ) {
                if (!regexStrokeInput.test(numberCounter) || !regexStrokeInput.test(cost) || !regexStrokeInput.test(additionalCost)
                    || numberCounter === '' || cost === '' || additionalCost === '') {
                    setValidForm(false);
                } else {
                    setValidForm(true);
                }

            } else {
                setValidForm(false);
            }
        }

    }, [dataCounter, cost, dateOfCounterVerification, dateOfCounterVerification, numberCounter, initAdditionalCost, additionalCost])


    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        } else {
            setTimeout(()=>{
                setIsVisible(false);
            },1000)
        }

    }, [isOpen])

    return (
        <ModalWithChildren
            isVisible={isVisible}
            onClose={onClose}
            childComponent={
                <View style={styles.container}>
                    < View style={styles.containerInput} >
                        <TextInputWithLabelInside
                            label={'№'}
                            placeholder={'№'}
                            value={numberCounter}
                            onChangeText={setNumberCounter}
                            maxLength={70}
                            placeholderTextColor={theme === 'light' ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)'}
                            styleColorText={theme === 'light' ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)'}
                        />
                    </View >
                    < View style={styles.containerInput} >
                        <DateSelectorInput
                            text={selectedTranslations.placeholderDate}
                            showPicker={isShowDateOfCounterVerification}
                            setShowPicker={setShowdateOfCounterVerification}
                            selectedDate={dateOfCounterVerification}
                            setSelectedDate={setDateOfCounterVerification}
                            colorText={theme === 'light' ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)'}
                        />
                    </View >
                    < View style={styles.containerInput} >
                        <DateSelectorInput
                            text={selectedTranslations.placeholderDateNext}
                            showPicker={isShowDateOfCounterVerificationNext}
                            setShowPicker={setShowDateOfCounterVerificationNext}
                            selectedDate={dateOfCounterVerificationNext}
                            setSelectedDate={setDateOfCounterVerificationNext}
                            colorText={theme === 'light' ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)'}
                        />
                    </View >
                    <TextInputWithLabelInside
                        label={selectedTranslations.cost}
                        placeholder={selectedTranslations.cost}
                        value={cost}
                        onChangeText={getCost}
                        maxLength={70}
                        placeholderTextColor={theme === 'light' ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)'}
                        styleColorText={theme === 'light' ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)'}
                        keyboardType={'numeric'}
                    />
                    {isAdditionalCost ?
                        <>
                            <TextInputWithLabelInside
                                label={selectedTranslations.additionalСost}
                                placeholder={selectedTranslations.additionalСost}
                                value={additionalCost}
                                onChangeText={getAdditionalCost}
                                maxLength={70}
                                placeholderTextColor={theme === 'light' ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)'}
                                styleColorText={theme === 'light' ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)'}
                                keyboardType={'numeric'}
                            />
                            <TextInputWithLabelInside
                                label={selectedTranslations.totalCost}
                                placeholder={selectedTranslations.totalCost}
                                value={summaryCost}
                                onChangeText={setSummaryCost}
                                onClickInput={() => { }}
                                maxLength={70}
                                placeholderTextColor={theme === 'light' ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)'}
                                styleColorText={theme === 'light' ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)'}
                                keyboardType={'numeric'}
                            />
                        </>
                        : <></>}
                    <View style={styles.buttonSubmit}>
                        <Button
                            text={selectedTranslations.update}
                            onClick={onUpdate}
                            isLoading={isLoadingUpdateCounter}
                            disabled={!isValidForm}
                        />
                    </View>
                </View >
            }
        />
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    containerInput: {
        width: '100%',
        paddingVertical: 3,
    },
    buttonSubmit: {
        width: 170,
        paddingTop: 30,
    }

});

export default FormUpdateCounter;
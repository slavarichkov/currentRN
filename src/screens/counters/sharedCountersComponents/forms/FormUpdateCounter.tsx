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

    const [dateOfCounterVerification, setDateOfCounterVerification] = useState<Date>(new Date());
    const [isShowDateOfCounterVerification, setShowdateOfCounterVerification] = useState<boolean>(false);
    const [dateOfCounterVerificationNext, setDateOfCounterVerificationNext] = useState<Date>(new Date());
    const [cost, setCost] = useState<any>('');
    const [isShowDateOfCounterVerificationNext, setShowDateOfCounterVerificationNext] = useState<boolean>(false);
    const [numberCounter, setNumberCounter] = useState<string>('');
    const [isValidForm, setValidForm] = useState<boolean>(false);

    function onUpdate() {
        if (isValidForm) {
            const updateObj = {
                id: dataCounter.id.toString(),
                name: dataCounter.name,
                address: dataCounter.address,
                counterNumber: numberCounter,
                costOfaUnitOfMeasurement: cost.toString(),
                dateOfCounterVerification: dateOfCounterVerification.toString(),
                dateOfCounterVerificationNext: dateOfCounterVerificationNext.toString(),
            }
            sumbitUpdateCounter(updateObj)
        }
    }

    function replaceCommasWithDots(inputString: string) {
        const input = inputString.toString();
        return input.replace(/,/g, '.');
    }

    function getCost(cost: string) {
        const costData = replaceCommasWithDots(cost.toString());
        setCost(costData);
    }

    // useEffect(()=>{
    //     const update = replaceCommasWithDots(cost);
    //     setCost(update);
    // },[cost])

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

    }, [dataCounter])

    //Валидация
    useEffect(() => {
        if (dataCounter) {
            if (dateOfCounterVerification.toString() !== dataCounter.dateOfCounterVerification ||
                cost.toString() !== dataCounter.costOfaUnitOfMeasurement ||
                dateOfCounterVerificationNext.toString() !== dataCounter.dateOfCounterVerificationNext ||
                numberCounter !== dataCounter.counterNumber) {
                if (regexStrokeInput.test(numberCounter) && numberCounter !== '') {
                    setValidForm(true);
                } else {
                    setValidForm(false);
                }

            } else {
                setValidForm(false);
            }
        }

    }, [dataCounter, cost, dateOfCounterVerification, dateOfCounterVerification, numberCounter])


    return (
        <ModalWithChildren
            isVisible={isOpen}
            onClose={onClose}
            isHiddeButtonUpdateAndRemove={true}
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
                    < View style={styles.containerInput} >
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
                    </View >
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
        paddingTop: 5,
    },
    buttonSubmit: {
        width: 170,
        paddingTop: 30,
    }

});

export default FormUpdateCounter;
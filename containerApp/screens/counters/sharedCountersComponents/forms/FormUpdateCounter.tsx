import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import DateSelectorInput from "../../../../componentsShared/Inputs/DateSelectorInput";
import ModalWithChildren from "../../../../componentsShared/modals/ModalWithChildren";
import Button from "../../../../componentsShared/buttons/Button";
import TextInputWithLabelInside from "../../../../componentsShared/Inputs/TextInputWithLabelInside";
//Контекст
import { useTranslate } from '../../../../contexts/translate/TranslateContext';
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

    const [dateOfCounterVerification, setDateOfCounterVerification] = useState<Date>(new Date());
    const [isShowDateOfCounterVerification, setShowdateOfCounterVerification] = useState<boolean>(false);
    const [dateOfCounterVerificationNext, setDateOfCounterVerificationNext] = useState<Date>(new Date());
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
                dateOfCounterVerification: dateOfCounterVerification.toString(),
                dateOfCounterVerificationNext: dateOfCounterVerificationNext.toString(),
            }
            sumbitUpdateCounter(updateObj)
        }
    }

    useEffect(() => {

        if (dataCounter && dataCounter.counterNumber) {
            setNumberCounter(dataCounter.counterNumber)
        }

        if (dataCounter && dataCounter.dateOfCounterVerification) {
            setDateOfCounterVerification(new Date(dataCounter.dateOfCounterVerification))
        }

        if (dataCounter && dataCounter.dateOfCounterVerificationNext) {
            setDateOfCounterVerificationNext(new Date(dataCounter.dateOfCounterVerificationNext))
        }

    }, [dataCounter])

    //Валидация
    useEffect(() => {
        if (dataCounter) {
            if (dateOfCounterVerification.toString() !== dataCounter.dateOfCounterVerification ||
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

    }, [dataCounter, dateOfCounterVerification, dateOfCounterVerification, numberCounter])


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
                        />
                    </View >
                    < View style={styles.containerInput} >
                        <DateSelectorInput
                            text={selectedTranslations.placeholderDate}
                            showPicker={isShowDateOfCounterVerification}
                            setShowPicker={setShowdateOfCounterVerification}
                            selectedDate={dateOfCounterVerification}
                            setSelectedDate={setDateOfCounterVerification}
                        />
                    </View >
                    < View style={styles.containerInput} >
                        <DateSelectorInput
                            text={selectedTranslations.placeholderDateNext}
                            showPicker={isShowDateOfCounterVerificationNext}
                            setShowPicker={setShowDateOfCounterVerificationNext}
                            selectedDate={dateOfCounterVerificationNext}
                            setSelectedDate={setDateOfCounterVerificationNext}
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
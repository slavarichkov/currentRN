import { View, Text, StyleSheet } from "react-native";
import { useTranslate } from '../../../contexts/translate/TranslateContext';

import imgUpdate from '../../../../images/edit-2-svgrepo-com.png';
import imgRemove from '../../../../images/trash-basket-svgrepo-com.png';

import ButtonImage from '../../buttons/ButtonImage';
import Loader from "../../loaders/Loader";
import Button from "../../buttons/Button";

interface FormControlAddressProps {
    text?: string;
    onEdit: () => void;
    onRemove: () => void;
    isSubmitLoading?: boolean;
    activateAddress: () => void;
    isButtonAddressActivating: boolean;
}

const FormControlAddress: React.FC<FormControlAddressProps> = ({
    text,
    onEdit,
    onRemove,
    isSubmitLoading,
    activateAddress,
    isButtonAddressActivating,
}) => {

    const { selectedTranslations } = useTranslate();

    return (
        < View style={styles.container} >
            {text ?
                <Text style={styles.title}>{text}</Text>
                : <></>}
            <>
                {isButtonAddressActivating ?
                    <Button onClick={activateAddress} text={selectedTranslations.takeActive} isLoading={isSubmitLoading} />
                    : <></>}
                <View style={styles.containerButton}>
                    <ButtonImage URLImg={imgUpdate} onPress={onEdit} style={{ width: 27, height: 27, }} />
                    <ButtonImage URLImg={imgRemove} onPress={onRemove} />
                </View>
            </>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    title: {
        color: 'rgba(0,0,0,1)',
        paddingTop: 10,
        fontSize: 17,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    containerButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 20,
        paddingBottom: 10,
    },
    button: {
        padding: 10,
        width: 80,
        borderRadius: 50,
        borderColor: 'rgba(0, 0, 0,0.2)',
        borderWidth: 1,
    },
    textButton: {
        color: 'rgba(0,0,0,1)',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
})

export default FormControlAddress;
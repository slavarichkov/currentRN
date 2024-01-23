import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { useTheme } from '../../contexts/theme/ThemeContext';

import imgUpdate from '../../../images/edit-2-svgrepo-com.png';
import imgRemove from '../../../images/trash-basket-svgrepo-com.png';

import ButtonImage from '../buttons/ButtonImage';
import Loader from "../loaders/Loader";
import ModalWithChildren from "../modals/ModalWithChildren";

interface FormUpdateOrRemoveProps {
    isVisible: boolean;
    onClose: () => void;
    text: string;
    onEdit: () => void;
    onRemove: () => void;
    isSubmitLoading?: boolean;
}

const FormUpdateOrRemove: React.FC<FormUpdateOrRemoveProps> = ({
    isVisible,
    onClose,
    text,
    onEdit,
    onRemove,
    isSubmitLoading
}) => {

    const { theme} = useTheme();

    return (
        <ModalWithChildren
            isVisible={isVisible}
            onClose={onClose}
            theme={theme}
            childComponent={
                < View style={styles.container} >
                    {text ?
                        <Text style={styles.title}>{text}</Text>
                        : <></>}
                    {isSubmitLoading ?
                        <Loader />
                        :
                        <View style={styles.containerButton}>
                            <ButtonImage URLImg={imgUpdate} onPress={onEdit} style={{ width: 27, height: 27, }} />
                            <ButtonImage URLImg={imgRemove} onPress={onRemove} />
                        </View>
                    }
                </View >
            }
        />
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
    containerButton: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
    },
})

export default FormUpdateOrRemove;
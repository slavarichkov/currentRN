import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { useTheme } from '../../contexts/theme/ThemeContext';
import Loader from "../loaders/Loader";

interface FormTwoTextButtonProps {
    text: string;
    onClickOne: () => void;
    onClickTwo: () => void;
    textButtonOne: string;
    textButtonTwo: string;
    isSubmitLoading?: boolean;
}

const FormTwoTextButton: React.FC<FormTwoTextButtonProps> = ({
    text,
    onClickOne,
    onClickTwo,
    textButtonOne,
    textButtonTwo,
    isSubmitLoading
}) => {

    const { colorTextModal } = useTheme();

    return (
        < View  >
            <Text style={[styles.title, colorTextModal]}>{text}</Text>
            {isSubmitLoading ?
                <Loader />
                :
                <View style={styles.containerButton}>
                    <TouchableOpacity style={styles.button} onPress={onClickOne}>
                        <Text style={[styles.textButton, colorTextModal]}>{textButtonOne}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={onClickTwo}>
                        <Text style={[styles.textButton, colorTextModal]}>{textButtonTwo}</Text>
                    </TouchableOpacity>
                </View>}
        </View >
    )
}

const styles = StyleSheet.create({
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
    }
})

export default FormTwoTextButton;
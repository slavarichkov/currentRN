import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useTheme } from '../../contexts/theme/ThemeContext';
import imgArrowUp from '../../../images/arrow-up-svgrepo-com-2.png';
import imgArrowDown from '../../../images/arrow-down-svgrepo-com-2.png';

interface ButtonMoreInfoProps {
    controlShow: () => void;
    isShow: boolean;
    text: string;
}

/**
 * Компонент кнопки для отображения или скрытия дополнительной информации.
 *
 * @component
 * @example
 * // Пример использования:
 * <ButtonMoreInfo controlShow={handleToggleInfo} isShow={isInfoVisible} text="Показать информацию" />
 *
 * @param {Object} props - Свойства компонента.
 * @param {Function} props.controlShow - Функция обратного вызова для управления видимостью информации.
 * @param {boolean} props.isShow - Флаг, указывающий, отображается ли дополнительная информация.
 * @param {string} props.text - Текст, отображаемый на кнопке.
 * @returns {React.ReactElement} Компонент кнопки.
 */
const ButtonMoreInfo: React.FC<ButtonMoreInfoProps> = ({ controlShow, isShow, text }) => {

    const { colorText } = useTheme();
    return (
        <TouchableOpacity style={styles.containerFilterControl} onPress={controlShow}>
            <Text style={[styles.textFilter, colorText]}>{text}</Text>
            <Image style={styles.imageFilter} source={isShow ? imgArrowUp : imgArrowDown} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    lightBackgroundColor: {
        // backgroundColor: 'rgba(255,255,255,1)',
    },
    containerImage: {
        flexDirection: 'row',
    },
    imageType: {
        paddingTop: 5,
        width: 22,
        height: 22,
    },
    containerSelectorTypes: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    containerSelectedDate: {
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 280
    },
    textSelectorTDate: {
        color: 'rgba(0,0,0,1)',
        fontSize: 14,
    },
    containerFilterControl: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 10,
        paddingTop: 2,
        backgroundColor: 'rgba(255, 255, 255,0.17)',
        borderRadius: 10,
        marginVertical: 17,
    },
    textFilter: {
        textAlign: 'center',
        color: 'rgba(0,0,0,1)',
        fontSize: 14,
        fontWeight: '500',
        marginVertical: 3,
    },
    imageFilter: {
        width: 25,
        height: 25,
    },
    infoArrowContainer: {
        paddingTop: 53,
        width: 230,
    }
})

export default ButtonMoreInfo
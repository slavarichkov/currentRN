import { TouchableOpacity, StyleSheet, Image } from 'react-native';

interface ButtonProps {
    URLImg: any;
    onPress?: () => void;
    style?: object;
}

/**
 * Пропсы для компонента ButtonImage.
 * @typedef {Object} ButtonProps
 * @property {string} URLImg - URL изображения для отображения в кнопке.
 * @property {() => void} onPress - Функция обратного вызова, вызываемая при нажатии на кнопку.
 * @property {object} style - Стили для кнопки (переопределяют стандартные стили).
 */

/**
 * Компонент кнопки с изображением.
 *
 * @component
 * @example
 * // Пример использования:
 * <ButtonImage
 *   URLImg="https://example.com/image.png"
 *   onPress={() => console.log('Button pressed')}
 *   style={{ width: 50, height: 50 }}
 * />
 *
 * @param {ButtonProps} props - Пропсы компонента.
 * @returns {React.ReactNode} Компонент ButtonImage.
 */
const ButtonImage: React.FC<ButtonProps> = ({ URLImg, onPress, style }: ButtonProps): React.ReactNode => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Image style={style ? style : styles.buttonImg} source={URLImg} />
        </TouchableOpacity>
    )
}

export default ButtonImage;

const styles = StyleSheet.create({
    button: {
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonImg: {
        width: 30,
        height: 30,
    },
})
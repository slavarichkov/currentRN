import { Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useTheme } from '../../../../../../contexts/theme/ThemeContext';
import { TypeAddressData } from "../../../../../../utils/types/addressTypes";
import { useTranslate } from '../../../../../../contexts/translate/TranslateContext';

/**
 * Компонент для отображения адреса.
 *
 * @component
 * @example
 * // Пример использования компонента:
 * <AddressItem addressData={{ city: 'City', street: 'Street', building: 'Building 123', apartment: 'Apt 456', email: 'example@email.com' }} />
 *
 * @param {Object} props - Свойства компонента.
 * @param {TypeAddressData} props.addressData - Данные адреса, соответствующие интерфейсу TypeAddressData.
 * 
 * @returns {JSX.Element} Компонент для отображения адреса.
 */
const AddressItem: React.FC<TypeAddressData> = ({ addressData, onClick }) => {

    const { colorText } = useTheme();
    const { selectedTranslations } = useTranslate();
    
    return (
        addressData ?
            <TouchableOpacity style={styles.container} onPress={onClick ? () => onClick(addressData) : () => { }}>
                <Text style={[styles.name, colorText]}>{addressData.name}</Text>
                <Text style={[styles.text, colorText]}>{selectedTranslations.city}: {addressData.city}</Text>
                <Text style={[styles.text, colorText]}>{selectedTranslations.street}: {addressData.street}</Text>
                <Text style={[styles.text, colorText]}>{selectedTranslations.building}: {addressData.building}</Text>
                <Text style={[styles.text, colorText]}>{selectedTranslations.apartment}: {addressData.apartment}</Text>
                <Text style={[styles.text, colorText]}>{selectedTranslations.email}: {addressData.email}</Text>
            </TouchableOpacity>
            : <></>
    )
}
// Получение ширины экрана
const screenWidth = Dimensions.get('window').width * 0.8;

const styles = StyleSheet.create({
    container: {
        width: screenWidth,
    },
    text: {
        width: '100%',
        textAlign: 'left',
        fontSize: 12,
        fontWeight: '400',
    },
    name: {
        width: '100%',
        textAlign: 'left',
        fontSize: 12,
        fontWeight: '700',
    }
})

export default AddressItem;
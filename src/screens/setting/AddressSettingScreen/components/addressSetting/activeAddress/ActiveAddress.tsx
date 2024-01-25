import { View, StyleSheet, Text } from "react-native"
import { useGlobal } from '../../../../../../contexts/global/GlobalContext';
import { useTranslate } from '../../../../../../contexts/translate/TranslateContext';
import { useTheme } from '../../../../../../contexts/theme/ThemeContext';
import AddressItem from "../adress/AddressItem";

/**
 * Компонент для отображения активного адреса пользователя и списка адресов.
 *
 * @component
 * @example
 * // Пример использования компонента:
 * <ActiveAddress />
 */
const ActiveAddress = () => {

    const { address, addressesArray } = useGlobal();
    const { selectedTranslations } = useTranslate();
    const { colorText } = useTheme();

    return (
            <View style={styles.container}>
                <Text style={[styles.title, colorText]}>{selectedTranslations.activeAddress}</Text>
                <AddressItem addressData={address}/>
            </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 30,
        backgroundColor: 'rgba(0,0,0,0.1)',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 20,
    },
    title: {
        width: '100%',
        textAlign: 'center',
        fontSize: 15,
        fontWeight: '500',
        paddingBottom: 10,
    },
})

export default ActiveAddress;
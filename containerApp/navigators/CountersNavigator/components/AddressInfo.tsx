import { Text, StyleSheet } from "react-native";
import { useTheme } from "../../../contexts/theme/ThemeContext";
import { TypeAddressData } from "../../../utils/types/addressTypes";

type AddressInfoProps = {
    address: TypeAddressData;
};

const AddressInfo: React.FC<AddressInfoProps> = ({ address }) => {

    const { colorText } = useTheme();

    return (
        <Text style={[styles.text, colorText]}>{address.city} {address.street} {address.building} {address.apartment}</Text>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 14,
        fontWeight: '500',
    }
})

export default AddressInfo;
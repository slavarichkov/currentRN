import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from "../../contexts/theme/ThemeContext";
import { TypeCounterInfo } from '../../screens/counters/types/types';

interface TextCountersInfoPropsTypes {
    dataCounter: TypeCounterInfo;
}

const TextCountersInfo: React.FC<TextCountersInfoPropsTypes > = ({ dataCounter }) => {
    const { colorText } = useTheme();

    return (
        <View style={styles.container}>
            <Text style={[styles.text, colorText]}>Екатеринбург Буторина 1 141</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingHorizontal: 30,
    },
    text: {
        color: 'rgba(0,0,0,1)',
        fontSize: 14,
        fontWeight: '500',
    }
});

export default TextCountersInfo;
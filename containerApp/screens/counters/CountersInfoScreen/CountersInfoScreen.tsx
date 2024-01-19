import { View, StyleSheet, Text } from "react-native";
//Контекст
import { useTheme } from '../../../contexts/theme/ThemeContext';
import { useGlobal } from '../../../contexts/global/GlobalContext';

import FormSendAndSaveCountersData from "../../../componentsShared/forms/counters/FormSendAndSaveCountersData";


function CountersInfoScreen() {

    const { backgroundColor } = useTheme();
    const { address } = useGlobal();

    return (
        <View style={[styles.container, backgroundColor]}>
            <FormSendAndSaveCountersData />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
    }
})

export default CountersInfoScreen;
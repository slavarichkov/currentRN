import { View, StyleSheet } from "react-native";
import FormAddCountersData from "../../../componentsShared/forms/FormAddCountersData";

//Контекст
import { useTranslate } from '../../../contexts/translate/TranslateContext';

function WaterCounetrsScreen() {

    const { selectedTranslations } = useTranslate();

    function saveData(data) {
        console.log(data);
    }

    return (
        <View style={styles.container}>
            <FormAddCountersData
                onSubmitForm={saveData}
                inputOneLabel={selectedTranslations.hotWater}
                inputTwoLabel={selectedTranslations.coldWater}
                onePlaceholder={selectedTranslations.placeHolderInputCouner}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'gray',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default WaterCounetrsScreen;
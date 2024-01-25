import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import ModalWithChildren from "../../modals/ModalWithChildren";

import { useTranslate } from "../../../contexts/translate/TranslateContext";

function FormLogOut({ isOpenFormSignOut, closeFormSignOut, logOut, theme, localeUser }) {

    const { selectedTranslations } = useTranslate();

    return (
        <ModalWithChildren
            isVisible={isOpenFormSignOut}
            onClose={closeFormSignOut}
            theme={theme}
            childComponent={
                <View style={styles.containerFormSignOut}>
                    <Text style={styles.titleFormSignOut}>{selectedTranslations.logOutFormName}</Text>
                    <View style={styles.containerButtonFormSignOut}>
                        <TouchableOpacity onPress={logOut}>
                            <Text style={styles.textButtonFormSignOut}>{selectedTranslations.yes}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={closeFormSignOut}>
                            <Text style={styles.textButtonFormSignOut}>{selectedTranslations.no}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
            isHiddeButtonUpdateAndRemove={true}
        />
    )
}

const styles = StyleSheet.create({
    containerFormSignOut: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 30,
    },
    titleFormSignOut: {
        color: 'rgba(0,0,0,1)',
        fontWeight: '500',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    containerButtonFormSignOut: {
        paddingTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 150,
    },
    textButtonFormSignOut: {
        color: 'rgba(0,0,0,1)',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})

export default FormLogOut;
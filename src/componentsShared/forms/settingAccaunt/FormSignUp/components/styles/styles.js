import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 30,
    },
    blur: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.5)',
        marginVertical: 5,
        paddingVertical: 3,
        width: '100%',
    },
    containerSubmitButton: {
        zIndex: 3,
        borderRadius: 50,
        marginTop: 10,
        backgroundColor: 'rgba(0, 0, 0, 1)',
        paddingHorizontal: 10,
        width: 205,
        height: 45,
        justifyContent: 'center',
        alignContent: 'center',
    },
    textSubmitButton: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
        padding: 10,
    },
    validationForm: {
        opacity: 0.3,
    },
    validationText: {
        textAlign: 'center',
        paddingTop: 10,
        fontSize: 12,
        color: 'rgba(255, 0,0,0.8)',
    },
    validationTexEmail: {
        textAlign: 'center',
        paddingTop: 30,
        paddingHorizontal: 10,
        fontSize: 12,
        color: 'rgba(0, 0,0,0.8)',
    },
    containerEmailButton: {
        width: '100%',
        borderBottomColor: 'rgba(0,0,0,0.8)',
        borderBottomWidth: 1,
    },
    email: {
        paddingVertical: 3,
    },
    buttonClose: {
        position: 'absolute',
        width: '100%',
        top: 120,
        paddingBottom: 10,
        opacity: 0.7,
    },
    imgButtonClose: {
        width: 30,
        height: 30,
    },
    loader: {
        height: 35,
    },
    buttonSendCode: {
        marginTop: 50,
        height: 20,
        justifyContent: 'center',
        alignContent: 'center',
    },
    textSubmitVerification: {
        fontSize: 12,
    }
})

export default styles;
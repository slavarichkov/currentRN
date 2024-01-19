import { TouchableOpacity, StyleSheet, Image } from "react-native";

/** Кнопка, используемая в выборе(меню или любом другом */
function SelectorButton({ img, onClick, styleButton, styleImage, }) {

    return (
        <TouchableOpacity style={[styles.button, styleButton, styleImage]} onPress={onClick}>
            <Image style={[styles.image, styleImage]} source={img} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        height: 50,
        width: 50,
        backgroundColor: 'transparent',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: 37,
        width: 37,
    }
})

export default SelectorButton;
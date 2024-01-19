import { View, StyleSheet, } from "react-native";
import SelectorButton from "./SelectorButton";

/** Компонент, который позволяет выбирать, путем клика на кнопку*/
function Selector({
    isOneSelect, isTwoSelect, isThreeSelect, isFourSelect, isFiveSelect,
    onClickOne, onClickTwo, onClickThree, onClickFour, onClickFive,
    imgOne, imgTwo, imgThree, imgFour, imgFive,
    styleWidth,
    styleButtonOne, styleButtonTwo, styleButtonThree, styleButtonFour, styleButtonFive,
    styleImage,
}) {

    return (
        <View style={[styles.selector, { width: styleWidth }]}>
            {isOneSelect ?
                <SelectorButton onClick={onClickOne} img={imgOne} styleButton={styleButtonOne} styleImage={styleImage} />
                : <></>}
            {isTwoSelect ?
                <SelectorButton onClick={onClickTwo} img={imgTwo} styleButton={styleButtonTwo} styleImage={styleImage} />
                : <></>}
            {isThreeSelect ?
                <SelectorButton onClick={onClickThree} img={imgThree} styleButton={styleButtonThree} styleImage={styleImage} />
                : <></>}
            {isFourSelect ?
                <SelectorButton onClick={onClickFour} img={imgFour} styleButton={styleButtonFour} styleImage={styleImage} />
                : <></>}
            {isFiveSelect ?
                <SelectorButton onClick={onClickFive} img={imgFive} styleButton={styleButtonFive} styleImage={styleImage} />
                : <></>}
        </View>
    )
}

const styles = StyleSheet.create({
    selector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
})

export default Selector;
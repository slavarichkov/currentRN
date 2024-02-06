import React, { useEffect, useState } from 'react';
import { BlurView } from '@react-native-community/blur';
import { View, TouchableOpacity, StyleSheet, Image, Modal, Dimensions, KeyboardAvoidingView, Platform, LayoutAnimation, Keyboard } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../contexts/theme/ThemeContext';

import imgArrowHider from '../../../images/arrow-down-svgrepo-com.png';

interface ModalWithChildren {
    isVisible: boolean,
    onClose: () => void,
    theme?: string,
    childComponent?: any,
    isLoading?: boolean,
}

const ModalWithChildren: React.FC<ModalWithChildren> = ({
    isVisible,
    onClose,
    //theme,
    childComponent,
}) => {

    // SafeArea
    const insets = useSafeAreaInsets();
    const { theme } = useTheme();

    const [isVisibleModal, setIsVisibleModal] = useState(false);

    useEffect(() => {
        const configureKeyboardLayoutAnimation = () => {
            LayoutAnimation.configureNext(LayoutAnimation.create(
                250, // длительность анимации в миллисекундах
                LayoutAnimation.Types.easeInEaseOut, // тип анимации
                LayoutAnimation.Properties.opacity, // свойство, по которому происходит анимация
            ));
        };

        const keyboardDidShowListener = Keyboard.addListener(
            Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow',
            configureKeyboardLayoutAnimation
        );

        const keyboardDidHideListener = Keyboard.addListener(
            Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide',
            configureKeyboardLayoutAnimation
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    useEffect(() => {
        if (isVisible) {
            setIsVisibleModal(true);
        } else {
            setIsVisibleModal(false);
        }

    }, [isVisible])

    return (
        <Modal animationType="slide" transparent={true} visible={isVisibleModal} onRequestClose={onClose}>
            <TouchableOpacity style={styles.overlay} onPress={onClose}>
                {/* Прозрачный фон */}
            </TouchableOpacity>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.container}>
                <BlurView
                    style={styles.blur}
                    blurType={'light'}
                    blurAmount={theme === "light" ? 9 : 10}
                    overlayColor="rgba(255,255,255,0.3)"
                />
                <View style={[
                    styles.containerInfoTool,
                    theme === 'light' ? styles.backgroundColorLightTheme : styles.backgroundColorDarkTheme,
                    { paddingBottom: insets.bottom < 10 ? 10 : insets.bottom }
                ]}>
                    <TouchableOpacity style={styles.buttonHide} onPress={onClose}>
                        <Image style={styles.buttonImg} source={imgArrowHider} />
                    </TouchableOpacity>
                    {childComponent}
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

const screenHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
    container: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        overflow: 'hidden',
        width: '100%',
        minHeight: 100,
        position: 'absolute',
        bottom: 0,
    },
    blur: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    containerButton: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
    },
    containerInfoTool: {
        //paddingTop: 30,
        paddingHorizontal: 50,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        width: '100%',
        minHeight: 100,
        justifyContent: 'center',
        alignContent: 'center',
    },
    backgroundColorLightTheme: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    backgroundColorDarkTheme: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    textButton: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    buttonImg: {
        width: 30,
        height: 30,
    },
    buttonHide: {
        width: '100%',
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    overlay: {
        flex: 1,
        height: screenHeight,
        // backgroundColor: 'transparent', // Прозрачный черный цвет
        backgroundColor: 'rgba(0,0,0,0)', // Прозрачный черный цвет
    },
});

export default ModalWithChildren;

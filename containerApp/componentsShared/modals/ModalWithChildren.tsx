import React, { useState } from 'react';
import { BlurView } from '@react-native-community/blur';
import { View, TouchableOpacity, StyleSheet, Image, Modal, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import imgArrowHider from '../../../images/arrow-down-svgrepo-com.png';

interface ModalWithChildren {
    isVisible: boolean,
    onClose: () => void,
    onRemove?: () => void,
    onEdit?: () => void,
    theme?: string,
    childComponent?: any,
    isHiddeButtonUpdateAndRemove?: boolean,
    isLoading?: boolean,
    childButtonComponent?: any,
}

const ModalWithChildren: React.FC<ModalWithChildren> = ({
    isVisible,
    onClose,
    theme,
    childComponent,
}) => {

    // SafeArea
    const insets = useSafeAreaInsets();

    return (
        <Modal animationType="slide" transparent={true} visible={isVisible} onRequestClose={onClose}>
            <TouchableOpacity style={styles.overlay} onPress={onClose}>
                {/* Прозрачный фон */}
            </TouchableOpacity>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.container}>
                <BlurView
                    style={styles.blur}
                    blurType={"light"}
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

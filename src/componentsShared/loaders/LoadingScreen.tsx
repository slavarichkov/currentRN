

import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useTheme } from '../../contexts/theme/ThemeContext';
import logoImg from '../../../images/logo/home-1-svgrepo-com.png';

const LoadingScreen = () => {
    const [dotIndex, setDotIndex] = useState(0);
    const { theme, backgroundColor } = useTheme();

    useEffect(() => {
        const interval = setInterval(() => {
            setDotIndex((prevIndex) => (prevIndex + 1) % 3);
        }, 120);

        return () => clearInterval(interval);
    }, []);

    return (
        <View style={[styles.container, backgroundColor]}>
            <View style={styles.imgContainer}>
                <Image
                    source={logoImg}
                    style={styles.image}
                />
                <View style={styles.dotsContainer}>
                    <View style={[styles.dot, dotIndex === 0 && styles.activeDotOne]} />
                    <View style={[styles.dot, dotIndex === 1 && styles.activeDotTwo]} />
                    <View style={[styles.dot, dotIndex === 2 && styles.activeDotThree]} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 250,
        height: 250,
    },
    dotsContainer: {
        position: 'absolute',
        bottom: 255,
        left: 165,
        //flexDirection: 'row',
        marginTop: 10,
    },
    dot: {
        width: 30,
        height: 30,
        borderRadius: 50,
        backgroundColor: '#27bae3',
        marginHorizontal: 1,
        opacity: 0,
    },
    activeDotOne: {
        backgroundColor: '#27bae3', // Измените цвет активной точки по вашему выбору
        opacity: 1,
    },
    activeDotTwo: {
        backgroundColor: '#27bae3', // Измените цвет активной точки по вашему выбору
        opacity: 1,
        marginBottom: 5,
    },
    activeDotThree: {
        backgroundColor: '#27bae3', // Измените цвет активной точки по вашему выбору
        opacity: 1,
        marginBottom: 10,
    },
    imgContainer: {
        position: 'relative',
    }
});

export default LoadingScreen;

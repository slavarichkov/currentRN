import React from 'react';
import { View, Text, Switch, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';

interface SwitcherProps {
    textOn: string;
    textOff: string;
    on: () => void;
    off: () => void;
    isEnabled: boolean;
    setIsEnabled: React.Dispatch<React.SetStateAction<boolean>>;
    styleText?: StyleProp<TextStyle>;
}

/**
 * Компонент Switcher с возможностью включения/выключения и текстовым статусом.
 *
 * @component
 * @example
 * // Пример использования:
 * // <Switcher
 * //   textOn="Включено"
 * //   textOff="Выключено"
 * //   on={() => console.log('Включено')}
 * //   off={() => console.log('Выключено')}
 * //   isEnabled={true}
 * //   setIsEnabled={setIsEnabled}
 * //   styleText={{ color: 'blue' }}
 * // />
 *
 * @param {Object} props - Свойства компонента.
 * @param {string} props.textOn - Текст при включенном состоянии.
 * @param {string} props.textOff - Текст при выключенном состоянии.
 * @param {() => void} props.on - Callback при включении.
 * @param {() => void} props.off - Callback при выключении.
 * @param {boolean} props.isEnabled - Состояние включено/выключено.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} props.setIsEnabled - Setter для состояния isEnabled.
 * @param {StyleProp<TextStyle>} [props.styleText] - Стили для текста.
 * 
 * @returns {React.JSX.Element} - JSX-элемент компонента Switcher.
 */
const Switcher: React.FC<SwitcherProps> = ({ textOn, textOff, on, off, isEnabled, setIsEnabled, styleText }) => {
    const toggleSwitch = () => {
        setIsEnabled((previousState) => !previousState);
        if (!isEnabled) {
            on()
        } else {
            off()
        }
    };

    return (
        <View style={styles.container}>
            <Switch
                trackColor={{ false: '#767577', true: '#767577' }}
                thumbColor={isEnabled ? 'green' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
            <Text style={[styles.status, styleText ? styleText : '']}>
                {isEnabled ? textOn : textOff}
            </Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    label: {
        fontSize: 18,
    },
    status: {
        fontSize: 15,
        fontWeight: '500',
        color: 'black',
        paddingLeft: 3,
    },
});

export default Switcher;

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TextStyle, ViewStyle } from 'react-native';
import Loader from '../../../../componentsShared/loaders/Loader';

interface ButtonClickCounterProps {
  onClick: () => void;
  text: string;
  theme?: 'dark' | 'light';
  isLoading?: boolean;
  disabled?: boolean;
  style?: any;
}

/** Кнопка редактирования счетчика */
const ButtonClickCounter: React.FC<ButtonClickCounterProps> = ({ onClick, text, style, theme, isLoading, disabled }) => {
  
  const onPress = () => {
    if (!isLoading && !disabled) {
      onClick();
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, style ? style : '', disabled ? styles.opacity : undefined]}
      onPress={onPress}
    >
      {isLoading ? <Loader /> : <Text style={styles.text}>{text}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 3,
    borderRadius: 50,
    width: 150,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderColor: 'white',
    borderWidth: 1,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '700',
    paddingHorizontal: 10,
  },
  opacity: {
    opacity: 0.3,
  },

});

export default ButtonClickCounter;



import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TextStyle, ViewStyle } from 'react-native';
import Loader from '../loaders/Loader';

interface ButtonProps {
  onClick: () => void;
  text: string;
  theme?: 'dark' | 'light';
  isLoading?: boolean;
  disabled?: boolean;
  style?: any;
}

const Button: React.FC<ButtonProps> = ({ onClick, text, style, theme, isLoading, disabled }) => {
  const backgroundColor: string = theme === 'dark' ? 'rgba(110, 110, 110, 0.5)' : 'black';

  const onPress = () => {
    if (!isLoading && !disabled) {
      onClick();
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor }, style ? style : '', disabled ? styles.opacity : undefined]}
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
    minWidth: 150,
    height: 40,
    paddingHorizontal: 10,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '700',
    paddingTop: 12,
    paddingHorizontal: 10,
  },
  opacity: {
    opacity: 0.3,
  }
});

export default Button;



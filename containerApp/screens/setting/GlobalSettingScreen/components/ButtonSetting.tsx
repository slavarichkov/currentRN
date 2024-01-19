import React from "react";
import { TouchableOpacity, StyleSheet, Text, ViewStyle } from "react-native";
import Loader from "../../../../componentsShared/loaders/Loader";

interface ButtonSettingProps {
  style?: ViewStyle;
  onClick: () => void;
  text: string;
  isLoading?: boolean;
}

const ButtonSetting: React.FC<ButtonSettingProps> = ({ style, onClick, text, isLoading }) => {
  return (
    <TouchableOpacity style={[styles.buttonProfile, style]} onPress={onClick}>
      {!isLoading ? (
        <Text style={styles.text}>{text}</Text>
      ) : (
        <Loader />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonProfile: {
    backgroundColor: 'rgba(0,0,0,1)',
    padding: 10,
    borderRadius: 10,
    minWidth: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default ButtonSetting;

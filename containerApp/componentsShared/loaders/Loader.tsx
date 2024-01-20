import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

interface LoaderProps {
  size?: 'small' | 'large';
  color?: string;
}

/**
 * Компонент для отображения индикатора загрузки.
 * @param {LoaderProps} props - Пропсы компонента Loader.
 * @returns {React.ReactNode} Компонент Loader.
 */
const Loader: React.FC<LoaderProps> = ({ size, color }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size ? size : 'large'} color={color ? color : "white"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loader;

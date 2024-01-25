import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';

const Checkbox = ({ text, isChecked, setChecked, link, linkText, linkName }) => {

  const handleToggle = () => {
    setChecked(!isChecked);
  };

  // Функция для открытия ссылок
  const openLink = async () => {
    try {
      const supported = await Linking.canOpenURL(link);

      if (supported) {
        await Linking.openURL(link);
      } else {
        console.error("Не удалось открыть ссылку. URL не поддерживается.");
      }
    } catch (error) {
      console.error("Произошла ошибка при открытии ссылки:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.checkbox, isChecked && styles.checkedCheckbox]}
        onPress={handleToggle}
      />
      <Text style={styles.text}>{text}</Text>
      {link !== undefined ?
        <TouchableOpacity style={styles.linkContainer} onPress={openLink}>
          <Text style={styles.textLink}>
            {linkText}
            <Text style={styles.privacyPolicyOpenButton}>{linkName}</Text>
          </Text>
          {/* <Text style={styles.privacyPolicyOpenButton}>{linkName}</Text> */}
        </TouchableOpacity>
        : <></>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    width: 300,
  },
  text: {
    color: 'rgba(0,0,0,1)',
    fontWeight: '500',
    fontSize: 12,
    marginLeft: 10,
  },
  textLink: {
    color: 'rgba(0,0,0,1)',
    fontSize: 12,
  },
  privacyPolicyOpenButton: {
    fontSize: 12,
    color: 'blue',
    textDecorationLine: 'underline', // Это свойство добавляет подчеркивание
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 4,
  },
  checkedCheckbox: {
    backgroundColor: 'yellow',
    borderColor: 'yellow',
  },
  linkContainer: {
    paddingRight: 10,
    flexDirection: 'column',
  },
});

export default Checkbox;



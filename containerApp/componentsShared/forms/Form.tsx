//Форма для отправки данных

import React, { ReactNode } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { BlurView } from '@react-native-community/blur';
//Контекст
import { useTheme } from '../../contexts/theme/ThemeContext';
import { useTranslate } from '../../contexts/translate/TranslateContext';

import Loader from '../loaders/Loader';

import imgCloseButton from '../../../images/cross.png';

interface FormProps {
  nameForm: string;
  isFormValid: boolean;
  sumbit: () => void;
  isSubmitLoading: boolean;
  onCloseForm: () => void;
  visible: boolean;
  child: ReactNode;
  messageValidation: string;
  withoutButton?: boolean;
  localeUser?: string;
  serverMessage?: string;
}

const Form: React.FC<FormProps> = ({
  nameForm,
  isFormValid,
  sumbit,
  isSubmitLoading,
  onCloseForm,
  visible,
  child,
  messageValidation,
  withoutButton,
  localeUser,
  serverMessage,
}) => {

  const { selectedTranslations } = useTranslate();
  const { theme, colorText } = useTheme();

  return (
    <Modal
      animationType={"fade"}
      transparent={true}
      visible={visible}
      onRequestClose={onCloseForm}
    >
      {/* Заблюренный задний фон */}
      <BlurView style={styles.blurBackground} blurType='dark' blurAmount={theme === 'light' ? 5 : 4} />
      {/* Содержимое модального окна */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.modalContainer}>
        {/* КНОПКА СВОРАЧИВАНИЯ ФОРМЫ */}
        <TouchableOpacity onPress={onCloseForm}>
          <Image source={imgCloseButton} style={styles.closeButton} />
        </TouchableOpacity>
        <View style={styles.modalContent}>
          <Text style={[styles.modalTitle, colorText ]}>{nameForm}</Text>
          {child}
          {withoutButton ?
            <></>
            :
            //{/* КНОПКА САБМИТА */ }
            < TouchableOpacity
              style={[styles.submitButton, isFormValid ? {} : styles.disabledButton]}
              onPress={() => {
                if (isFormValid && !isSubmitLoading) {
                  sumbit()
                  // Выполните здесь логику отправки данных
                }
              }}
              disabled={!isFormValid}
            >
              {isSubmitLoading ?
                <Loader />
                :
                <Text style={styles.submitButtonText}>{selectedTranslations.formAddSubmitButton}</Text>}
            </TouchableOpacity>}
          <Text style={styles.messageValidation}>{messageValidation}</Text>
        </View>
      </KeyboardAvoidingView>
    </Modal >
  );
};

const styles = StyleSheet.create({
  blurBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    bottom: 0,
  },
  modalContent: {
    position: 'relative',
    width: 300,
    minHeight: 100,
    borderRadius: 30,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalTitle: {
    color: 'rgba(0,0,0,1)',
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  submitButton: {
    width: 150,
    minHeight: 32,
    backgroundColor: 'black',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  closeButton: {
    width: 30,
    height: 30,
    position: 'absolute',
    top: -55,
    right: -150,
  },
  submitButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
  },
  disabledButton: {
    opacity: 0.3,
  },
  messageValidation: {
    color: 'rgba(255,0,0, 0.37)',
    fontSize: 12,
    fontWeight: '500',
    paddingVertical: 5,
    textAlign: 'center',
  },
});

export default Form;

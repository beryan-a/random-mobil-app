import React from 'react';
import { Pressable, Text, StyleSheet,TouchableOpacity } from 'react-native';
import i18n from '@/services/i18n/index';

function StartButton({ callback, text = i18n.t("gameScreen.StartGame") }) {
  return (
    <TouchableOpacity
      onPress={callback}
      style={
        styles.button
      }
    >
      <Text style={styles.text}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: '#333333',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#cc6c8c',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    width: '100%',
  },
  buttonPressed: {
    backgroundColor: '#cc6c8c',
  },
  text: {
    color: '#ffffff',
    fontFamily: 'monospace',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default StartButton;
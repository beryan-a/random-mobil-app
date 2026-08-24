import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import i18n from '@/services/i18n';

const Display = ({ gameOver, textKey, params, text }) => {
  // Eğer doğrudan i18n anahtarı verilmişse çevir, verilmemişse düz text bas
  const content = textKey ? i18n.t(textKey, params) : text;

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: gameOver ? '#ff0000' : '#999999' }]}>
        {content}
      </Text>
    </View>
  );
};

export default Display;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    padding: 20,
    borderWidth: 4,
    borderColor: '#333333',
    minHeight: 30,
    width: '100%',
    borderRadius: 20,
    backgroundColor: '#000000',
  },
  text: {
    fontFamily: 'monospace',
    fontSize: 10,
  },
});
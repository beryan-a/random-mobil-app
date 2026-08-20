import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

function SpeedSlider({ speed, onSpeedChange }) {
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>Speed: {speed} ms</Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric" // Sayısal klavye açar
        value={String(speed)} // TextInput sadece string kabul eder
        onChangeText={(text) => onSpeedChange(Number(text) || 0)} // Metni sayıya çevirir
      />
    </View>
  );
}

export default SpeedSlider;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: '100%',
  },
  paragraph: {
    color: '#000000',
    fontFamily: 'monospace',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    color: '#000000',
    fontFamily: 'monospace',
    borderWidth: 1,
    borderColor: '#cc6c8c',
    padding: 8,
    borderRadius: 6,
  },
});
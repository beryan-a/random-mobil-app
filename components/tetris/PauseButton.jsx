import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const PauseButton = ({ callback, isPaused }) => {
  return (
    <TouchableOpacity
      style={[styles.button, isPaused && styles.buttonPaused]}
      onPress={callback}
      activeOpacity={0.7}
    >
      <Text style={styles.text}>{isPaused ? 'Resume' : 'Pause'}</Text>
    </TouchableOpacity>
  );
};


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
  buttonPaused: {
    backgroundColor: '#cc6c8c',
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
});

export default PauseButton;
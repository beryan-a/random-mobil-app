import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const PauseButton = ({ callback, isPaused }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={callback}>
      <Text style={styles.text}>{isPaused ? 'Resume' : 'Pause'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 12,
    backgroundColor: '#333',
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PauseButton;
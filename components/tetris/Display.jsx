//import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';


const Display = ({ gameOver, text }) => (
  <View style={styles.container}>
    <Text style={[styles.text, { color: gameOver ? '#ff0000' : '#999999' }]}>
      {text}
    </Text>
  </View>
);

export default Display;

const styles = StyleSheet.create({
  container: {
    // display: 'flex' ve boxSizing: 'border-box' React Native'de varsayılandır, yazmaya gerek yoktur.
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20, // margin: 0 0 20px 0 karşılığı
    padding: 20,
    borderWidth: 4,
    borderColor: '#333',
    minHeight: 30,
    width: '100%',
    borderRadius: 20,
    backgroundColor: '#000',
  },
  text: {
    fontFamily: 'monospace',
    fontSize: 13, // 0.8rem karşılığı yaklaşık 13-14px
  },
})
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import i18n from '@/services/i18n';

function SpeedSlider({ speed, onSpeedChange }) {
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{i18n.t("gameScreen.Speed")}: {speed} ms</Text>
      <Slider
        style={styles.slider}
        minimumValue={50}
        maximumValue={1500}
        step={50}
        value={speed}
        onValueChange={onSpeedChange}
        minimumTrackTintColor="#cc6c8c"
        maximumTrackTintColor="#555555"
        thumbTintColor="#cc6c8c"
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
    color: '#ffffff',
    fontFamily: 'monospace',
    marginBottom: 8,
  },
  slider: {
    width: '100%',
    height: 40,
  },
});
// import { transform } from "lodash";
// import React from "react";
// import { Pressable, Text, StyleSheet} from "react-native";

// function StartButton({ callback , text = 'START GAME'}) {
//   return (
//     <Pressable onPress={callback} 
//         style={({ pressed }) => [
//         styles.button,
//         pressed && styles.buttonPressed // Tıklama efekti (opaklık)
//       ]}> {/*tuşa basılınca start game çalışacak*/}
//         <Text style={styles.text}>{text}</Text>
//     </Pressable>
//   );
// }

// export default StartButton;

// const styles = StyleSheet.create({
//   button: {
//     marginBottom: 20,
//     padding: 16,
//     minHeight: 48,
//     width: '100%',
//     borderRadius: 20,
//     backgroundColor: '#cc6c8c',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   buttonPressed: {
//     opacity: 0.8,
//     transform: [{scale: 0.98}],
//   },
//   text: {
//     color: '#ffffff',
//     fontFamily: 'monospace',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// })

import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

function StartButton({ callback, text = 'Start Game' }) {
  return (
    <Pressable
      onPress={callback}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
      ]}
    >
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

export default StartButton;

const styles = StyleSheet.create({
  button: {
    marginBottom: 20,
    padding: 16,
    minHeight: 48,
    width: '100%',
    borderRadius: 20,
    backgroundColor: '#cc6c8c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  text: {
    color: '#ffffff',
    fontFamily: 'monospace',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
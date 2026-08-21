import { Pressable } from "react-native";

function StartButton({ callback , text}) {
  return (
    <Pressable onPress={callback} style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed // Tıklama efekti (opaklık)
      ]}> {/*tuşa basılınca start game çalışacak*/}
        <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

export default StartButton;

const styles = StyleSheet.create({
  button: {
    marginBottom: 20,
    padding: 20,
    minHeight: 30,
    width: '100%',
    borderRadius: 20,
    backgroundColor: '#cc6c8c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: {
    opacity: 0.8,
  },
  text: {
    color: '#ffffff',
    fontFamily: 'monospace',
    fontSize: 16,
  },
})
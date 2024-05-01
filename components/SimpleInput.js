import { TextInput, StyleSheet, View } from "react-native";
import normalize from './FontNormalize';

export default function SimpleInput({placeholder, maxLength, icon, fontSize=14, simple=0, editable=1, secureTextEntry, inputMode, multiline, numberOfLines, styleDiv}) {
  if (simple) {
    addiStyle = {};
  } else {
    addiStyle = {borderColor: '#ccc', borderWidth: 2, backgroundColor: 'white'};
  }
  return (
    <View style={[styles.button, addiStyle, styleDiv]}>
      {icon}
      <TextInput 
        style={{fontSize: normalize(fontSize) }}
        placeholder={placeholder} 
        placeholderTextColor="#ccc"
        secureTextEntry={secureTextEntry}
        inputMode={inputMode}
        maxLength={maxLength}
        multiline={multiline}
        numberOfLines={numberOfLines}
        editable={editable}
      />
  </View>
  );
}

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderRadius: 16,
    gap: 10,
  },
})

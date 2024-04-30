import { TextInput, StyleSheet, View } from "react-native";
import normalize from './FontNormalize';

export default function SimpleInput({placeholder, maxLength, icon, fontSize=14, simple=0, style={maxWidth: '90%'}, secureTextEntry, inputMode, multiline, numberOfLines}) {
  if (simple) {
    addiStyle = {};
  } else {
    addiStyle = {borderColor: '#ccc', borderWidth: 2, backgroundColor: 'white'};
  }
  return (
    <View style={[styles.button, addiStyle]}>
      {icon}
      <TextInput 
        style={[{marginLeft: 10, fontSize: normalize(fontSize)}, style]}  
        placeholder={placeholder} 
        placeholderTextColor="#ccc"
        secureTextEntry={true}
        inputMode={inputMode}
        maxLength={maxLength}
        multiline={multiline}
        numberOfLines={numberOfLines}
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
  },
})
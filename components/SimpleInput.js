import { TextInput, StyleSheet, View } from 'react-native';

import normalize from './FontNormalize';
import { Colors } from '../constants/theme';

export default function SimpleInput({
  placeholder,
  maxLength,
  icon,
  fontSize = 14,
  simple = false,
  editable = true,
  secureTextEntry = false,
  inputMode,
  multiline,
  numberOfLines,
  defaultValue,
  styleDiv,
  onChangeText=()=>{},
  styleInput,
}) {
  if (simple) {
    addiStyle = {};
  } else {
    addiStyle = {
      borderColor: Colors.dark_gray,
      borderWidth: 2,
      backgroundColor: 'white',
    };
  }
  
  return (
    <View style={[styles.button, addiStyle, styleDiv]}>
      {icon}
      <TextInput
        style={[{fontSize: normalize(fontSize)}, styleInput]}
        placeholder={placeholder}
        placeholderTextColor={Colors.dark_gray}
        secureTextEntry={secureTextEntry}
        inputMode={inputMode}
        maxLength={maxLength}
        multiline={multiline}
        numberOfLines={numberOfLines}
        editable={editable}
        defaultValue={defaultValue}
        onChangeText={onChangeText}
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
});
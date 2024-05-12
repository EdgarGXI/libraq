import { Text, Pressable, StyleSheet } from 'react-native';

import normalize from './FontNormalize';
import { Colors } from '../constants/theme';

export function WhiteButton(props) {
  const { onPress, title = null, fontSize = 14, fontColor = Colors.accent, border, icon, style } = props;
  if (title!=null) {
    return (
      <Pressable 
        style={({ pressed }) => [styles.whiteButton, style, {opacity: pressed ? 0.8 : 1}]} 
        onPress={onPress}
      >
        {icon}
        <Text 
          style={{
            color: fontColor,
            fontWeight: 700, 
            fontSize: normalize(fontSize),
          }}>
          {title}
        </Text>
      </Pressable>
    );
  } else {
    return (
      <Pressable 
        style={({ pressed }) => [styles.whiteButton, border, style, {opacity: pressed ? 0.8 : 1}]} 
        onPress={onPress}
      >
        {icon}
      </Pressable>
    );
  }
}

export function PurpleButton(props) {
  const { onPress, fontSize = 14, title, style } = props;
  return (
    <Pressable 
      style={({ pressed }) => [styles.purpleButton, style, {opacity: pressed ? 0.8 : 1}]} 
      onPress={onPress}
    >
      <Text 
        style={{
          color: 'white',
          fontWeight: '700',
          fontSize: normalize(fontSize),
        }}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  whiteButton: {
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 16,
    gap: 10,
  },
  purpleButton: {
    backgroundColor: Colors.accent,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 16,
  }
})
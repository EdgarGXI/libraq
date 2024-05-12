import { View } from "react-native";

import { NormalText, MiniText } from '../components/FontSizing';
import { Colors } from '../constants/theme';

export default function Stat(props) {
  const { icon, desc, number, style } = props;
  return(
    <View 
      style={[
        {
          backgroundColor: Colors.accent, 
          alignItems: 'center', 
          borderRadius: 18, 
          padding: 15
        }, 
        style,
      ]}
    >
      <View style={{ aspectRatio: 1, width: '70%', marginBottom: 5 }}>
        {icon}
      </View>
      <NormalText style={{ color: 'white' }}>{number}</NormalText>
      <MiniText style={{ color: 'white' }}>{desc}</MiniText>
    </View>
  );
}
import { NormalText } from './FontSizing';
import { Colors } from '../constants/theme';

export default function Chip({content, style}) {
  return (
    <NormalText 
      style={[
        {
          borderRadius: 14, 
          backgroundColor: 'white', 
          borderColor: Colors.dark_gray, 
          borderWidth: 1, 
          paddingVertical: 8, 
          paddingHorizontal: 13
        }, 
        style,
      ]}
    >
      {content}
    </NormalText>
  );
}
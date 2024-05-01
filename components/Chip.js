import { NormalText } from './FontSizing';

export default function Chip({content}) {
  return (
    <NormalText 
      style={{
        borderRadius: 20, 
        backgroundColor: '#fff', 
        borderColor: '#ccc', 
        borderWidth: 1, 
        paddingVertical: 8, 
        paddingHorizontal: 13
      }}
    >
      {content}
    </NormalText>
  );
}

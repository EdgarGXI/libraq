import { View, Pressable } from 'react-native';

import { NormalText, MiniText } from './FontSizing';

export default function Review(props) {
  const {reviewID, accountID, date, content} = props;
  
  accountUser = 'TomCherry'
  
  // pensaba que aquí se podían fetchear las responses cuyo response===reviewID o sea que sean respuestas pero ahora me estoy replanteando si no los dejamos responderse y ya
  
  return(
    <View 
      style={{
        backgroundColor: 'white', 
        borderRadius: 18, 
        padding: 15, 
        width: '100%', 
        shadowColor: '#555', 
        shadowOpacity: 1, 
        shadowOffset: 0,
      }}
    >
      <Pressable onPress={() => {}}>
        <NormalText style={{ fontWeight: 700, paddingBottom: 6 }}>
          {accountUser}
        </NormalText>
      </Pressable>
      <MiniText 
        style={{
          position: 'absolute', 
          alignSelf: 'flex-end', 
          color: '#9e9e9e', 
          paddingTop: 15, 
          paddingRight: 15, 
          textAlign: 'right',
        }}
      >
        {date}
      </MiniText>
      <NormalText>{content}</NormalText>
    </View>
  );
}
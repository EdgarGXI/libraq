import { View, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { NormalText, MiniText } from './FontSizing';
import { Colors } from '../constants/theme';

/* para links de internet 
source={{
  uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/b2f5a5f919149d509ca26f69547e2440d68f050dba0cc1e2d06d448d246b1c7a?'
}}*/
export default function BookSale(props) {
  const {
    title, 
    author, 
    editorial, 
    year, 
    cover, 
    price, 
    statusShow, 
    statusPurchase, 
    id, 
    date,
    image,
  } = props;
  
  const navigation = useNavigation();

  //Este handle va a cambiar cuando toque hacer las verificaciones y eso, de ultimo se manda al home.
  const viewDetails = () => {
    navigation.navigate('Detalles de venta', {booksaleid: id});
  };

  return(
    <Pressable 
      style={{
        flexDirection: 'row', 
        width: '100%', 
        alignItems: 'center', 
        justifyContent: 'space-between',
      }} 
      onPress={viewDetails}
    >
      <View style={{ width: '35%', aspectRatio: 0.7 }}>
        <Image 
          style={{ width: null, height: null, flex: 1 }}
          resizeMode='stretch'
          source={{uri: image}}
        />
      </View>
      <View style={{ width: '60%' }}>
        <MiniText style={{ color: Colors.gray }}>{date}</MiniText>
        <NormalText style={{ fontWeight: 700 }}>{title}</NormalText>
        <NormalText style={{ paddingBottom: 8, color: Colors.gray }}>{author}</NormalText>
        <NormalText style={{ color: Colors.gray }}>{editorial}, {year}</NormalText>
        <NormalText style={{ color: Colors.gray }}>Tapa {cover}</NormalText>
        <NormalText style={{ color: '#CB0C9F', paddingBottom: 8, fontWeight: 600 }}>${price}</NormalText>
        <NormalText 
          style={{
            backgroundColor: '#0b0', 
            padding: 8, 
            textAlign: 'center', 
            fontWeight: 700, 
            marginLeft: -3, 
            color: 'white'
          }}
        >
          {statusShow}
        </NormalText>
      </View>
    </Pressable>
  );
}

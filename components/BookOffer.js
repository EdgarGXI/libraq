//import React from 'react';
import { View, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { NormalText, MiniText } from './FontSizing';
import { Colors } from '../constants/theme';

export default function BookOffer(props) {
  const {
    title, 
    author, 
    statusShow, // bookoffer
    id, // booksale
    idOffer, // bookoffer
    offerer,
    deliveryaddress,
    date,
  } = props;
  
  const navigation = useNavigation();

  //Este handle va a cambiar cuando toque hacer las verificaciones y eso, de ultimo se manda al home.
  const viewDetails = () => {
    navigation.navigate('Detalles de venta', {booksaleid: id, bookofferid: idOffer});
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
          source={require('../assets/images/coverdefault.png')}
        />
      </View>
      <View style={{ width: '60%' }}>
        <MiniText style={{ color: Colors.gray }}>{date}</MiniText>
        <NormalText style={{ fontWeight: 700 }}>{title}</NormalText>
        <NormalText style={{ paddingBottom: 8, color: Colors.gray }}>{author}</NormalText>
        <NormalText style={{ color: Colors.gray }}>Pedido por: {offerer}</NormalText>
        <NormalText style={{ color: Colors.gray, paddingBottom: 8 }}>{deliveryaddress}</NormalText>
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
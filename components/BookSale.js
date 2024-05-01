//import React from 'react';
import { View, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { NormalText, MiniText } from './FontSizing';

/* para links de internet 
source={{
  uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/b2f5a5f919149d509ca26f69547e2440d68f050dba0cc1e2d06d448d246b1c7a?"
}}*/
export default function BookSale(props) {
  const {title, author, editorial, year, cover, price, statusShow, statusPurchase, id, date} = props;
  
  const navigation = useNavigation();

  //Este handle va a cambiar cuando toque hacer las verificaciones y eso, de ultimo se manda al home.
  const viewDetails = () => {
    navigation.navigate(
      'Detalles de venta', 
      {seller: "TomCherry", //fetch
      title: title, 
      author: author, 
      editorial: editorial, 
      year: year, 
      cover: cover, 
      genres: ["Ficción"], //fetch
      marked: true, 
      damaged: true, 
      price: price, 
      description: "lorem ipsum bla", //fecth
      id: id,
      date: date,
      statusShow: statusShow,
      statusPurchase: statusPurchase }
    );
  };

  return(
    <Pressable style={{flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between'}} onPress={viewDetails}>
      <View style={{width: '35%', aspectRatio: 0.7}}>
        <Image 
          style={{width: null, height: null, flex: 1}}
          resizeMode="stretch"
          source={require('../assets/images/coverdefault.png')}
        />
      </View>
      <View style={{width: '60%'}}>
        <MiniText style={{color: '#9e9e9e'}}>{date}</MiniText>
        <NormalText style={{fontWeight: 700}}>{title}</NormalText>
        <NormalText style={{paddingBottom: 8, color: '#9e9e9e'}}>{author}</NormalText>
        <NormalText style={{color: '#9e9e9e'}}>{editorial}, {year}</NormalText>
        <NormalText style={{color: '#9e9e9e'}}>Tapa {cover}</NormalText>
        <NormalText style={{color: '#CB0C9F', paddingBottom: 8, fontWeight: 600}}>${price}</NormalText>
        <NormalText style={{backgroundColor: '#0b0', padding: 8, textAlign: 'center', fontWeight: 700, marginLeft: -3, color: 'white'}}>{statusShow}</NormalText>
      </View>
    </Pressable>
  );
}

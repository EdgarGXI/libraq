//import React from 'react';
import { View, Image, Pressable } from 'react-native';
import { NormalText, MiniText } from './FontSizing';

/* para links de internet 
source={{
  uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/b2f5a5f919149d509ca26f69547e2440d68f050dba0cc1e2d06d448d246b1c7a?"
}}*/
export default function BookSale(props) {
  const {title, author, editorial, year, cover, price, status, id, date} = props;
  return(
    <Pressable style={{flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between'}}>
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
        <NormalText style={{backgroundColor: '#0b0', padding: 8, textAlign: 'center', fontWeight: 700, marginLeft: -3, color: 'white'}}>{status}</NormalText>
      </View>
    </Pressable>
  );
}

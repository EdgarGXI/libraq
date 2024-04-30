import React from 'react';
import { View, Image } from 'react-native';
import normalize from './FontNormalize';
import NormalText from './FontSizing';

export default function BookSale(props) {
  const {title, author, editorial, year, cover, state, status, id} = props;
  return(
    <View style={{flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 25}}>
      <Image 
        style={{width: '35%', aspectRatio: '0.7'}}
        resizeMode="stretch"
        source={{
          uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/b2f5a5f919149d509ca26f69547e2440d68f050dba0cc1e2d06d448d246b1c7a?"
        }}
      />
      <View style={{width: '60%'}}>
        <NormalText style={{fontWeight: 700}}>{title}</NormalText>
        <NormalText style={{paddingBottom: 8, color: '#9e9e9e'}}>{author}</NormalText>
        <NormalText style={{color: '#9e9e9e'}}>{editorial}, {year}</NormalText>
        <NormalText style={{color: '#9e9e9e'}}>Tapa {cover}</NormalText>
        <NormalText style={{color: '#CB0C9F', paddingBottom: 8, fontWeight: 600}}>{state}</NormalText>
        <NormalText style={{backgroundColor: '#0b0', padding: 8, textAlign: 'center', fontWeight: 700, marginLeft: -3, color: 'white'}}>{status}</NormalText>
      </View>
    </View>
  );
}
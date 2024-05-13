import { View, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { NormalText, MiniText } from './FontSizing';
import { Colors, Icons } from '../constants/theme';
import { changeOfferStatus, deleteRow } from '../db';
import { useAuth } from '../Auth';

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
  const currUserID = useAuth().state.userToken;
  
  const navigation = useNavigation();

  const viewDetails = () => {
    navigation.navigate('Detalles de venta', {booksaleid: id, bookofferid: idOffer});
  };

  const handleReject = async () => {
    await changeOfferStatus(idOffer, 'RECHAZADO');
    navigation.navigate('Home');
    viewDetails();
  }

  const handleAccept = async () => {
    await changeOfferStatus(idOffer, 'ACEPTADO');
    navigation.navigate('Home');
    viewDetails();
  }

  const handleDeleteOffer = async () => {
    if (currUserID === offerer.accountid) {
      await deleteRow('bookoffer', 'bookofferid', idOffer);
      navigation.navigate('Detalles de venta', {booksaleid: id});
    }
  }
  
  return(
    <View 
      style={{
        flexDirection: 'row', 
        width: '100%', 
        alignItems: 'center', 
        justifyContent: 'space-between',
      }} 
      onPress={viewDetails}
    >
      <Pressable style={{ width: '35%', aspectRatio: 0.7 }}>
        <Image 
          style={{ width: null, height: null, flex: 1 }}
          resizeMode='stretch'
          source={require('../assets/images/coverdefault.png')}
        />
      </Pressable>
      <View style={{ width: '60%' }}>
        <View style={{ paddingBottom: 8, flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexShrink: 1 }}>
            <MiniText style={{ color: Colors.gray }}>{date}</MiniText>
            <NormalText style={{ fontWeight: 700 }}>{title}</NormalText>
            <NormalText style={{ color: Colors.gray }}>{author}</NormalText>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'end' }}>
            { currUserID === offerer.accountid ? (
              <Pressable 
                style={{ width: 30, height: 30 }} 
                onPress={handleDeleteOffer}
              >
                {Icons.bin(Colors.accent)}
              </Pressable>
            ) : (
              <>
              { statusShow != 'PEDIDO ACEPTADO' && statusShow != 'PEDIDO RECHAZADO' ? (
                <>
                  <Pressable 
                    style={{ width: 30, height: 30 }} 
                    onPress={handleReject}
                  >
                    {Icons.close(Colors.accent)}
                  </Pressable>
                  <Pressable 
                    style={{ width: 30, height: 30 }}
                    onPress={handleAccept}
                  >
                    {Icons.check(Colors.accent)}
                  </Pressable>
                </>
              ) : (
                <View 
                  style={{ width: 30, height: 30 }}
                >
                  {statusShow != 'PEDIDO RECHAZADO' ? Icons.check(Colors.accent) :  Icons.close(Colors.accent)}
                </View>
              )}
              </>
            )}
          </View>
        </View>
        <NormalText style={{ color: Colors.gray }}>Pedido por: {offerer.name}</NormalText>
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
    </View>
  );
}

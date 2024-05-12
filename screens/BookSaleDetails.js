import { View, StyleSheet, ScrollView, SafeAreaView, Image } from 'react-native';
import { useEffect, useState } from 'react';

import { PurpleButton, WhiteButton } from '../components/Buttons';
import { NormalText, TitleText } from '../components/FontSizing';
import Chip from '../components/Chip';
import { fetchBookSaleDetails, fetchAll, fetchByColumn } from '../db';

export default function BookSaleDetails({ route, navigation }) {
  const { booksaleid=null, bookofferid=null } = route.params;
  const [genresChip, setGenres] = useState([]);
  const [status, setStatus] = useState([]);
  const [details, setDetails] = useState({});

  // fetches remaining details
  useEffect(() => {
    const getStoredData = async() => {
      let item = await fetchBookSaleDetails(booksaleid);
      let offer = bookofferid !== null ? (
        await fetchByColumn('bookoffer', 'bookofferid', bookofferid)
      ) : (
        null
      );
      let offerer = bookofferid !== null ? (
        await fetchByColumn('account', 'accountid', offer[0].accountid, 'name')
      ) : (
        null
      );
      setDetails({
        title: item.title,
        author: item.author,
        editorial: item.editorial,
        year: item.year,
        cover: item.cover,
        price: item.price,
        statusShow: bookofferid !== null ? 'PEDIDO '+offer[0].status : 'VENTA '+item.status,
        statusPurchase: 'VENTA '+item.status,
        address: bookofferid !== null ? offer[0].deliveryaddress : null,
        seller: item.account,
        offerer: bookofferid !== null ? offerer[0] : null,
        //image={item.image}
      });
      // set genres
      if (item.bookgenre.length > 0) {
        for (let i = 0; i < item.bookgenre.length; i++) {
          setGenres(genresChip => [...genresChip, <Chip content={item.bookgenre[i].genre} />]);
        }
      } else {
        setGenres([<Chip content='Indefinido' />]);
      }
      // set status
      if (item.marked || item.damaged) {
        if (item.marked) {
          setStatus(status => [...status, <Chip content='Rayado' />]);
        } 
        if (item.damaged) {
          setStatus(status => [...status, <Chip content='Dañado' />]);
        }
      } else {
        setStatus([<Chip content='Intacto' />]);
      }
    };
    getStoredData();
  }, []);
  
  return (
    <View style={styles.view0}>
      <SafeAreaView style={{ width: '100%', flex: 1 }}>
        
        <ScrollView>
          <NormalText style={[styles.status, {backgroundColor: '#cb0c9f'}]}>
            {details.statusPurchase}
          </NormalText>
          <View 
            style={[
              styles.status,
              {display: bookofferid !== null  ? 'flex' : 'none'},
            ]}
          >
            <NormalText style={styles.statusText}>{details.statusShow}</NormalText>
            <NormalText style={styles.statusText}>Por: {details.offerer ? details.offerer.name : ''}</NormalText>
            <NormalText style={styles.statusText}>{details.address}</NormalText>
          </View>
          <View 
            style={{ 
              alignItems: 'center', 
              alignSelf: 'center', 
              width: '80%', 
              paddingTop: 10 
            }}
          >
            <TitleText style={{ textAlign: 'center' }}>
              {details.title}
            </TitleText>
            <NormalText 
              style={{ 
                color: '#CB0C9F', 
                textAlign: 'center', 
                paddingVertical: 6, 
                fontWeight: 700 ,
              }}
            >
              {details.author}
            </NormalText>
            <View 
              style={{ 
                width: 210,
                backgroundColor: '#ccc', 
                marginVertical: 20, 
                height: 300 
              }}
            >
              <Image 
                resizeMode='stretch'
                source={require('../assets/images/coverdefault.png')} 
                style={{ flex: 1, width: null, height: null }} 
              />
            </View>
            <TitleText>${details.price}</TitleText>
            <View 
              style={{ 
                flexDirection: 'row', 
                justifyContent: 'space-between', 
                paddingTop: 26, 
                width: '100%' 
              }}
            >
              <View style={{ flexShrink: 1, paddingLeft: 7 }}>
                <NormalText style={{ color: '#9E9E9E' }}>{details.editorial}, {details.year}</NormalText>
                <NormalText style={{ color: '#9E9E9E' }}>Tapa {details.cover}</NormalText>
              </View>
              <View style={{ alignItems: 'center', width: '40%' }}>
                <NormalText style={{ color: '#9E9E9E' }}>Vendedor</NormalText>
                <NormalText style={{ color: '#8A19D6', textAlign: 'center' }}>{details.seller ? details.seller.name : ''}</NormalText>
              </View>
            </View>
            
            <NormalText style={styles.supt}>Descripción</NormalText>
            <NormalText style={{ width: '100%' }}>
              {details.description}
            </NormalText>

            <NormalText style={styles.supt}>Estado</NormalText>
            <View style={styles.chipContainer}>
              {status}
            </View>
            
            <NormalText style={styles.supt}>Género</NormalText>
            <ScrollView horizontal style={styles.chipContainer}>
              {genresChip}
            </ScrollView>

            <View 
              style={{ 
                width: '100%', 
                justifyContent: 'space-between', 
                flexDirection: 'row', 
                marginTop: 25, 
                marginBottom: 40 
              }}
            >
              <PurpleButton 
                title='Pedir' 
                style={{ width: '50%', paddingHorizontal: 5, paddingVertical: 10 }}
                onPress={() => navigation.navigate('Llenar datos', {booksaleid: booksaleid})}
              />
              <WhiteButton 
                style={{ width: '40%', paddingHorizontal: 5, paddingVertical: 10 }}
                title='Ver reseñas' 
                onPress={() => navigation.navigate('Reseñas', {booksaleid: booksaleid})}
              />
            </View>
            
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  view0: {
    backgroundColor: '#F9FBFF',
    height: '100%',
    width: '100%',
  },
  chipContainer: {
    flexDirection: 'row', 
    gap: 5, 
    width: '100%', 
    maxWidth: '100%',
  },
  supt: {
    width: '100%', 
    color:'#9E9E9E', 
    paddingTop: 20,
  },
  status: {
    color: 'white', 
    padding: 8, 
    width: '100%', 
    alignItems: 'center',
    backgroundColor: '#8A19D6',
    textAlign: 'center', 
    fontWeight: 700,
    flexDirection: 'column'
  },
  statusText: {
    color: 'white', 
    textAlign: 'center', 
    fontWeight: 700,
  }
});
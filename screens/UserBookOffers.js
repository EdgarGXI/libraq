import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import { useAuth } from '../Auth';
import { fetchBookOffersByUser, fetchBookOffersForUser, fetchImage } from '../db';
import BookOffer from '../components/BookOffer';
import TopBar from '../components/TopBar';
import BottomNavBar from '../components/BottomNavBar';
import Chip from '../components/Chip';

export default function UserBookOffers() {
  const userToken = useAuth().state.userToken;
  const [offers, setOffersData] = useState([]);
  const [styletabs, setStyletabs] = useState([styles.selected, null]);

  const getOwnOffers = useCallback(async() => {
    // fetches bookoffers stored data and renders as BookSale components
    let storedData = await fetchBookOffersByUser(userToken);
    setOffersData([]);
    for (let i = 0; i < storedData.length; i++) {
      let item = storedData[i];
      let imgLink = await fetchImage('book_covers', item.booksaleid); //item.img
      if (item.booksale != null) {
        setOffersData(offers => [...offers, 
          <BookOffer 
            id={item.booksaleid}
            idOffer={item.bookofferid}
            title={item.booksale.title}
            author={item.booksale.author}
            statusShow={'PEDIDO '+item.status}
            date={format(new Date(item.date), 'PP', {locale: es})}
            offerer={item.account}
            deliveryaddress={item.deliveryaddress}
            image={imgLink}
          />
        ]);
      }
    }
  }, [userToken]);

  const getOffersForUser = async() => {
    // fetches bookoffers stored data and renders as BookSale components
    let storedData = await fetchBookOffersForUser(userToken);
    setOffersData([]);
    for (let i = 0; i < storedData.length; i++) {
      let item = storedData[i];
      let imgLink = await fetchImage('book_covers', item.booksaleid); //item.img
      for (let j = 0; j < item.bookoffer.length; j++) { 
        setOffersData(offers => [...offers, 
          <BookOffer 
            id={item.booksaleid}
            idOffer={item.bookoffer[j].bookofferid}
            title={item.title}
            author={item.author}
            statusShow={'PEDIDO '+item.bookoffer[j].status}
            date={format(new Date(item.bookoffer[j].date), 'PP', {locale: es})}
            offerer={item.bookoffer[j].account}
            deliveryaddress={item.bookoffer[j].deliveryaddress}
            image={imgLink}
          />
        ]);
      }
    }
  };

  // fetches stored data and pre-fills info in page
  useEffect(() => {
    getOwnOffers();
  }, [userToken, getOwnOffers]);

  const propios = async () => {
    await getOwnOffers();
    setStyletabs([styles.selected, null]);
  }
  const entrantes = async () => {
    await getOffersForUser();
    setStyletabs([null, styles.selected]);
  }

  return (
    <View style={styles.view0}>
      <SafeAreaView style={{ width: '100%', flex: 1 }}>

        <TopBar />
        <View style={{ flexDirection: 'row', gap: 10, padding: 10, alignItems: 'center' }}>
          <TouchableOpacity onPress={propios}>
            <Chip content='Propios' style={styletabs[0]} />
          </TouchableOpacity>
          <TouchableOpacity onPress={entrantes}>
            <Chip content='Entrantes' style={styletabs[1]} />
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
          <View style={{ alignItems: 'center', gap: 20, width: '90%' }}>
            {offers}
          </View>
        </ScrollView>
        <BottomNavBar pedidosActive={true} />
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
  selected: {
    backgroundColor: '#8A19D6',
    borderColor: '#8A19D6',
    color: 'white',
  },
});

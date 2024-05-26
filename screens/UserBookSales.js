import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import { PurpleButton } from '../components/Buttons';
import BookSale from '../components/BookSale';
import TopBar from '../components/TopBar';
import BottomNavBar from '../components/BottomNavBar';
import { useAuth } from '../Auth';
import { fetchBookSalesByUser, fetchImage } from '../db';

export default function UserBookSales({route, navigation}) {
  const user = useAuth().state.userToken;
  const [sales, setSalesData] = useState([]);

  // fetches stored data and pre-fills info in page
  useEffect(() => {
    const getStoredData = async() => {
      // fetches booksale stored data and renders as BookSale components
      let storedData = await fetchBookSalesByUser(user);
      setSalesData([]);
      for (let i = 0; i < storedData.length; i++) {
        let item = storedData[i];
        let imgLink = await fetchImage('book_covers', item.booksaleid); //item.img
        item['img'] = imgLink;
        setSalesData(sales => [...sales, item]);
      }
    };
    getStoredData();
  }, [user]);

  return (
    <View style={styles.view0}>
      <SafeAreaView style={{ width: '100%', flex: 1 }}>
        <TopBar />
        <ScrollView contentContainerStyle={{ alignItems: 'center', marginBottom: 40 }}>
          <View style={{ alignItems: 'center', gap: 20, width: '90%' }}>
            <PurpleButton 
              title='Agregar' 
              style={{ marginTop: 10 }} 
              onPress={() => navigation.navigate('Crear venta nueva')}
            />
            {sales.map(item =>
              <BookSale 
                  key={item.booksaleid}
                  id={item.booksaleid}
                  title={item.title}
                  author={item.author}
                  editorial={item.editorial}
                  year={item.year}
                  cover={item.cover}
                  price={item.price} 
                  statusShow={'VENTA '+item.status}
                  date={format(new Date(item.date), 'PP', {locale: es})}
                  image={item.img}
              />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
      <BottomNavBar ventasActive={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  view0: {
    backgroundColor: '#F9FBFF',
    height: '100%',
    width: '100%',
  },
});

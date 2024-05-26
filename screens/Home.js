import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import { useAuth } from '../Auth';
import BookSale from '../components/BookSale';
import TopBar from '../components/TopBar';
import { TitleText } from '../components/FontSizing';
import Stat from '../components/Stat';
import SimpleInput from '../components/SimpleInput';
import BottomNavBar from '../components/BottomNavBar';
import { fetchAll, getSellerStats, fetchImage } from '../db';
import { Icons, Colors } from '../constants/theme';

// estadísticas solo aparecen si ventas del usuario > 0? o que aparezcan igualmente? idk
//añadir filtros?

export default function Home() {
  const user = useAuth().state.userToken;
  const [stats, setStats] = useState({});
  const [sales, setSalesData] = useState([]);
      
  // fetches stored data and pre-fills info in page
  useEffect(() => {
    const getStoredData = async() => {
      // sets seller stats
      setStats(await getSellerStats(user));
      // fetches booksale stored data and renders as BookSale component
      let storedData = await fetchAll('booksale');
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
          
        <ScrollView style={{ width: '90%', alignSelf: 'center' }}>
          <SimpleInput 
            placeholder='Buscar...' 
            icon={Icons.searching()}
            styleDiv={{ marginBottom: 20 }}
          /> 

          <TitleText style={{ paddingBottom: 10 }}>Estadísticas</TitleText>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
            <Stat 
              desc='Productos'
              number={stats.published}
              icon={Icons.books()}
              style={{ width: '32%' }}
            />
            <Stat 
              desc='Vendidos'
              number={stats.sold}
              icon={Icons.list()}
              style={{ width: '32%' }}
            />
            <Stat 
              desc='Lucro'
              number={'$'+stats.revenue}
              icon={Icons.cash()}
              style={{ width: '32%' }}
            />
          </View>

          <TitleText style={{ paddingBottom: 10 }}>Últimas ventas</TitleText>
          <View style={{ alignItems: 'center', gap: 30, width: '100%' }}>
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
      
      <BottomNavBar homeActive={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  view0: {
    backgroundColor: Colors.bg_color,
    height: '100%',
    width: '100%',
  },
});

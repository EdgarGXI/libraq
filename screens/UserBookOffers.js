import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView
} from "react-native";

import { PurpleButton } from '../components/Buttons';
import BookSale from '../components/BookSale';
import TopBar from '../components/TopBar';

export default function UserBookOffers() {
  return (
    <View style={styles.view0}>
      <SafeAreaView style={{width: '100%', flex: 1}}>

        <TopBar user="TomCherry" />
        
         <ScrollView style={{alignItems: 'center'}}>
          <View style={{alignItems: 'center', gap: 30, width: '90%'}}>
            <BookSale 
              id="" 
              title="La Cadena de Hierro" 
              author="Cassandra Clare" 
              editorial="Destino" 
              year="2024" 
              cover="Blanda" 
              price={20000} 
              status="PEDIDO PENDIENTE" 
              date="24/12/2025"
            />
            <BookSale 
              id="" 
              title="La Cadena de Hierro" 
              author="Cassandra Clare" 
              editorial="Destino" 
              year="2024" 
              cover="Blanda" 
              price={20000} 
              status="PEDIDO RECHAZADO" 
              date="24/12/2025"
            />
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
});

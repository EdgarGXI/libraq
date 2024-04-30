import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView
} from "react-native";

import { PurpleButton } from '../components/Buttons';
import BookSale from '../components/BookSale';
import TopBar from '../components/TopBar';

export default function UserBookSales() {
  return (
    <View style={styles.view0}>
      <SafeAreaView style={{width: '100%', flex: 1}}>

        <TopBar user="TomCherry" />
        
        <ScrollView>
          <View style={{alignItems: 'center', gap: 30, width: '100%'}}>
            <BookSale
                id=""
                title="La Cadena de Hierro"
                author="Cassandra Clare"
                editorial="Destino"
                year="2024"
                cover="Blanda"
                state="Usado"
                status="VENTA ACTIVA"
            />
            <BookSale
                id=""
                title="La Cadena de Hierro"
                author="Cassandra Clare"
                editorial="Destino"
                year="2024"
                cover="Blanda"
                state="Usado"
                status="VENTA ACTIVA"
            />
            <BookSale
                id=""
                title="La Cadena de Hierro"
                author="Cassandra Clare"
                editorial="Destino"
                year="2024"
                cover="Blanda"
                state="Usado"
                status="VENTA ACTIVA"
            />
            <BookSale
                id=""
                title="La Cadena de Hierro"
                author="Cassandra Clare"
                editorial="Destino"
                year="2024"
                cover="Blanda"
                state="Usado"
                status="VENTA ACTIVA"
            />
            <PurpleButton title="Agregar" style={{marginBottom: 40}}/>
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
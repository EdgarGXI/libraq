import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView
} from "react-native";

import { PurpleButton } from '../components/Buttons';
import BookSale from '../components/BookSale';
import TopBar from '../components/TopBar';
import BottomNavBar from '../components/BottomNavBar';

export default function UserBookSales({route, navigation}) {
  return (
    <View style={styles.view0}>
      <SafeAreaView style={{width: '100%', flex: 1}}>

        <TopBar user="TomCherry" />
        
        <ScrollView contentContainerStyle={{ alignItems: 'center', marginBottom: 40 }}>
            <View style={{ alignItems: 'center', gap: 20, width: '90%' }}>
              <PurpleButton 
                title="Agregar" 
                style={{ marginTop: 10 }} 
                onPress={() => navigation.navigate('Crear venta nueva')}
              />

              <BookSale 
                id="" 
                title="La Cadena de Hierro" 
                author="Cassandra Clare" 
                editorial="Destino" 
                year="2024" 
                cover="Blanda" 
                price={20000} 
                status="VENTA ACTIVA" 
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
                status="VENTA ACTIVA" 
                date="24/12/2025"
              />
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

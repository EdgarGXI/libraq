import { View, StyleSheet, ScrollView, SafeAreaView, Image } from "react-native";

import { PurpleButton, WhiteButton } from '../components/Buttons';
import TopBar from '../components/TopBar';
import { NormalText, TitleText } from '../components/FontSizing';
import Chip from '../components/Chip';

export default function BookSaleDetails({ route, navigation }) {

  const { seller, title, author, editorial, year, cover, genres, marked, damaged, price, description, id, statusShow, statusPurchase, date } = route.params;
  var status = [];
  if (marked) {
    status.push(<Chip key="marked" content="Rayado" />); //Cada Chip tiene que tener un key para que se diferencien
  }
  if (damaged) {
    status.push(<Chip key="damaged" content="Dañado" />);
  }
  if (status.length === 0) {
    status.push(<Chip key="intact" content="Intacto" />);
  }
  
  var genresChip = [];
  if (genres != null) {
    for (let i = 0; i < genres.length; i++) {
      genresChip.push(<Chip key={i} content={genres[i]} />);
    }
  } else {
    genresChip.push(<Chip key="indefinite" content="Indefinido" />);
  }
  

  
  return (
    <View style={styles.view0}>
      <SafeAreaView style={{width: '100%', flex: 1}}>
        <ScrollView>
          <NormalText style={{color: '#fff', backgroundColor: '#cb0c9f', padding: 8, width: '100%', textAlign: 'center', fontWeight: 700}}>{statusPurchase}</NormalText>
          <NormalText style={{color: '#fff', backgroundColor: '#8A19D6', padding: 8, width: '100%', display: statusShow!=statusPurchase ? 'block' : 'none', textAlign: 'center', fontWeight: 700}}>{statusShow}</NormalText>
          <View style={{alignItems: 'center', alignSelf: 'center', width: '80%', paddingTop: 10}}>
            <TitleText style={{textAlign: 'center'}}>{title}</TitleText>
            <NormalText style={{color: '#CB0C9F', textAlign: 'center', paddingVertical: 6, fontWeight: 700}}>{author}</NormalText>
            <View style={{width: 210, backgroundColor: '#ccc', marginVertical: 20, height: 300}}>
              <Image 
                resizeMode="stretch"
                source={require('../assets/images/coverdefault.png')} 
                style={{flex: 1, width: null, height: null}} 
              />
            </View>
            <TitleText>${price}</TitleText>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: 26, paddingBottom: 20, width: '100%'}}>
              <View style={{flexShrink: 1, paddingLeft: 7}}>
                <NormalText style={{color: '#9E9E9E'}}>{editorial}, {year}</NormalText>
                <NormalText style={{color: '#9E9E9E'}}>Tapa {cover}</NormalText>
              </View>
              <View style={{alignItems: 'center', width: '40%'}}>
                <NormalText style={{color: '#9E9E9E'}}>Vendedor</NormalText>
                <NormalText style={{color: '#8A19D6', textAlign: 'center'}}>{seller}</NormalText>
              </View>
            </View>
            
            <NormalText style={{width: '100%', color:'#9E9E9E'}}>Descripción</NormalText>
            <NormalText style={{width: '100%'}}>
              {description}
            </NormalText>

            <NormalText style={{width: '100%', color:'#9E9E9E', paddingTop: 20}}>Estado</NormalText>
            <View style={{flexDirection: 'row', gap: 5, width: '100%'}}>
              {status}
            </View>
            
            <NormalText style={{width: '100%', color:'#9E9E9E', paddingVertical: 20}}>Género</NormalText>
            <View style={{flexDirection: 'row', gap: 5, width: '100%'}}>
              {genresChip}
            </View>

            <View style={{justifyContent: 'space-between', flexDirection: 'row', marginTop: 25, marginBottom: 40}}>
              <PurpleButton title="Pedir" style={{width: '50%'}}/>
              <WhiteButton 
                title="Ver reseñas" 
                onPress={() => navigation.navigate('Reseñas', {bookSaleID: id})}
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
});

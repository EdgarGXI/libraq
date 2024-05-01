import { View, StyleSheet, ScrollView, SafeAreaView, Image } from "react-native";

import { PurpleButton, WhiteButton } from '../components/Buttons';
import TopBar from '../components/TopBar';
import { NormalText, TitleText } from '../components/FontSizing';
import Chip from '../components/Chip';


// se haría un ciclo para añadir los chips de estado/género 

export default function BookSaleDetails(props) {
  const { seller, title, author, editorial, year, cover, genres, marked, damaged, price, description, id } = props;
  //status: String
  //buyer: Account
  var status = [];
  if (marked) {
    status.push(<Chip content="Rayado" />);
  }
  if (damaged) {
    status.push(<Chip content="Dañado" />);
  }
  if (status.length==0) {
    status.push(<Chip content="Intacto" />);
  }

  var genresChip = [];
  if (genres != null) {
    for (let i = 0; i < genres.length; i++) {
      genresChip.push(<Chip content={genres[i]} />);
    }
  } else {
    genresChip.push(<Chip content="Indefinido" />);
  }

  return (
    <View style={styles.view0}>
      <SafeAreaView style={{width: '100%', flex: 1}}>

        <TopBar user="TomCherry" />
        
        <ScrollView>
          <View style={{alignItems: 'center'}}>
            <TitleText>{title}</TitleText>
            <NormalText style={{color: '#CB0C9F'}}>{author}</NormalText>
            <View style={{width: 210, backgroundColor: '#ccc', marginVertical: 20, height: 300}}>
              <Image 
                resizeMode="stretch"
                source={require('../assets/images/coverdefault.png')} 
                style={{flex: 1, width: null, height: null}} 
              />
            </View>
            <TitleText>${price}</TitleText>
            <View style={{flexDirection: 'row', width:'80%', justifyContent: 'space-between', paddingVertical: 20}}>
              <View style={{flexShrink: 1}}>
                <NormalText style={{color: '#9E9E9E'}}>{editorial}, {year}</NormalText>
                <NormalText style={{color: '#9E9E9E'}}>Tapa {cover}</NormalText>
              </View>
              <View style={{alignItems: 'center', width: '40%'}}>
                <NormalText style={{color: '#9E9E9E'}}>Vendedor</NormalText>
                <NormalText style={{color: '#8A19D6', textAlign: 'center'}}>{seller}</NormalText>
              </View>

            </View>
            
            <NormalText style={{width: '80%', color:'#9E9E9E'}}>Descripción</NormalText>
            <NormalText style={{width: '80%'}}>
              {description}
            </NormalText>

            <NormalText style={{width: '80%', color:'#9E9E9E', paddingTop: 20}}>Estado</NormalText>
            <View style={{flexDirection: 'row', gap: 5, width: '80%'}}>
              {status}
            </View>
            
            <NormalText style={{width: '80%', color:'#9E9E9E', paddingTop: 20}}>Género</NormalText>
            <View style={{flexDirection: 'row', gap: 5, width: '80%', paddingBottom: 20}}>
              {genresChip}
            </View>

            <View style={{marginBottom: 40, marginTop: 10, flexDirection: 'row',  width:'80%', justifyContent: 'space-around'}}>
              <WhiteButton title="Volver" style={{paddingHorizontal: 40}} />
              <PurpleButton title="Pedir" style={{paddingHorizontal: 40}} />
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

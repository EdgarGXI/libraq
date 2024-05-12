import { View, StyleSheet, Image } from 'react-native';

import { WhiteButton } from '../components/Buttons';

export default function BOChoice({route, navigation}) {
  return (
    <View style={styles.view0}>
      <View style={styles.view1}>
        <WhiteButton 
          title='Llenar con mis datos →' 
          fontSize={20} 
          style={{ paddingHorizontal: 0, borderRadius: 25 }}
          onPress={() => {          
            navigation.navigate('Hacer pedido', {booksaleid: route.params.booksaleid, setDefault: true})
          }}
        />
        <WhiteButton 
          title='Personalizar →' 
          fontSize={20} 
          style={{ paddingHorizontal: 0, borderRadius: 25 }}
          onPress={() => {    
            navigation.navigate('Hacer pedido', {booksaleid: route.params.booksaleid})
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view0: {
    backgroundColor: '#8A19D6',
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  view1: {
    width: '80%',
    gap: 40,
  },
})
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView
} from "react-native";

import Review from '../components/Review';

export default function ReviewList({route}) {
  const { bookSaleID } = route.params;
  // se fetchean las reviews que NO sean response (response==-1), orderby date desde la más reciente
  return (
    <View style={styles.view0}>
      <SafeAreaView style={{width: '100%', flex: 1}}>
        
         <ScrollView style={{alignItems: 'center'}}>
          <View style={{alignItems: 'center', gap: 15, width: '90%', paddingTop: 20, paddingBottom: 40}}>
          
            <Review 
              reviewID={1}
              accountID={222}
              date="10-12-2025"
              content="Soy un dinosaurio y me llamo Anacleto Por cosas del destino no morí en la glaciación Mis amigos se extinguieron, me dejaron solo Y tuve que resignarme a esta situación"
            />
            <Review 
              reviewID={2}
              accountID={555}
              date="10-10-2025"
              content="Soy un dinosaurio y me llamo Anacleto Por cosas del destino no morí en la glaciación Mis amigos se extinguieron, me dejaron solo Y tuve que resignarme a esta situación"
            />

          </View>
        </ScrollView>

      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  view0: {
    backgroundColor: '#8A19D6',
    height: '100%',
    width: '100%',
  },
});

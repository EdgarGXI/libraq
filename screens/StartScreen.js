import { View, StyleSheet, Image } from "react-native";

import { WhiteButton } from '../components/Buttons';

export default function StartScreen() {
  return (
    <View style={styles.view0}>
      <View style={{justifyContent: 'center', alignItems: 'center', gap: 20}}>
        <View style={{height: '75%', width: '100%', alignItems: 'center'}}>
          <Image
          resizeMode="contain" 
          source={require("../assets/images/startscreen.png" )}
          style={styles.image}
          />
        </View>
        <WhiteButton title="Comenzar →" fontSize={20} />
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
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    aspectRatio: "0.6",
  },
});
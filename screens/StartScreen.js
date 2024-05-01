import { View, StyleSheet, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';

import { WhiteButton } from '../components/Buttons';


//Maybe en la pantalla de inicio en vez de poner comenzar poner sign in y sign up y hacer los respectivos botones?




export default function StartScreen() {
  const navigation = useNavigation();

  const handleSignIn = () => {
    navigation.navigate('SignIn');
  };

  //Dejo la variable lista para solo copy y paste de lo que esta abajo con sign in, eso de los botones ni idea pa que queden los dos
  //simetricos xD 
  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.view0}>
      <View style={{ justifyContent: 'center', alignItems: 'center', gap: 20 }}>
        <View style={{ height: '75%', width: '100%', alignItems: 'center' }}>
          <Image
            resizeMode="contain"
            source={require('../assets/images/startscreen.png')}
            style={styles.image}
          />
        </View>
        <WhiteButton title="Comenzar →" fontSize={20} onPress={handleSignIn} />
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
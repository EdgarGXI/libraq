import * as SecureStore from 'expo-secure-store';
import { StyleSheet, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

import { useAuth } from '../Auth';
import { WhiteButton } from '../components/Buttons';

export default function StartScreen() {
  const auth = useAuth();
  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken, userName;
      try {
        userToken = await SecureStore.getItemAsync('userToken');
        userName = await SecureStore.getItemAsync('userName');
        auth.dispatch({ type: 'RESTORE_TOKEN', token: userToken, name: userName});
      } catch (e) {
        // Restoring token failed
        auth.dispatch({ type: 'SIGN_OUT' });
      }
    };
    bootstrapAsync();
  }, []);

  const navigation = useNavigation();

  const handleSignIn = () => {
    navigation.navigate('SignIn');
  };
  
  return (
    <View style={styles.view0}>
      <View style={{ justifyContent: 'center', alignItems: 'center', gap: 20 }}>
        <View style={{ height: '75%', width: '100%', alignItems: 'center' }}>
          <Image
            resizeMode='contain'
            source={require('../assets/images/startscreen.png')}
            style={styles.image}
          />
        </View>
        <WhiteButton title='Comenzar →' fontSize={20} onPress={handleSignIn} />
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
    aspectRatio: 0.6,
  },
});
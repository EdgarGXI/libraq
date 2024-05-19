import { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

import { useAuth } from '../Auth';
import SimpleInput from '../components/SimpleInput';
import { WhiteButton, PurpleButton } from '../components/Buttons';
import { TitleText, NormalText } from '../components/FontSizing';
import { Colors, Icons } from '../constants/theme';

export default function SignIn({route, navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setErrorVisible] = useState(false);
  const auth = useAuth();
  
  const handleLogIn = async () => {
    try { // try to sign in with creds
      await auth.signIn(email, password);
    } catch (e) { // on error, show error message
      setErrorVisible(true);
      console.log(e);
    }
  };
  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.view0}>
      <Image
          resizeMode='stretch'
          source={require('../assets/images/bg-register.jpg')}
          style={styles.image1}
      />
      
      <ScrollView style={styles.scrollview}>
        <View style={styles.view1}>
          
          <TitleText>Inicia sesión</TitleText>
          
          <View style={{ gap: 20, paddingVertical: 20 }}>

            <SimpleInput 
              placeholder='Correo electrónico'
              icon={Icons.email(Colors.accent)}
              inputMode='email'
              styleInput={{ width: '90%' }}
              onChangeText={newText => {
                setEmail(newText); 
                setErrorVisible(false);
              }}
              value={email}
            />
            
            <SimpleInput 
              placeholder='Contraseña' 
              icon={Icons.password(Colors.accent)}
              secureTextEntry={true}
              styleInput={{ width: '90%' }}
              onChangeText={newText => {
                setPassword(newText); 
                setErrorVisible(false);
              }}
              value={password}
            />

            <TouchableOpacity>
              <NormalText 
                style={{ 
                  color: Colors.accent, 
                  fontWeight: 700, 
                  marginTop: -10, 
                  alignSelf: 'flex-end' 
                }}
              >
                ¿Olvidaste tu contraseña?
              </NormalText>
            </TouchableOpacity>

            <PurpleButton title='Iniciar sesión' fontSize={14} onPress={handleLogIn} />

            <TouchableOpacity onPress={handleSignUp}>
              <NormalText 
                style={{ 
                  color: Colors.accent, 
                  fontWeight: 700, 
                  marginTop: -10, 
                  alignSelf: 'flex-end',
                }} 
                onPress={handleSignUp}
              >
                ¿No tienes una cuenta? Regístrate.
              </NormalText>
            </TouchableOpacity>
            
            <NormalText 
              style={{  
                color: 'red', 
                fontWeight: 700, 
                alignSelf: 'center', 
                textAlign: 'center', 
                display: error ? 'block' : 'none',
              }} 
              >
              El correo o contraseña ingresados son inválidos.
            </NormalText>

          </View>
          
          <View style={styles.cont}>
            <View style={styles.line} />
            <NormalText>o</NormalText>
            <View style={styles.line} />
          </View>

          <WhiteButton 
            icon={
              <Image
                resizeMode='stretch'
                source={{ 
                  uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/d649b2ae889bd79f1cb5249a2015750b90a817331398ab72c05528b39b544961?',
                }}
                style={{ width: 20, aspectRatio: 1 }}
              />
            }
            title='Google' 
            border={{ borderColor: Colors.dark_gray, borderWidth: 2 }}
            fontColor='black'
          />

        </View>
      </ScrollView>

    </View>
    
  );
}

const styles = StyleSheet.create({
  view0: {
    backgroundColor: Colors.accent,
    height: '100%',
    width: '100%',
  },
  scrollview: {
    height: '100%', 
    width: '100%', 
    position: 'absolute', 
    zIndex: 10,
  },
  view1: {
    height: '100%',
    backgroundColor: 'white', 
    borderRadius: 30, 
    marginTop: 300, 
    paddingVertical: 20, 
    paddingHorizontal: 30, 
    paddingBottom: 50,
  },
  image1: {
    zIndex: 0,
    overflow: 'hidden',
    width: '180%',
    height: 500,
    aspectRatio: 1,
  },
  cont: {
    alignItems: 'center',
    gap: 8,
    flexDirection: 'row',
    paddingBottom: 20,
    justifyContent: 'center',
  },
  line: {
    borderColor: Colors.dark_gray,
    borderWidth: 1,
    backgroundColor: Colors.dark_gray,
    height: 2,
    flex: 1,
  },
});

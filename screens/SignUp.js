import { View, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useState } from 'react';

import SimpleInput from '../components/SimpleInput';
import { WhiteButton, PurpleButton } from '../components/Buttons';
import { TitleText, NormalText } from '../components/FontSizing';
import { fetchByColumn } from '../db';
import { Icons, Colors } from '../constants/theme';

export default function SignUp({ route, navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error1, setError1Visible] = useState(false);
  const [error2, setError2Visible] = useState(false);

  const handleSignIn = () => {
    navigation.navigate('SignIn');
  };

  const handleCreateAcc = async () => {
    if ((email && password) && password.length > 6) {  // email & password not null
      let acc = await fetchByColumn('account', 'email', email);
      if (acc.length>0) { // error: email already in use
        setError1Visible(true);
      } else {
        navigation.navigate('Crear perfil', { editMode: 'x', valueEmail: email, valuePass: password });
      }
    } else {
      setError2Visible(true);
    }
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
          <TitleText>Regístrate</TitleText>

          <View style={{ gap: 20, paddingVertical: 20 }}>
            <SimpleInput
              placeholder='Correo electrónico'
              icon={Icons.email(Colors.accent)}
              inputMode='email'
              styleInput={{ width: '90%' }}
              onChangeText={newText => {
                setEmail(newText)
                setError1Visible(false);
                setError2Visible(false);
              }}
              value={email}
            />
            <SimpleInput
              placeholder='Contraseña'
              icon={Icons.password(Colors.accent)}
              secureTextEntry={true}
              styleInput={{ width: '90%' }}
              onChangeText={newText => {
                setPassword(newText)
                setError1Visible(false);
                setError2Visible(false);
              }}
              value={password}
            />

            <NormalText 
              style={{ 
                color: 'red', 
                fontWeight: 700, 
                alignSelf: 'center', 
                textAlign: 'center', 
                display: error1 ? 'block' : 'none',
              }} 
              >
              El correo ingresado ya está en uso.
            </NormalText>

            <NormalText 
              style={{ 
                color: 'red', 
                fontWeight: 700, 
                alignSelf: 'center', 
                textAlign: 'center', 
                display: error2 ? 'block' : 'none',
              }} 
              >
              Correo o contraseña inválidos. La contraseña debe tener más de 6 caractéres.
            </NormalText>

            <PurpleButton
              title='Crear cuenta'
              fontSize={14}
              onPress={handleCreateAcc}
            />
          </View>
          <TouchableOpacity onPress={handleSignIn}>
            <NormalText 
              style={{ 
                color: Colors.accent, 
                fontWeight: 700, 
                marginTop: -10, 
                alignSelf: 'center', 
                paddingBottom: 10
              }}
            >
              ¿Ya estás registrado? Inicia sesión.
            </NormalText>
          </TouchableOpacity>

          <View style={styles.cont}>
            <View style={styles.line} />
            <NormalText>o</NormalText>
            <View style={styles.line} />
          </View>

          <WhiteButton 
            icon={
              <Image
                resizeMode='contain'
                source={{
                  uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/d649b2ae889bd79f1cb5249a2015750b90a817331398ab72c05528b39b544961?',
                }}
                style={{width: 20, aspectRatio: 1}}
              />
            }
            title='Google' 
            border={{borderColor: Colors.dark_gray, borderWidth: 2}}
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

import { View, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { decode } from 'base64-arraybuffer';

import { useAuth } from '../Auth';
import { fetchByColumn, upsertRow, uploadFile, fetchImage } from '../db';
import { PurpleButton } from '../components/Buttons';
import SimpleInput from '../components/SimpleInput';
import { TitleText, NormalText } from '../components/FontSizing';
import { isAlpha, isAlphaNumeric } from '../utils/InputValidation';
import { Colors } from '../constants/theme';

function checkInputValid(data) {
  for (var item in data) {
    let input = data[item];
    if (typeof(input) == 'string') input = input.trim();
    if (['postcode', 'password'].includes(item)) { // can be alphanumeric
      if (input == '' || !isAlphaNumeric(input)) throw 'not alphanum.';
    } else if (item === 'email') {  // valid email
      if (input == '' || !input.substring(0, input.length-1).includes('@')) throw 'not an email.';
    } else if (item == 'address') {
      if (input == '') throw 'empty address';
    } else if ((input == '' || !isAlpha(input)) && item != 'bio') {  // can only be alpha
      throw 'not alpha.';
    } 
  }
}

export default function Profile({ route, navigation }) {
  const { editMode, valueEmail='', valuePass='' } = route.params;
  const auth = useAuth();
  const userToken = auth.state.userToken;
  const [error, setErrorVisible] = useState(false);
  const [data, setFormData] = useState({
    'name': '',
    'lastname': '',
    'email': valueEmail, // Pre-fill with the email from SignUp
    'password': valuePass, // Pre-fill with the password from SignUp
    'bio': '',
    'dpt': '',
    'city': '',
    'postcode': null,
    'address': '',
  });
  const [image, setImage] = useState(null);
  const [source, setSource] = useState(null);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [1, 1],
      base64: true,
    });
    if (!result.canceled) {
      setImage(result.assets[0].base64);
      setSource('data:image/jpeg;base64,'+result.assets[0].base64);
    }
  };

  // fetches stored user data and pre-fills inputs
  useEffect(() => {
    const att = ['name', 'lastname', 'email', 'password', 'bio', 'dpt', 'city', 'postcode', 'address'];
    const getStoredData = async() => {
      let storedData = await fetchByColumn('account', 'accountid', userToken);
      storedData = storedData[0];
      for (var i in att) {
        handleChange(att[i], storedData[att[i]]);
      }
      let imgLink = await fetchImage('avatars', storedData.email);
      if (imgLink !== null) {
        setSource(imgLink);
      }
    };
    getStoredData();
  }, [userToken, setSource]);
  const handleChange = (id, text) => {
    setFormData( data => ({
      ...data, [id]: text
    }));
  }

  // editable inputs and button function change depending on editMode
  let buttonTitle, action, editableBool; 
  if (editMode === true) {  
    // all inputs are editable; button overwrites previous user data
    buttonTitle = 'Guardar';
    editableBool = [true,true]; 
    action = async () => {
      try {
        checkInputValid(data);
        await upsertRow(
          'account', 
          {
            accountid: auth.state.userToken,
            name: data['name'].trim(),
            lastname: data['lastname'].trim(),
            email: data['email'].trim(),
            password: data['password'],
            bio: data['bio'],
            dpt: data['dpt'].trim(),
            city: data['city'].trim(),
            postcode: data['postcode'],
            address: data['address'].trim(),
          }
        );
        if (image != null) {
          // try inserting image
          await uploadFile('avatars', data['email'].trim(), decode(image));
        }
        navigation.navigate('Home');
      } catch (e) {
        setErrorVisible(true);
      }
    }
  } else if (editMode === 'x') {  
    // all inputs but password and email are editable; button saves changes
    buttonTitle = 'Guardar';
    editableBool = [true,false];
    action = async () => {
      // if input data is valid try signing up
      try {
        checkInputValid(data);
        await auth.signUp({
          name: data['name'].trim(),
          lastname: data['lastname'].trim(),
          email: data['email'].trim(),
          password: data['password'],
          bio: data['bio'],
          dpt: data['dpt'].trim(),
          city: data['city'].trim(),
          postcode: data['postcode'],
          address: data['address'].trim(),
        })
        if (image != null) {
          // try inserting image
          await uploadFile('avatars', data['email'].trim(), decode(image));
        }
      } catch (e) {
        setErrorVisible(true);
      }
    }
  } else {
    // no inputs are editable; button switches to editMode
    buttonTitle = 'Editar';
    editableBool = [false,false];
    action = () => navigation.navigate('Perfil', {editMode: true});
  } 
  
  return (
    <View style={styles.view0}>
      <Image
          resizeMode='stretch'
          source={require('../assets/images/bg-register.jpg')}
          style={styles.image1}
      >
      </Image>
      
      <ScrollView style={styles.scrollview}>
        <View style={styles.view1}>
          <View style={styles.view2}>

            <TouchableOpacity 
              style={{
                borderRadius: 100, 
                aspectRatio: 1, 
                width: 150, 
                overflow: 'hidden', 
                marginTop: '-30%', 
                alignSelf: 'center', 
                marginBottom: 20, 
                backgroundColor: Colors.dark_gray
              }}
              onPress={editableBool[0] ? pickImage : ()=>{}}
            >
              <Image
                resizeMode='stretch'
                source={{ uri: source }}
                style={{ flex: 1, width: null, height: null, aspectRatio: 1 }}
              />
            </TouchableOpacity>

            <TitleText>Información</TitleText>
            
            <View style={{ gap: 20, paddingVertical: 20 }}>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <SimpleInput 
                  placeholder='Nombre'
                  styleDiv={{ width: '48%'}}
                  editable={editableBool[0]}
                  defaultValue={data['name']}
                  onChangeText={newText => {
                    handleChange('name', newText);
                    setErrorVisible(false);
                  }}
                />
                <SimpleInput 
                  placeholder='Apellido'
                  styleDiv={{ width: '48%' }}
                  editable={editableBool[0]}
                  defaultValue={data['lastname']}
                  onChangeText={newText => {
                    handleChange('lastname', newText);
                    setErrorVisible(false);
                  }}
                />
              </View>

              <SimpleInput 
                placeholder='Correo electrónico'
                inputMode='email'
                editable={editableBool[1]}
                defaultValue={data['email']}
                styleInput={{ width: '100%' }}
                onChangeText={newText => {
                  handleChange('email', newText);
                  setErrorVisible(false);
                }}
              />
              
              <SimpleInput 
                placeholder='Contraseña' 
                secureTextEntry={true}
                editable={editableBool[1]}
                defaultValue={data['password']}
                styleInput={{ width: '100%' }}
                onChangeText={newText => {
                  handleChange('password', newText);
                  setErrorVisible(false);
                }}
              />

              <TouchableOpacity>
                <NormalText 
                  style={{ color: '#8A19D6', fontWeight: 700, marginTop: -10, alignSelf: 'flex-end' }}
                >
                ¿Olvidaste tu contraseña?
                </NormalText>
              </TouchableOpacity>
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <SimpleInput 
                  placeholder='Departamento'
                  styleDiv={{width: '48%'}}
                  editable={editableBool[0]}
                  defaultValue={data['dpt']}
                  onChangeText={newText => {
                    handleChange('dpt', newText);
                    setErrorVisible(false);
                  }}
                />
                <SimpleInput 
                  placeholder='Ciudad'
                  styleDiv={{ width: '48%' }}
                  editable={editableBool[0]}
                  defaultValue={data['city']}
                  onChangeText={newText => {
                    handleChange('city', newText);
                    setErrorVisible(false);
                  }}
                />
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <SimpleInput 
                  placeholder='Código Postal'
                  styleDiv={{ width: '48%' }}
                  inputMode='numeric'
                  editable={editableBool[0]}
                  defaultValue={data['postcode']}
                  onChangeText={newText => {
                    handleChange('postcode', newText);
                    setErrorVisible(false);
                  }}
                />
                <SimpleInput 
                  placeholder='Dirección'
                  styleDiv={{ width: '48%' }}
                  editable={editableBool[0]}
                  defaultValue={data['address']}
                  onChangeText={newText => {
                    handleChange('address', newText);
                    setErrorVisible(false);
                  }}
                />
              </View>

              <SimpleInput 
                placeholder='Biografía'
                multiline={true}
                numberOfLines={5}
                editable={editableBool[0]}
                defaultValue={data['bio']}
                styleInput={{ width: '100%' }}
                onChangeText={newText => {
                  handleChange('bio', newText);
                  setErrorVisible(false);
                }}
              />
            </View>

            <NormalText 
              style={{ 
                color: 'red', 
                fontWeight: 700, 
                alignSelf: 'center', 
                textAlign: 'center', 
                display: error ? 'block' : 'none',
              }} 
              >
              Ha ocurrido un error. Asegúrate de que todos los campos hayan sido llenados correctamente.
            </NormalText>

            <PurpleButton title={buttonTitle} onPress={action} />
          </View>
        </View>
      </ScrollView>

    </View>
    
  );
}

const styles = StyleSheet.create({
  view0: {
    backgroundColor: '#8A19D6',
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
    backgroundColor: '#fff', 
    borderRadius: 30, 
    marginTop: 200, 
    alignItems: 'center',
  },
  view2: {
    height: '100%',
    width: '90%',
    marginBottom: 40
  },
  image1: {
    zIndex: 0,
    overflow: 'hidden',
    width: '180%',
    height: 500,
    aspectRatio: 1,
  },
});

import { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { format } from 'date-fns';

import { useAuth } from '../Auth';
import { PurpleButton } from '../components/Buttons';
import SimpleInput from '../components/SimpleInput';
import { NormalText } from '../components/FontSizing';
import { insertRow, fetchUserData } from '../db';
import { isAlpha } from '../utils/InputValidation';

function checkInputValid(data) {
  for (var item in data) {
    let input = data[item];
    if (typeof(input) == 'string') input = input.trim();
    if (['city', 'dpt'].includes(item)  && (input == '' || !isAlpha(input))) {  // can only be alpha
      throw 'not alpha';
    } else if (input == '') {
      throw 'empty string';
    }
  }
}

export default function MakeBookOffer({route, navigation}) {
  const auth = useAuth();
  const { booksaleid, setDefault=false } = route.params;
  const [error, setErrorVisible] = useState(false);
  const [data, setData] = useState({
    'dpt': '',
    'city': '',
    'postcode': null,
    'address': '',
  });
  // fetches stored user data and pre-fills inputs
  useEffect(() => {
    const getStoredData = async() => {
      let storedData = await fetchUserData(auth.state.userToken, 'dpt, city, postcode, address');
      for (var item in data) {
        handleChange(item, storedData[item]);
      }
    };
    if (setDefault) getStoredData();
  }, []);
  const handleChange = (id, text) => {
    setData( data => ({
      ...data, [id]: text
    }));
  }

  const submit = async () => {
    try {
      checkInputValid(data);
      await insertRow(
        'bookoffer',
        {
          accountid: auth.state.userToken,
          booksaleid: booksaleid, 
          deliveryaddress: data['city'].trim()
            +', '+data['dpt'].trim()
            +' - '+data['address'].trim()
            +' (Cód. '+String(data['postcode'])+')',
          status: 'PENDIENTE',
          date: format(new Date(), 'yyyy-MM-dd'),
        },
      )
      navigation.navigate('Ventas');
    } catch (e) {
      setErrorVisible(true);
    }
  }
  
  return (
    <View style={styles.view0}>
      <SafeAreaView style={{ width: '100%', flex: 1 }}>
        
        <ScrollView style={{ justifyContent: 'center'}}>
          <View style={{ alignItems: 'center', gap: 10 }}>
           
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <SimpleInput 
                  placeholder='Departamento'
                  styleDiv={{width: '48%'}}
                  defaultValue={data['dpt']}
                  onChangeText={newText => {
                    handleChange('dpt', newText);
                    setErrorVisible(false);
                  }}
                />
                <SimpleInput 
                  placeholder='Ciudad'
                  styleDiv={{width: '48%'}}
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
                  styleDiv={{width: '48%'}}
                  inputMode='numeric'
                  defaultValue={data['postcode']}
                  onChangeText={newText => {
                    handleChange('postcode', newText);
                    setErrorVisible(false);
                  }}
                />
                <SimpleInput 
                  placeholder='Dirección'
                  styleDiv={{width: '48%'}}
                  defaultValue={data['address']}
                  onChangeText={newText => {
                    handleChange('address', newText);
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
                width: '80%',
              }} 
              >
              Ha ocurrido un error. Asegúrate de que todos los campos hayan sido llenados correctamente.
            </NormalText>
            
            <PurpleButton 
              title='Enviar'
              style={{ paddingHorizontal: 40 }} 
              onPress={submit}
            />

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
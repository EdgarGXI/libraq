import { View, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { useState } from 'react';

import { insertRow } from '../db';
import { PurpleButton } from '../components/Buttons';
import SimpleInput from '../components/SimpleInput';
import { TitleText, NormalText } from '../components/FontSizing';

// la idea es que los datos del profile edit estén rellenados previamente con los reales. hay que hacer fetch o algo
export default function Profile({ route, navigation }) {
  const { editMode, valueEmail="", valuePass="" } = route.params;

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
  
  const handleChange = (id, text) => {
    setFormData( data => ({
      ...data, [id]: text
    }));
  }
  
  var buttonTitle, action, editableBool; 
  if (editMode === true) {
    buttonTitle = "Guardar";
    editableBool = [true,true]; //editable all permite que se editen todos
    // en este caso debería hacerse un fetch con la info para los default values y cambiar con:
    // setFormData()
  } else if (editMode === "x") {
    buttonTitle = "Guardar";
    editableBool = [true,false];
    action = async () => insertRow({
      table: 'account',
      row: {
        name: data["name"],
        lastname: data["lastname"],
        email: data["email"],
        password: data["password"],
        bio: data["bio"],
        dpt: data["dpt"],
        city: data["city"],
        postcode: data["postcode"],
        address: data["address"],
      },
      onSuccess: () => {
        navigation.navigate('Home');
      },
    })
  } else {
    buttonTitle = "Editar";
    editableBool = [false,false];
    action = () => navigation.navigate('Perfil', {editMode: true});  // Pasa a modo edición
  } 

  return (
    <View style={styles.view0}>
      <Image
          resizeMode="stretch"
          source={require("../assets/images/bg-register.png")}
          style={styles.image1}
      >
      </Image>
      
      <ScrollView style={styles.scrollview}>
        <View style={styles.view1}>
          <View style={styles.view2}>

            <View style={{borderRadius: 100, aspectRatio: 1, width: 150, overflow: 'hidden', marginTop: '-30%', alignSelf: 'center', marginBottom: 20}}>
              <Image
                resizeMode="stretch"
                source={require('../assets/images/avatar.png')}
                style={{flex: 1, width: null, height: null, aspectRatio: 1}}
              />
            </View>

            <TitleText>Información</TitleText>
            
            <View style={{gap: 20, paddingVertical: 20}}>

              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <SimpleInput 
                  placeholder="Nombre"
                  styleDiv={{width: '48%'}}
                  editable={editableBool[0]}
                  defaultValue={data["name"]}
                  onChangeText={newText => handleChange("name", newText)}
                />
                <SimpleInput 
                  placeholder="Apellido"
                  styleDiv={{width: '48%'}}
                  editable={editableBool[0]}
                  defaultValue={data["lastname"]}
                  onChangeText={newText => handleChange("lastname", newText)}
                />
              </View>

              <SimpleInput 
                placeholder="Correo electrónico"
                inputMode="email"
                editable={editableBool[1]}
                defaultValue={data["email"]}
                onChangeText={newText => handleChange("email", newText)}
              />
              
              <SimpleInput 
                placeholder="Contraseña" 
                secureTextEntry={true}
                editable={editableBool[1]}
                defaultValue={data["password"]}
                styleInput={{width: '100%'}}
                onChangeText={newText => handleChange("password", newText)}
              />

              <TouchableOpacity>
                <NormalText 
                  style={{color: '#8A19D6', fontWeight: 700, marginTop: -10, alignSelf: 'flex-end'}}
                >
                ¿Olvidaste tu contraseña?
                </NormalText>
              </TouchableOpacity>
              
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <SimpleInput 
                  placeholder="Departamento"
                  styleDiv={{width: '48%'}}
                  editable={editableBool[0]}
                  defaultValue={data["dpt"]}
                  onChangeText={newText => handleChange("dpt", newText)}
                />
                <SimpleInput 
                  placeholder="Ciudad"
                  styleDiv={{width: '48%'}}
                  editable={editableBool[0]}
                  defaultValue={data["city"]}
                  onChangeText={newText => handleChange("city", newText)}
                />
              </View>

              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <SimpleInput 
                  placeholder="Código Postal"
                  styleDiv={{width: '48%'}}
                  inputMode="numeric"
                  editable={editableBool[0]}
                  defaultValue={data["postCode"]}
                  onChangeText={newText => handleChange("postcode", newText)}
                />
                <SimpleInput 
                  placeholder="Dirección"
                  styleDiv={{width: '48%'}}
                  editable={editableBool[0]}
                  defaultValue={data["address"]}
                  onChangeText={newText => handleChange("address", newText)}
                />
              </View>

              <SimpleInput 
                placeholder="Biografía"
                multiline={true}
                numberOfLines={5}
                editable={editableBool[0]}
                defaultValue={data["bio"]}
                onChangeText={newText => handleChange("bio", newText)}
              />
            </View>

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
    width: '100%',
    height: 500,
    aspectRatio: 1
  },
});


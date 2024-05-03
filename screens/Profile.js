import { View, StyleSheet, Image, ScrollView } from "react-native";
import { supabase } from '../supabase';
import { Alert } from 'react-native';
import { useState } from 'react';

import { PurpleButton } from '../components/Buttons';
import ProfileEdit from '../components/ProfileEdit';

export default function Profile({ route, navigation }) {
  const { editMode, valueEmail = "", valuePass = "" } = route.params;

  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: valueEmail, // Pre-fill with the email from SignUp
    password: valuePass, // Pre-fill with the password from SignUp
    bio: '',
    dpt: '',
    city: '',
    postcode: null,
    address: '',
  });

  var buttonTitle, action;
  if (editMode === true) {
    buttonTitle = "Guardar";
    editable = "all";
    action = () => { }; // Acción de guardar cambios en base de datos
  } else if (editMode === "x") {
    buttonTitle = "Guardar";
    editable = "x";
const action = async () => {
  try {
    // Insert the user data into the 'Account' table
    const { data, error } = await supabase
      .from('Account')
      .insert([formData])
      .single();

    if (error) {
      throw error;
    }

    // Check if data is not null
    if (data) {
      // Get the inserted row data
      const insertedRow = data[0];

      // Get the inserted accountID
      const accountID = insertedRow.accountID;

      // Optionally, you can navigate to the 'Home' screen after successful insertion
      navigation.navigate('Home');
    } else {
      throw new Error('Error inserting data into the database');
    }
  } catch (error) {
    Alert.alert('Error', error.message);
  }
};
  } else {
    buttonTitle = "Editar";
    editable = "none";
    action = () => navigation.navigate('Perfil', { editMode: true });  // Pasa a modo edición total
  }

  return (
    <View style={styles.view0}>
      <Image
        resizeMode="stretch"
        source={require("../assets/images/bg-register.png")}
        style={styles.image1}
      />

      <ScrollView style={styles.scrollview}>
        <View style={styles.view1}>
          <View style={styles.view2}>
            <ProfileEdit editable={editable} fetch={true} valueEmail={valueEmail} valuePass={valuePass} onChangeText={(field, value) => setFormData({ ...formData, [field]: value })} />
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


import { View, StyleSheet, Image, ScrollView } from "react-native";

import { PurpleButton } from '../components/Buttons';
import ProfileEdit from '../components/ProfileEdit';

// la idea es que los datos del profile edit estén rellenados previamente con los reales. hay que hacer fetch o algo
export default function Profile({route, navigation}) {
  const { editMode, valueEmail="", valuePass="" } = route.params;
  
  var buttonTitle, action; 
  if (editMode === true) {
    buttonTitle = "Guardar";
    editable = "all";
    action = () => {}; // Acción de guardar cambios en base de datos
  } else if (editMode === "x") {
    buttonTitle = "Guardar";
    editable = "x";
    action = () => {// Acción de guardar cambios en base de datos. y después redirigir a home.
      console.log("saving");
      navigation.navigate('Home');
    }; 
  } else {
    buttonTitle = "Editar";
    editable = "none";
    action = () => navigation.navigate('Perfil', {editMode: true});  // Pasa a modo edición total
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
            <ProfileEdit editable={editable} fetch={true} valueEmail={valueEmail} valuePass={valuePass} />
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


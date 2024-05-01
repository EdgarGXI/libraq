import { View, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";

import { PurpleButton } from '../components/Buttons';
import { TitleText, NormalText } from '../components/FontSizing';
import ProfileEdit from '../components/ProfileEdit';

// la idea es que los datos del profile edit estén rellenados previamente con los reales. hay que hacer fetch o algo
export default function Profile(props) {
  const { editMode } = props;
  var buttonTitle, action; 
  if (editMode) {
    buttonTitle = "Guardar";
    editable = "all";
    action = () => {}; // Acción de guardar cambios
  } else {
    buttonTitle = "Editar";
    editable = "none";
    action = () => {};  // Pasa a modo edición
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
            <ProfileEdit editable={editable} fetch={true} />
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
    aspectRatio: 1,
    width: '100%',
    maxHeight: '60%',
  },
});


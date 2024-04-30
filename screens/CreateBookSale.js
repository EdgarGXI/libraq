import { useState } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, Image } from "react-native";
//import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { MaterialIcons as Icon } from '@expo/vector-icons';

import { PurpleButton, WhiteButton } from '../components/Buttons';
import SimpleInput from '../components/SimpleInput';
import TopBar from '../components/TopBar';
import { NormalText } from '../components/FontSizing';


export default function UserBookSales() {
  const [image, setImage] = useState(null);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      //allowsEditing: true,
      aspect: [6, 10],
    });

    if (!result.canceled) {
      setImage({uri: result.assets[0].uri});
    } else {
      setImage(require('../assets/images/coverdefault.png'));
    }
  };

  const [selectedItems, setSelectedItems] = useState([]);
  const items = [
    {name: "Rayado", id: 1},
    {name: "Dañado", id: 2},
  ]

  return (
    <View style={styles.view0}>
      <SafeAreaView style={{width: '100%', flex: 1}}>

        <TopBar user="TomCherry" />
        
        <ScrollView>
          <View style={{alignItems: 'center'}}>
            <SimpleInput placeholder="Nombre del libro" fontSize={18} simple={1} style={{maxWidth: '80%'}}/>
            <SimpleInput placeholder="Autor" simple={1} style={{maxWidth: '80%'}} />
            <View style={{flexDirection: 'row', width:'80%', justifyContent: 'space-between'}}>
              <SimpleInput placeholder="Editorial" simple={1} style={{width: '60%'}} />
              <SimpleInput placeholder="Año" simple={1} inputMode="numeric" maxLength={4} style={{textAlign: 'right', width: '40%'}}/>
            </View>
            <SimpleInput placeholder="Precio" simple={1} inputMode="decimal" icon={<NormalText>$</NormalText>} style={{maxWidth: '80%', alignItems: 'center'}} />

            <View style={{width: 210, backgroundColor: '#ccc', marginVertical: 20, height: 300}}>
              <Image 
                resizeMode="contain"
                source={image} 
                style={{flex: 1, width: null, height: null}} 
              />
            </View>
            <PurpleButton title="Subir imagen" onPress={pickImage} />

            <SimpleInput placeholder="Descripción" simple={1} style={{width: '80%'}} multiline={true} numberOfLines={5} />

            <View style={{width: '80%', backgroundColor: 'white'}}>
              <SectionedMultiSelect
                selectText="¿Libro usado?"
                searchPlaceholderText="Escoja lo que aplique..."
                modalAnimationType="slide"
                colors={{primary: '#8A19D6'}}
                items={items}
                IconRenderer={Icon}
                uniqueKey="id"
                onSelectedItemsChange={setSelectedItems}
                selectedItems={selectedItems}
                styles={{
                  backdrop: styles.multiSelectBackdrop,
                  selectToggle: styles.multiSelectBox,
                  chipContainer: styles.multiSelectChipContainer,
                  chipText: styles.multiSelectChipText,
                }}
              />
            </View>

            <PurpleButton title="Publicar" style={{marginBottom: 40, marginTop: 10}} />
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
  multiSelectBackdrop: {
    backgroundColor: 'rgba(204,204,204,0.6)',
    borderRadius: '30%',
  },
  multiSelectBox: {
    borderWidth: 1,
    borderRadius: 18,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 12,
    backgroundColor: 'white',
  },
  multiSelectChipContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
    borderRadius: 18
  },
  multiSelectChipText: {
    color: '#bbb',
  }
});
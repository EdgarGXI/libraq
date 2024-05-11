import { useState } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, Image } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { MaterialIcons as Icon } from '@expo/vector-icons';

import { PurpleButton, WhiteButton } from '../components/Buttons';
import SimpleInput from '../components/SimpleInput';
import TopBar from '../components/TopBar';
import { NormalText } from '../components/FontSizing';
import { insertRow } from '../db'; // Asumiendo que tienes una función importada para insertar filas en la base de datos

export default function CreateBookSale() {
  const [image, setImage] = useState(null);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
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

  const [selectedItemsGenre, setSelectedItemsGenre] = useState([]);
  const itemsGenre = [
    {name: "Lista", id: 1},
    {name: "por", id: 2},
    {name: "definir", id: 3},
    {name: "pq", id: 4},
    {name: "flojera", id: 5},
  ]

  const [data, setFormData] = useState({
    'title': '',
    'author': '',
    'editorial': '',
    'year': '',
    'price': '',
    'cover': '',
    'description': '',
    'marked': false,
    'damaged': false,
    'status': 'available',
    'buyer': null,
    'date': new Date().toISOString(),
  });

    

  const handlePublish = async () => {
    try {
      await insertRow({
        table: 'booksale',
        row: {
          //sellerid: 'userId', // Reemplaza 'userId' con el ID del usuario actual
          title: data["title"],
          author: data["author"],
          editorial: data["editorial"],
          year: data["year"],
          //cover: image.uri, // Asumiendo que image.uri contiene la ruta de la imagen seleccionada
          //price: data["price"],
          //description: formData.description,
          //marked: formData.marked,
          //damaged: formData.damaged,
          //status: formData.status,
          //buyer: formData.buyer,
          //date: formData.date,
        },
      });
      // Aquí puedes realizar alguna acción adicional después de insertar la fila, como navegar a otra pantalla
    } catch (error) {
      console.error('Error al insertar la fila:', error);
    }
  };

  const handleChange = (id, text) => {
    setFormData(data => ({
      ...data,
      [id]: text,
    }));
  };

  return (
    <View style={styles.view0}>
      <SafeAreaView style={{width: '100%', flex: 1}}>
        
        <ScrollView>
          <View style={{alignItems: 'center'}}>
            <SimpleInput placeholder="Nombre del libro" fontSize={18} simple={true} styleDiv={{width: '80%', justifyContent: 'center'}} styleInput={{textAlign: 'center'}} defaultValue={data["title"]} onChangeText={newText => handleChange("title", newText)}/>
            <SimpleInput placeholder="Autor" simple={true} styleDiv={{width: '80%', justifyContent: 'center'}} styleInput={{textAlign: 'center'}} defaultValue={data["author"]} onChangeText={newText => handleChange("author", newText)}/>
            <View style={{flexDirection: 'row', width:'80%', justifyContent: 'space-between'}}>
              <SimpleInput placeholder="Editorial" simple={true} styleDiv={{width: '50%', justifyContent: 'center'}} styleInput={{textAlign: 'center'}} defaultValue={data["editorial"]} onChangeText={newText => handleChange("editorial", newText)}/>
              <SimpleInput placeholder="Año" simple={true} inputMode="numeric" maxLength={4} styleDiv={{width: '50%', justifyContent: 'center'}} styleInput={{textAlign: 'center'}} defaultValue={data["year"]} onChangeText={newText => handleChange("year", newText)}/>
            </View>
            <SimpleInput placeholder="Precio" simple={true} inputMode="decimal" icon={<NormalText>$</NormalText>} styleDiv={{width: '80%', justifyContent: 'center'}} defaultValue={data["price"]} onChangeText={newText => handleChange("price", newText)}/>
            <SimpleInput placeholder="Tipo de tapa (Blanda/Dura)" simple={true} styleDiv={{width: '80%', justifyContent: 'center'}} />
            <View style={{width: 210, backgroundColor: '#ccc', marginVertical: 20, height: 300}}>
              <Image 
                resizeMode="contain"
                source={image} 
                style={{flex: 1, width: null, height: null}} 
              />
            </View>
            <PurpleButton title="Subir imagen" onPress={pickImage} />

            <SimpleInput placeholder="Descripción" simple={true} styleDiv={{width: '80%'}} multiline={true} numberOfLines={5} />

            <View style={{width: '80%', backgroundColor: '#F9FBFF', gap: 10, paddingVertical: 10}}>
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

              <SectionedMultiSelect
                selectText="Género Literario"
                searchPlaceholderText="Escoja lo que aplique..."
                modalAnimationType="slide"
                colors={{primary: '#8A19D6'}}
                items={itemsGenre}
                IconRenderer={Icon}
                uniqueKey="id"
                onSelectedItemsChange={setSelectedItemsGenre}
                selectedItems={selectedItemsGenre}
                styles={{
                  backdrop: styles.multiSelectBackdrop,
                  selectToggle: styles.multiSelectBox,
                  chipContainer: styles.multiSelectChipContainer,
                  chipText: styles.multiSelectChipText,
                }}
              />
            </View>

            <PurpleButton 
              title="Publicar"
              style={{paddingHorizontal: 40, marginTop: 10, marginBottom: 40}} 
              onPress={handlePublish}
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
  multiSelectBackdrop: {
    backgroundColor: 'rgba(204,204,204,0.6)',
    borderRadius: 30,
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

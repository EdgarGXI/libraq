import { useState } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { format } from 'date-fns';

import { PurpleButton } from '../components/Buttons';
import SimpleInput from '../components/SimpleInput';
import { NormalText } from '../components/FontSizing';
import { insertRow, insertRowReturn } from '../db';
import { useAuth } from '../Auth';

function checkInputValid(data) {
  for (var item in data) {
    let input = data[item];
    if (typeof(input) == 'string') input = input.trim();
    if (input == '' || input == null) throw "invalid input";
  }
}

export default function CreateBookSale({route, navigation}) {
  const [title, setTitle] = useState(null);
  const [author, setAuthor] = useState(null);
  const [editorial, setEditorial] = useState(null);
  const [year, setYear] = useState(null);
  const [cover, setCover] = useState(null);
  const [price, setPrice] = useState(null);
  const [description, setDescription] = useState(null);
  const [error, setErrorVisible] = useState(false);
  const auth = useAuth();
  
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
    {name: 'Rayado', id: 'Rayado'},
    {name: 'Dañado', id: 'Dañado'},
  ]
  
  const [selectedItemsGenre, setSelectedItemsGenre] = useState([]);
  const itemsGenre = [
    {name: 'Juvenil', id: 'Juvenil'},
    {name: 'Adulto', id: 'Adulto'},
    {name: 'Infantil', id: 'Infantil'},
    {name: 'Horror', id: 'Horror'},
    {name: 'Misterio', id: 'Misterio'},
    {name: 'Romance', id: 'Romance'},
    {name: 'No ficción', id: 'No ficción'},
    {name: 'Ficción', id: 'Ficción'},
    {name: 'Fantasía', id: 'Fantasía'},
    {name: 'Ciencia Ficción', id: 'Ciencia Ficción'},
    {name: 'Distopia', id: 'Distopia'},
    {name: 'Thriller', id: 'Thriller'},
    {name: 'Aventura', id: 'Aventura'},
    {name: 'Histórico', id: 'Histórico'},
    {name: 'Literario', id: 'Literario'},
    {name: 'Novela gráfica', id: 'Novela gráfica'},
    {name: 'Autobiográfico', id: 'Autobiográfico'},
    {name: 'Auto-ayuda', id: 'Auto-ayuda'},
    {name: 'Humanidades', id: 'Humanidades'},
    {name: 'Ciencia y Tecnología', id: 'Ciencia y Tecnología'},
    {name: 'Religión', id: 'Religión'},
    {name: 'Comida', id: 'Comida'},
    {name: 'Arte', id: 'Arte'},
  ]

  const submit = async () => {
    try {
      checkInputValid([title, author, editorial, year, cover, price, description]);
      let newRow = await insertRowReturn(
        'booksale',
        {
          sellerid: auth.state.userToken,
          title: title.trim(),
          author: author.trim(),
          editorial: editorial.trim(),
          year: year,
          cover: cover.trim(),
          price: price,
          description: description,
          marked: selectedItems.includes('Rayado') ? true : false,
          damaged: selectedItems.includes('Dañado') ? true : false,
          status: 'ACTIVA',
          date: format(new Date(), 'yyyy-MM-dd'),
          //image: ,
        },
      )
      if (newRow == null) throw "err";
      for (var i in selectedItemsGenre) {
        await insertRow('bookgenre', {booksaleid: newRow.booksaleid, genre: selectedItemsGenre[i]});
      }
      navigation.navigate('Ventas');
    } catch (e) {
      console.log(e)
      setErrorVisible(true);
    }
  }

  return (
    <View style={styles.view0}>
      <SafeAreaView style={{ width: '100%', flex: 1 }}>
        
        <ScrollView>
          <View style={{ alignItems: 'center' }}>
            <SimpleInput 
              placeholder='Nombre del libro' 
              fontSize={18} simple={true} 
              styleDiv={{ width: '80%', justifyContent: 'center' }} 
              styleInput={{ textAlign: 'center' }} 
              onChangeText={newText => {
                setTitle(newText)
              }}
            />
            <SimpleInput 
              placeholder='Autor' 
              simple={true} 
              styleDiv={{ width: '80%', justifyContent: 'center' }} 
              styleInput={{ textAlign: 'center' }}
              onChangeText={newText => {
                setAuthor(newText)
              }}
            />
            <View style={{ flexDirection: 'row', width:'80%', justifyContent: 'space-between' }}>
              <SimpleInput 
                placeholder='Editorial' 
                simple={true} 
                styleDiv={{ width: '50%', justifyContent: 'center' }} 
                styleInput={{ textAlign: 'center' }}
                onChangeText={newText => {
                  setEditorial(newText)
                }}
              />
              <SimpleInput 
                placeholder='Año' 
                simple={true} 
                inputMode='numeric' 
                maxLength={4} 
                styleDiv={{ width: '50%', justifyContent: 'center' }} 
                styleInput={{ textAlign: 'center' }}
                onChangeText={newText => {
                  setYear(newText)
                }}
              />
            </View>
            <SimpleInput 
              placeholder='Precio' 
              simple={true} 
              inputMode='decimal' 
              icon={<NormalText>$</NormalText>} 
              styleDiv={{ width: '80%', justifyContent: 'center' }} 
              onChangeText={newText => {
                setPrice(newText)
              }}
            />
            <SimpleInput 
              placeholder='Tipo de tapa (Blanda/Dura)' 
              simple={true} 
              styleDiv={{ width: '80%', justifyContent: 'center' }} 
              onChangeText={newText => {
                setCover(newText)
              }}
            />
            <View style={{ width: 210, backgroundColor: '#ccc', marginVertical: 20, height: 300 }}>
              <Image 
                resizeMode='contain'
                source={image} 
                style={{ flex: 1, width: null, height: null }} 
              />
            </View>
            <PurpleButton title='Subir imagen' onPress={pickImage} />

            <SimpleInput 
              placeholder='Descripción' 
              simple={true} 
              styleDiv={{ width: '80%' }} 
              multiline={true} 
              numberOfLines={5} 
              onChangeText={newText => {
                setDescription(newText)
              }}
            />

            <View style={{ width: '80%', backgroundColor: '#F9FBFF', gap: 10, paddingVertical: 10 }}>
              <SectionedMultiSelect
                selectText='¿Libro usado?'
                searchPlaceholderText='Escoja lo que aplique...'
                modalAnimationType='slide'
                colors={{ primary: '#8A19D6' }}
                items={items}
                IconRenderer={Icon}
                uniqueKey='id'
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
                selectText='Género Literario'
                searchPlaceholderText='Escoja lo que aplique...'
                modalAnimationType='slide'
                colors={{ primary: '#8A19D6' }}
                items={itemsGenre}
                IconRenderer={Icon}
                uniqueKey='id'
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
            
            <PurpleButton 
              title='Publicar'
              style={{ paddingHorizontal: 40, marginTop: 10, marginBottom: 40 }} 
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
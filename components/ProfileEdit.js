import { View, Image, TouchableOpacity } from "react-native";

import SimpleInput from '../components/SimpleInput';
import { TitleText, NormalText } from '../components/FontSizing';

export default function ProfileEdit(props) {
  const { editable, fetch, valueEmail="", valuePass="" } = props;
  var editableBool, data;
  if (editable=='all') { //editable all permite que se editen todos
    editableBool = [true,true];
  } else if (editable=='none') {  //editable none NO permite que se edite ninguno
    editableBool = [false,false];
  } else {  //editable else permite que se editen todos menos email y contraseña
    editableBool = [true,false];
  }
  
  data = {
      "name": "",
      "lastName": "",
      "email": valueEmail,
      "password": valuePass,
      "dpt": "",
      "city": "",
      "postCode": "",
      "address": "",
      "bio": "",
  }
  if (fetch) {/* modify data by fetching todo menos password  */}
  
  return (
    <>
      <View style={{borderRadius: '100%', aspectRatio: 1, width: 150, overflow: 'hidden', marginTop: '-30%', alignSelf: 'center', marginBottom: 20}}>
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
          />
          <SimpleInput 
            placeholder="Apellido"
            styleDiv={{width: '48%'}}
            editable={editableBool[0]}
            defaultValue={data["lastName"]}
          />
        </View>

        <SimpleInput 
          placeholder="Correo electrónico"
          inputMode="email"
          editable={editableBool[1]}
          defaultValue={data["email"]}
        />
        
        <SimpleInput 
          placeholder="Contraseña" 
          secureTextEntry="True"
          editable={editableBool[1]}
          defaultValue={data["password"]}
          styleInput={{width: '100%'}}
        />

        <TouchableOpacity>
          <NormalText style={{color: '#8A19D6', fontWeight: 700, marginTop: -10, alignSelf: 'flex-end'}}>¿Olvidaste tu contraseña?</NormalText>
        </TouchableOpacity>
        
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <SimpleInput 
            placeholder="Departamento"
            styleDiv={{width: '48%'}}
            editable={editableBool[0]}
            defaultValue={data["dpt"]}
          />
          <SimpleInput 
            placeholder="Ciudad"
            styleDiv={{width: '48%'}}
            editable={editableBool[0]}
            defaultValue={data["city"]}
          />
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <SimpleInput 
            placeholder="Código Postal"
            styleDiv={{width: '48%'}}
            inputMode="numeric"
            editable={editableBool[0]}
            defaultValue={data["postCode"]}
          />
          <SimpleInput 
            placeholder="Dirección"
            styleDiv={{width: '48%'}}
            editable={editableBool[0]}
            defaultValue={data["address"]}
          />
        </View>

        <SimpleInput 
          placeholder="Biografía"
          multiline={true}
          numberOfLines={5}
          editable={editableBool[0]}
          defaultValue={data["bio"]}
        />
      </View>
    </>
  );
}

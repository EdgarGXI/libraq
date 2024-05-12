import { View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { TinyText } from './FontSizing';
import { Icons, Colors } from '../constants/theme';

export default function BottomNavBar({homeActive=false, ventasActive=false, pedidosActive=false, cuentaActive=false}) {
  const navigation = useNavigation();
  
  return(
    <View style={{height: 80, width: '100%', paddingVertical: 10, paddingHorizontal: 5, alignItems: 'center', backgroundColor: 'white', alignSelf: 'flex-end', borderRadius: 20, shadowColor: Colors.gray, shadowOpacity: 0.1}}>
      <View style={{flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-around'}}>
        <Pressable onPress={() => navigation.navigate('Home')} >
          <View style={{aspectRatio: 1.1, alignItems: 'center'}}>
            {Icons.home(homeActive ? Colors.accent: Colors.gray)}
            <TinyText style={{color: homeActive ? Colors.accent: Colors.gray, fontWeight: 700}}>Inicio</TinyText>
          </View>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Ventas')} >
          <View style={{aspectRatio: 1.1, alignItems: 'center'}}>
            {Icons.sales(ventasActive ? Colors.accent: Colors.gray)}
            <TinyText style={{color: ventasActive ? Colors.accent: Colors.gray, fontWeight: 700}}>Ventas</TinyText>
          </View>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Pedidos')} >
          <View style={{aspectRatio: 1.1, alignItems: 'center'}}>
            {Icons.arrows(pedidosActive ? Colors.accent: Colors.gray)}
            <TinyText style={{color: pedidosActive ? Colors.accent: Colors.gray, fontWeight: 700}}>Pedidos</TinyText>
          </View>
        </Pressable>
        <Pressable onPress={ () => navigation.navigate('Perfil', {editMode: 'none'}) } >
          <View style={{aspectRatio: 1.1, alignItems: 'center'}}>
            {Icons.profile(cuentaActive ? Colors.accent: Colors.gray)}
            <TinyText style={{color: cuentaActive ? Colors.accent: Colors.gray, fontWeight: 700}}>Cuenta</TinyText>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
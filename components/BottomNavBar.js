import { View, Pressable } from "react-native";
import Svg, { G, Path, Rect } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

import { MiniText } from './FontSizing';

export default function BottomNavBar({homeActive=false, ventasActive=false, pedidosActive=false, cuentaActive=false}) {
  const navigation = useNavigation();
  
  return(
    <View style={{flexDirection: 'row', height: 80, width: '100%', paddingVertical: 10, paddingHorizontal: 5, alignItems: 'center', backgroundColor: 'white', alignSelf: 'flex-end', borderRadius: 20, shadowColor: '#9e9e9e', shadowOpacity: 0.1}}>
      <View style={{flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-around'}}>
        <Pressable onPress={() => navigation.navigate('Home')} >
          <View style={{aspectRatio: 1.1, alignItems: 'center'}}>
            <Svg viewBox="0 0 24 24" fill="none" stroke="" height="35" width="35">
              <G id="SVGRepo_bgCarrier" strokeWidth="0"></G>
              <G id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></G>
              <G id="SVGRepo_iconCarrier"> 
                <Rect width="24" height="24" fill="white"></Rect> 
                <Path fillRule="evenodd" clip-rule="evenodd" d="M13.9931 3.43368C12.8564 2.42331 11.1436 2.42331 10.0069 3.43368L2.33565 10.2526C1.92286 10.6195 1.88568 11.2516 2.2526 11.6644C2.61952 12.0771 3.25159 12.1143 3.66437 11.7474L4.00001 11.4491L4.00001 17.0658C3.99996 17.9523 3.99992 18.7161 4.08215 19.3278C4.17028 19.9833 4.36903 20.6117 4.87869 21.1213C5.38835 21.631 6.0167 21.8297 6.67222 21.9179C7.28388 22.0001 8.04769 22 8.93418 22H15.0658C15.9523 22 16.7161 22.0001 17.3278 21.9179C17.9833 21.8297 18.6117 21.631 19.1213 21.1213C19.631 20.6117 19.8297 19.9833 19.9179 19.3278C20.0001 18.7161 20.0001 17.9523 20 17.0659L20 11.4491L20.3356 11.7474C20.7484 12.1143 21.3805 12.0771 21.7474 11.6644C22.1143 11.2516 22.0772 10.6195 21.6644 10.2526L13.9931 3.43368ZM12 16C11.4477 16 11 16.4477 11 17V19C11 19.5523 10.5523 20 10 20C9.44772 20 9 19.5523 9 19V17C9 15.3431 10.3431 14 12 14C13.6569 14 15 15.3431 15 17V19C15 19.5523 14.5523 20 14 20C13.4477 20 13 19.5523 13 19V17C13 16.4477 12.5523 16 12 16Z" fill={homeActive ? '#8A19D6': '#9e9e9e'}></Path> 
              </G>
            </Svg>
            <MiniText style={{color: homeActive ? '#8A19D6': '#9e9e9e', fontWeight: 700}}>Inicio</MiniText>
          </View>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Ventas')} >
          <View style={{aspectRatio: 1.1, alignItems: 'center'}}>
            <Svg width="35" height="35" viewBox="0 0 24 24" fill="" stroke="">
              <G id="SVGRepo_bgCarrier" strokeWidth="0"></G>
              <G id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></G>
              <G id="SVGRepo_iconCarrier"> 
                <G stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> 
                  <G id="ic_fluent_clipboard_text_24_filled" fill={ventasActive ? '#8A19D6': '#9e9e9e'} fillRule="nonzero"> 
                    <Path d="M13.75,3.5 L10.25,3.5 C9.83578644,3.5 9.5,3.83578644 9.5,4.25 C9.5,4.66421356 9.83578644,5 10.25,5 L13.75,5 C14.1642136,5 14.5,4.66421356 14.5,4.25 C14.5,3.83578644 14.1642136,3.5 13.75,3.5 Z M13.75,2 C14.8890873,2 15.8304729,2.84646164 15.9794602,3.94468833 L15.993,4.08 L15.9862059,3.99944035 L15.9862059,3.99944035 L17.75,4 C18.9926407,4 20,5.00735931 20,6.25 L20,19.75 C20,20.9926407 18.9926407,22 17.75,22 L6.25,22 C5.00735931,22 4,20.9926407 4,19.75 L4,6.25 C4,5.00735931 5.00735931,4 6.25,4 L8.01379413,3.99944035 L8.006,4.08 L8.02053985,3.94468833 C8.16952712,2.84646164 9.1109127,2 10.25,2 L13.75,2 Z M14,17 L8,17 C7.58578644,17 7.25,17.3357864 7.25,17.75 C7.25,18.1642136 7.58578644,18.5 8,18.5 L14,18.5 C14.4142136,18.5 14.75,18.1642136 14.75,17.75 C14.75,17.3357864 14.4142136,17 14,17 Z M12,13 L8,13 C7.58578644,13 7.25,13.3357864 7.25,13.75 C7.25,14.1642136 7.58578644,14.5 8,14.5 L12,14.5 C12.4142136,14.5 12.75,14.1642136 12.75,13.75 C12.75,13.3357864 12.4142136,13 12,13 Z M16,9 L8,9 C7.58578644,9 7.25,9.33578644 7.25,9.75 C7.25,10.1642136 7.58578644,10.5 8,10.5 L16,10.5 C16.4142136,10.5 16.75,10.1642136 16.75,9.75 C16.75,9.33578644 16.4142136,9 16,9 Z"> </Path> 
                  </G> 
                </G> 
              </G>
            </Svg>
            <MiniText style={{color: ventasActive ? '#8A19D6': '#9e9e9e', fontWeight: 700}}>Ventas</MiniText>
          </View>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Pedidos')} >
          <View style={{aspectRatio: 1.1, alignItems: 'center'}}>
            <Svg width="35" height="35" viewBox="0 0 24 24" fill="none">
              <G id="SVGRepo_bgCarrier" strokeWidth="0"></G>
              <G id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></G>
              <G id="SVGRepo_iconCarrier"> 
                <Path d="M18 3.99997C18 3.44769 17.5523 2.99998 17 2.99998C16.4477 2.99999 16 3.44771 16 4L16.0002 17.586L13.7071 15.2929C13.3166 14.9024 12.6834 14.9024 12.2929 15.2929C11.9024 15.6834 11.9024 16.3166 12.2929 16.7071L16.2929 20.7071C16.4163 20.8305 16.5639 20.9149 16.7204 20.9603C16.7777 20.977 16.837 20.9886 16.898 20.9948C16.9316 20.9982 16.9657 21 17.0002 21C17.018 21 17.0357 20.9995 17.0533 20.9986C17.3143 20.985 17.5488 20.8712 17.7192 20.695L21.7071 16.7071C22.0976 16.3166 22.0976 15.6834 21.7071 15.2929C21.3166 14.9024 20.6834 14.9024 20.2929 15.2929L18.0002 17.5856L18 3.99997Z" fill={pedidosActive ? '#8A19D6': '#9e9e9e'}></Path> 
                <Path d="M8 20L8 6.41421L10.2929 8.7071C10.6834 9.09763 11.3166 9.09763 11.7071 8.7071C12.0976 8.31658 12.0976 7.68341 11.7071 7.29289L7.70711 3.29289C7.31658 2.90237 6.68342 2.90237 6.29289 3.29289L2.29289 7.29289C1.90237 7.68341 1.90237 8.31658 2.29289 8.7071C2.68342 9.09763 3.31658 9.09763 3.70711 8.7071L6 6.41421L6 20C6 20.5523 6.44772 21 7 21C7.55229 21 8 20.5523 8 20Z" fill={pedidosActive ? '#8A19D6': '#9e9e9e'}></Path> 
              </G>
            </Svg>
            <MiniText style={{color: pedidosActive ? '#8A19D6': '#9e9e9e', fontWeight: 700}}>Pedidos</MiniText>
          </View>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Perfil')} >
          <View style={{aspectRatio: 1.1, alignItems: 'center'}}>
            <Svg width="35" height="35" viewBox="0 0 24 24" fill="none">
              <G id="SVGRepo_bgCarrier" strokeWidth="0"></G><G id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></G>
              <G id="SVGRepo_iconCarrier"> 
                <Path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill={cuentaActive ? '#8A19D6': '#9e9e9e'}></Path> 
                <Path d="M12.0002 14.5C6.99016 14.5 2.91016 17.86 2.91016 22C2.91016 22.28 3.13016 22.5 3.41016 22.5H20.5902C20.8702 22.5 21.0902 22.28 21.0902 22C21.0902 17.86 17.0102 14.5 12.0002 14.5Z" fill={cuentaActive ? '#8A19D6': '#9e9e9e'}></Path> 
              </G>
            </Svg>
            <MiniText style={{color: cuentaActive ? '#8A19D6': '#9e9e9e', fontWeight: 700}}>Cuenta</MiniText>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

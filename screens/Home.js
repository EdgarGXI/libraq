import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView
} from "react-native";
import Svg, { G, Path } from 'react-native-svg';

import BookSale from '../components/BookSale';
import TopBar from '../components/TopBar';
import { TitleText } from '../components/FontSizing';
import Stat from '../components/Stat';
import SimpleInput from '../components/SimpleInput';

// estadísticas solo aparecen si ventas del usuario > 0? o que aparezcan igualmente? idk
//añadir filtros?

export default function Home() {
  return (
    <View style={styles.view0}>
      <SafeAreaView style={{width: '100%', flex: 1}}>

        <TopBar user="TomCherry" />
          
        <ScrollView style={{width: '90%', alignSelf: 'center'}}>
          <SimpleInput 
            placeholder="Buscar..." 
            icon={
              <Svg viewBox="0 0 24 24" fill="none" stroke="#cccccc" width="20" height="20">
                <G id="SVGRepo_bgCarrier" strokeWidth="0"></G>
                <G id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></G>
                <G id="SVGRepo_iconCarrier"> 
                  <Path d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#ccc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></Path> 
                </G>
              </Svg>
            }
            styleDiv={{marginBottom: 20}}
          /> 

          <TitleText style={{paddingBottom: 10}}>Estadísticas</TitleText>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20}}>
            <Stat 
              desc="Productos"
              number={920}
              icon={
                <Svg fill="#ffffff" viewBox="0 0 32 32" stroke="#ffffff" strokeWidth="1.18">
                  <G id="SVGRepo_bgCarrier" strokeWidth="0"></G>
                  <G id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></G>
                  <G id="SVGRepo_iconCarrier">
                    <Path d="M30.156 26.492l-6.211-23.184c-0.327-1.183-1.393-2.037-2.659-2.037-0.252 0-0.495 0.034-0.727 0.097l0.019-0.004-2.897 0.776c-0.325 0.094-0.609 0.236-0.86 0.42l0.008-0.005c-0.49-0.787-1.349-1.303-2.33-1.306h-2.998c-0.789 0.001-1.5 0.337-1.998 0.873l-0.002 0.002c-0.5-0.537-1.211-0.873-2-0.874h-3c-1.518 0.002-2.748 1.232-2.75 2.75v24c0.002 1.518 1.232 2.748 2.75 2.75h3c0.789-0.002 1.5-0.337 1.998-0.873l0.002-0.002c0.5 0.538 1.211 0.873 2 0.875h2.998c1.518-0.002 2.748-1.232 2.75-2.75v-16.848l4.699 17.54c0.327 1.182 1.392 2.035 2.656 2.037h0c0.001 0 0.003 0 0.005 0 0.251 0 0.494-0.034 0.725-0.098l-0.019 0.005 2.898-0.775c1.182-0.326 2.036-1.392 2.036-2.657 0-0.252-0.034-0.497-0.098-0.729l0.005 0.019zM18.415 9.708l5.31-1.423 3.753 14.007-5.311 1.422zM18.068 3.59l2.896-0.776c0.097-0.027 0.209-0.043 0.325-0.043 0.575 0 1.059 0.389 1.204 0.918l0.002 0.009 0.841 3.139-5.311 1.423-0.778-2.905v-1.055c0.153-0.347 0.449-0.607 0.812-0.708l0.009-0.002zM11.5 2.75h2.998c0.69 0.001 1.249 0.56 1.25 1.25v3.249l-5.498 0.001v-3.25c0.001-0.69 0.56-1.249 1.25-1.25h0zM8.75 23.25h-5.5v-14.5l5.5-0.001zM10.25 8.75l5.498-0.001v14.501h-5.498zM4.5 2.75h3c0.69 0.001 1.249 0.56 1.25 1.25v3.249l-5.5 0.001v-3.25c0.001-0.69 0.56-1.249 1.25-1.25h0zM7.5 29.25h-3c-0.69-0.001-1.249-0.56-1.25-1.25v-3.25h5.5v3.25c-0.001 0.69-0.56 1.249-1.25 1.25h-0zM14.498 29.25h-2.998c-0.69-0.001-1.249-0.56-1.25-1.25v-3.25h5.498v3.25c-0.001 0.69-0.56 1.249-1.25 1.25h-0zM28.58 27.826c-0.164 0.285-0.43 0.495-0.747 0.582l-0.009 0.002-2.898 0.775c-0.096 0.026-0.206 0.041-0.319 0.041-0.575 0-1.060-0.387-1.208-0.915l-0.002-0.009-0.841-3.14 5.311-1.422 0.841 3.14c0.027 0.096 0.042 0.207 0.042 0.321 0 0.23-0.063 0.446-0.173 0.63l0.003-0.006z"></Path> 
                  </G>
                </Svg>
              }
              style={{width: '32%'}}
            />
            <Stat 
              desc="Vendidos"
              number={52}
              icon={
                <Svg fill="#ffffff" viewBox="-40.96 -40.96 1105.92 1105.92" stroke="#ffffff" strokeWidth="60">
                  <G id="SVGRepo_bgCarrier" strokeWidth="0"></G>
                  <G id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></G>
                  <G id="SVGRepo_iconCarrier">
                    <Path d="M136.948 908.811c5.657 0 10.24-4.583 10.24-10.24V610.755c0-5.657-4.583-10.24-10.24-10.24h-81.92a10.238 10.238 0 00-10.24 10.24v287.816c0 5.657 4.583 10.24 10.24 10.24h81.92zm0 40.96h-81.92c-28.278 0-51.2-22.922-51.2-51.2V610.755c0-28.278 22.922-51.2 51.2-51.2h81.92c28.278 0 51.2 22.922 51.2 51.2v287.816c0 28.278-22.922 51.2-51.2 51.2zm278.414-40.96c5.657 0 10.24-4.583 10.24-10.24V551.322c0-5.657-4.583-10.24-10.24-10.24h-81.92a10.238 10.238 0 00-10.24 10.24v347.249c0 5.657 4.583 10.24 10.24 10.24h81.92zm0 40.96h-81.92c-28.278 0-51.2-22.922-51.2-51.2V551.322c0-28.278 22.922-51.2 51.2-51.2h81.92c28.278 0 51.2 22.922 51.2 51.2v347.249c0 28.278-22.922 51.2-51.2 51.2zm278.414-40.342c5.657 0 10.24-4.583 10.24-10.24V492.497c0-5.651-4.588-10.24-10.24-10.24h-81.92c-5.652 0-10.24 4.589-10.24 10.24v406.692c0 5.657 4.583 10.24 10.24 10.24h81.92zm0 40.96h-81.92c-28.278 0-51.2-22.922-51.2-51.2V492.497c0-28.271 22.924-51.2 51.2-51.2h81.92c28.276 0 51.2 22.929 51.2 51.2v406.692c0 28.278-22.922 51.2-51.2 51.2zm278.414-40.958c5.657 0 10.24-4.583 10.24-10.24V441.299c0-5.657-4.583-10.24-10.24-10.24h-81.92a10.238 10.238 0 00-10.24 10.24v457.892c0 5.657 4.583 10.24 10.24 10.24h81.92zm0 40.96h-81.92c-28.278 0-51.2-22.922-51.2-51.2V441.299c0-28.278 22.922-51.2 51.2-51.2h81.92c28.278 0 51.2 22.922 51.2 51.2v457.892c0 28.278-22.922 51.2-51.2 51.2zm-6.205-841.902C677.379 271.088 355.268 367.011 19.245 387.336c-11.29.683-19.889 10.389-19.206 21.679s10.389 19.889 21.679 19.206c342.256-20.702 670.39-118.419 964.372-284.046 9.854-5.552 13.342-18.041 7.79-27.896s-18.041-13.342-27.896-7.79z"></Path>
                    <Path d="M901.21 112.64l102.39.154c11.311.017 20.494-9.138 20.511-20.449s-9.138-20.494-20.449-20.511l-102.39-.154c-11.311-.017-20.494 9.138-20.511 20.449s9.138 20.494 20.449 20.511z"></Path>
                    <Path d="M983.151 92.251l-.307 101.827c-.034 11.311 9.107 20.508 20.418 20.542s20.508-9.107 20.542-20.418l.307-101.827c.034-11.311-9.107-20.508-20.418-20.542s-20.508 9.107-20.542 20.418z"></Path>
                  </G>
                </Svg>
              }
              style={{width: '32%'}}
            />
            <Stat 
              desc="Lucro"
              number="$90000"
              icon={
                <Svg fill="#ffffff" viewBox="0 0 32 32" stroke="#ffffff">
                  <G id="SVGRepo_bgCarrier" strokeWidth="0"></G>
                  <G id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></G>
                  <G id="SVGRepo_iconCarrier"> 
                    <G data-name="32. Clipboard" id="_32._Clipboard"> 
                      <Path d="M25,2H22a2,2,0,0,0-2-2H12a2,2,0,0,0-2,2H7A3,3,0,0,0,4,5V29a3,3,0,0,0,3,3H25a3,3,0,0,0,3-3V5A3,3,0,0,0,25,2ZM12,2h8V3h0V4H12ZM26,29a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V5A1,1,0,0,1,7,4h3a2,2,0,0,0,2,2h8a2,2,0,0,0,2-2h3a1,1,0,0,1,1,1Z"></Path> 
                      <Path d="M15,19a1,1,0,0,0,2,0v-.18A3,3,0,0,0,16,13a1,1,0,0,1,0-2h2a1,1,0,0,0,0-2H17a1,1,0,0,0-2,0v.18A3,3,0,0,0,16,15a1,1,0,0,1,0,2H14a1,1,0,0,0,0,2Z"></Path> 
                      <Path d="M11,22H9a1,1,0,0,0,0,2h2a1,1,0,0,0,0-2Z"></Path> 
                      <Path d="M23,22H15a1,1,0,0,0,0,2h8a1,1,0,0,0,0-2Z"></Path> 
                      <Path d="M11,26H9a1,1,0,0,0,0,2h2a1,1,0,0,0,0-2Z"></Path> 
                      <Path d="M23,26H15a1,1,0,0,0,0,2h8a1,1,0,0,0,0-2Z"></Path> 
                    </G> 
                  </G>
                </Svg>
              }
              style={{width: '32%'}}
            />
          </View>

          <TitleText style={{paddingBottom: 10}}>Últimas ventas</TitleText>
          <View style={{alignItems: 'center', gap: 30, width: '100%'}}>
            <BookSale 
              id="" 
              title="La Cadena de Hierro" 
              author="Cassandra Clare" 
              editorial="Destino" 
              year="2024" 
              cover="Blanda" 
              price={20000} 
              status="VENTA ACTIVA" 
              date="24/12/2025"
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
});

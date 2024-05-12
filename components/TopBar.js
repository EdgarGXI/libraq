import { View, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';

import { useAuth } from '../Auth';
import { WhiteButton } from '../components/Buttons';
import { TitleText } from './FontSizing';
import { Colors, Icons } from '../constants/theme';
import { uncheckedOffers } from '../db';

export default function TopBar() {
  const [notif, setNotif] = useState(false);
  const { userName, userToken } = useAuth().state; 
  const navigation = useNavigation();
  
  const handleProfile = () => {
    navigation.navigate('Perfil', {editMode: 'none'});
  };

  useEffect(() => {
    const getNotifs = async () => {
      let newOffers = await uncheckedOffers(userToken);
      setNotif(newOffers > 0 ? true : false);
    }
    getNotifs();
  }, []);

  return(
    <View 
      style={{ 
        flexDirection: 'row', 
        height: 80, 
        paddingVertical: 10, 
        paddingHorizontal: 25, 
        alignItems: 'center', 
        backgroundColor: 'white' 
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', width: '80%', gap: 10 }}>
        <Pressable onPress={handleProfile} >
          <View style={{ height: '80%', aspectRatio: 1 }}>
              <Image
                resizeMode='contain'
                source={require('../assets/images/avatar.png')} 
                style={{ flex: 1, width: null, height: null, aspectRatio: 1 }} 
              ></Image>
          </View>
        </Pressable>
        <TitleText>{userName}</TitleText>
      </View>
      <View style={{ alignItems: 'flex-end', width: '20%' }}>
        <WhiteButton 
          style={{ paddingHorizontal: 8, paddingVertical: 2, height: '80%', aspectRatio: 1 }}
          border={{ borderColor: Colors.dark_gray, borderWidth: 1 }}
          icon={notif ? Icons.bell_circle : Icons.bell}
        />
      </View>
    </View>
  );
}
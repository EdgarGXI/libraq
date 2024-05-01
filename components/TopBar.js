import {
  View,
  Image,
  Text,
  TouchableHighlight,
  Pressable
} from "react-native";
import Svg, { G, Path, Circle } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';

import { WhiteButton } from '../components/Buttons';
import { TitleText } from './FontSizing';

function NotificationsButton(props) {
  const { notif } = props;
  if (notif) {
    return (
      <>
      <WhiteButton 
        style={{paddingHorizontal: 8, paddingVertical: 2, height: '80%', aspectRatio: 1}}
        border={{borderColor: '#ccc', borderWidth: 1}}
        icon={
          <Svg viewBox="0 0 24 24" fill="none" style={{aspectRatio: 1, height: '80%'}}>
            <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
            <G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></G>
            <G id="SVGRepo_iconCarrier"> 
              <G id="style=linear"> 
                <G id="notification-bell-new"> 
                  <Path id="vector" d="M14.7356 19.5801C14.7356 19.8834 14.658 20.1838 14.5073 20.4641C14.3565 20.7444 14.1356 20.9991 13.857 21.2136C13.5785 21.4281 13.2478 21.5983 12.8839 21.7144C12.52 21.8304 12.1299 21.8902 11.736 21.8902C11.3421 21.8902 10.9521 21.8304 10.5881 21.7144C10.2242 21.5983 9.89354 21.4281 9.61501 21.2136C9.33647 20.9991 9.11552 20.7444 8.96478 20.4641C8.81404 20.1838 8.73645 19.8834 8.73645 19.5801" stroke="#000000" stroke-width="1.5" stroke-linecap="round"></Path> 
                  <Path id="vector_2" d="M18.7917 10.9112C18.8915 11.7454 19.1223 12.5607 19.4774 13.3265L19.7421 13.8972C20.7516 16.0741 19.4369 18.6186 17.0773 19.0547L16.9171 19.0843C13.4921 19.7174 9.98001 19.7174 6.55497 19.0843C4.17606 18.6446 2.91751 16.0127 4.06867 13.885L4.29508 13.4665C4.91326 12.3239 5.23697 11.0453 5.23697 9.74614L5.23697 8.42485C5.23697 6.20106 6.49561 4.16885 8.48651 3.1781C10.2177 2.3166 12.1995 2.15641 14.0267 2.70339" stroke="#000000" stroke-width="1.5" stroke-linecap="round"></Path> 
                  <Circle id="vector_3" cx="17.8599" cy="6.03711" r="2.5" stroke="#000000" stroke-width="1.5"></Circle> 
                </G> 
              </G> 
            </G>
          </Svg>
        }
      />
      </>
    );
  } else {
    return (
      <WhiteButton 
        style={{paddingHorizontal: 8, paddingVertical: 2, height: '80%', aspectRatio: 1}}
        border={{borderColor: '#ccc', borderWidth: 1}}
        icon={
          <Svg viewBox="0 0 24 24" fill="none">
            <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
            <G id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></G>
            <G id="SVGRepo_iconCarrier"> 
              <G id="style=stroke"> 
                <G id="notification-bell"> 
                  <Path id="vector (Stroke)" fill-rule="evenodd" clip-rule="evenodd" d="M8.87378 18.6934C9.28799 18.6934 9.62378 19.0291 9.62378 19.4434C9.62378 19.6166 9.66765 19.7955 9.76263 19.9722C9.85831 20.15 10.0063 20.3258 10.21 20.4827C10.4138 20.6396 10.6653 20.7712 10.9534 20.8631C11.2413 20.955 11.5544 21.0035 11.8734 21.0035C12.1923 21.0035 12.5054 20.955 12.7933 20.8631C13.0814 20.7712 13.3329 20.6396 13.5367 20.4827C13.7404 20.3258 13.8884 20.15 13.9841 19.9722C14.0791 19.7955 14.1229 19.6166 14.1229 19.4434C14.1229 19.0291 14.4587 18.6934 14.8729 18.6934C15.2871 18.6934 15.6229 19.0291 15.6229 19.4434C15.6229 19.8769 15.5116 20.2987 15.3051 20.6827C15.0993 21.0653 14.8054 21.3989 14.452 21.6711C14.0987 21.9431 13.6889 22.1519 13.2492 22.2922C12.8093 22.4325 12.3422 22.5035 11.8734 22.5035C11.4045 22.5035 10.9374 22.4325 10.4975 22.2922C10.0578 22.1519 9.64798 21.9431 9.29471 21.6711C8.94129 21.3989 8.64739 21.0653 8.44158 20.6827C8.23509 20.2987 8.12378 19.8769 8.12378 19.4434C8.12378 19.0291 8.45957 18.6934 8.87378 18.6934Z" fill="#000000"></Path> 
                  <Path id="vector (Stroke)_2" fill-rule="evenodd" clip-rule="evenodd" d="M8.28966 2.36993C10.5476 1.24631 13.1934 1.20809 15.4828 2.26601L15.6874 2.36056C18.0864 3.46909 19.6223 5.87083 19.6223 8.51353L19.6223 9.82417C19.6223 10.8777 19.8519 11.9185 20.2951 12.8742L20.5598 13.445C21.7754 16.0663 20.1923 19.1303 17.3509 19.6555L17.2146 18.918L17.3509 19.6555L17.1907 19.6851C13.6756 20.3349 10.0711 20.3349 6.55594 19.6851C3.6763 19.1529 2.15285 15.967 3.54631 13.3914L3.77272 12.9729C4.3316 11.9399 4.62426 10.7839 4.62426 9.60942L4.62426 8.28813C4.62426 5.77975 6.04397 3.48746 8.28966 2.36993ZM14.8536 3.62766C12.9772 2.76057 10.8086 2.7919 8.95794 3.71284C7.22182 4.57679 6.12426 6.34893 6.12426 8.28813L6.12426 9.60942C6.12426 11.0332 5.76949 12.4345 5.09201 13.6867L4.86561 14.1052C3.95675 15.785 4.95039 17.863 6.82857 18.2101C10.1635 18.8265 13.5832 18.8265 16.9181 18.2101L17.0783 18.1805C18.9561 17.8334 20.0024 15.8084 19.199 14.076L18.9343 13.5053C18.3994 12.3518 18.1223 11.0956 18.1223 9.82416L18.1223 8.51353C18.1223 6.45566 16.9263 4.58543 15.0582 3.72221L14.8536 3.62766Z" fill="#000000"></Path> 
                </G> 
              </G> 
            </G>
          </Svg>
      }
      />    
    );
  }
}

export default function TopBar(props) {
  const { user, notif } = props;
  const navigation = useNavigation();
  

  const handleProfile = () => {
    ///////////////
    //////////////
    navigation.navigate('Profile');
  };
  return(
    <View style={{flexDirection: 'row', height: '12%', paddingVertical: 10, paddingHorizontal: 25, alignItems: 'center'}}>
      <View style={{flexDirection: 'row', alignItems: 'center', width: '80%', gap: 10}}>
        <Pressable onPress={handleProfile} >
          <View style={{height: '80%', aspectRatio: 1}}>
              <Image
                resizeMode="contain"
                source={require('../assets/images/avatar.png')} 
                style={{flex: 1, width: null, height: null, aspectRatio: 1}} 
              ></Image>
          </View>
        </Pressable>
        <TitleText>{user}</TitleText>
      </View>
      <View style={{alignItems: 'flex-end', width: '20%'}}>
        <NotificationsButton notif={notif} />
      </View>
    </View>
  );
}

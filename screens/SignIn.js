import { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import Svg, { G, Path } from 'react-native-svg';

import { useAuth } from '../Auth';
import SimpleInput from '../components/SimpleInput';
import { WhiteButton, PurpleButton } from '../components/Buttons';
import { TitleText, NormalText } from '../components/FontSizing';

export default function SignIn({route, navigation}) {
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrorVisible] = useState(false);
  
  const handleLogIn = async () => {
    try { // try to sign in with creds
      await auth.signIn({ email: email, password: password });
    } catch (e) { // on error, show error message
      setErrorVisible(true);
    }
  };
  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.view0}>
      <Image
          resizeMode="stretch"
          source={require("../assets/images/bg-register.png")}
          style={styles.image1}
      />
      
      <ScrollView style={styles.scrollview}>
        <View style={styles.view1}>
          
          <TitleText>Inicia sesión</TitleText>
          
          <View style={{gap: 20, paddingVertical: 20}}>

            <SimpleInput 
              placeholder="Correo electrónico"
              icon={
                <Svg width="20" height="20">
                  <Path d="M18.2422 2.96875H1.75781C0.786602 2.96875 0 3.76023 0 4.72656V15.2734C0 16.2455 0.792383 17.0312 1.75781 17.0312H18.2422C19.2053 17.0312 20 16.2488 20 15.2734V4.72656C20 3.76195 19.2165 2.96875 18.2422 2.96875ZM17.996 4.14062C17.6369 4.49785 11.4564 10.6458 11.243 10.8581C10.9109 11.1901 10.4695 11.3729 10 11.3729C9.53047 11.3729 9.08906 11.1901 8.75594 10.857C8.61242 10.7142 2.50012 4.63414 2.00398 4.14062H17.996ZM1.17188 15.0349V4.96582L6.23586 10.0031L1.17188 15.0349ZM2.00473 15.8594L7.06672 10.8296L7.9284 11.6867C8.48176 12.2401 9.21746 12.5448 10 12.5448C10.7825 12.5448 11.5182 12.2401 12.0705 11.6878L12.9333 10.8296L17.9953 15.8594H2.00473ZM18.8281 15.0349L13.7641 10.0031L18.8281 4.96582V15.0349Z" fill="#8A19D6"/>
                </Svg>
              } 
              inputMode="email"
              styleInput={{ width: '90%' }}
              onChangeText={newText => {
                setEmail(newText); 
                setErrorVisible(false);
              }}
              value={email}
            />
            
            <SimpleInput 
              placeholder="Contraseña" 
              icon={
                <Svg width="20" height="20">
                  <Path d="M9.99999 0.588226C7.05881 0.588226 4.70587 2.94117 4.70587 5.88234V8.23529C3.70587 8.23529 2.94116 8.99999 2.94116 9.99999V17.6471C2.94116 18.6471 3.70587 19.4118 4.70587 19.4118H15.2941C16.2941 19.4118 17.0588 18.6471 17.0588 17.6471V9.99999C17.0588 8.99999 16.2941 8.23529 15.2941 8.23529V5.88234C15.2941 2.94117 12.9412 0.588226 9.99999 0.588226ZM15.8823 9.99999V17.6471C15.8823 18 15.647 18.2353 15.2941 18.2353H4.70587C4.35293 18.2353 4.11763 18 4.11763 17.6471V9.99999C4.11763 9.64705 4.35293 9.41176 4.70587 9.41176H5.2941H14.7059H15.2941C15.647 9.41176 15.8823 9.64705 15.8823 9.99999ZM5.88234 8.23529V5.88234C5.88234 3.58823 7.70587 1.7647 9.99999 1.7647C12.2941 1.7647 14.1176 3.58823 14.1176 5.88234V8.23529H5.88234Z" fill="#8A19D6"/>
                  <Path d="M10 11.1765C9 11.1765 8.23529 11.9412 8.23529 12.9412C8.23529 13.7059 8.70588 14.3529 9.41176 14.5882V15.8823C9.41176 16.2353 9.64706 16.4706 10 16.4706C10.3529 16.4706 10.5882 16.2353 10.5882 15.8823V14.5882C11.2941 14.3529 11.7647 13.7059 11.7647 12.9412C11.7647 11.9412 11 11.1765 10 11.1765ZM10 13.5294C9.64706 13.5294 9.41176 13.2941 9.41176 12.9412C9.41176 12.5882 9.64706 12.3529 10 12.3529C10.3529 12.3529 10.5882 12.5882 10.5882 12.9412C10.5882 13.2941 10.3529 13.5294 10 13.5294Z" fill="#8A19D6"/>
                </Svg>
              } 
              secureTextEntry={true}
              styleInput={{ width: '90%' }}
              onChangeText={newText => {
                setPassword(newText); 
                setErrorVisible(false);
              }}
              value={password}
            />

            <TouchableOpacity>
              <NormalText style={{color: '#8A19D6', fontWeight: 700, marginTop: -10, alignSelf: 'flex-end'}}>¿Olvidaste tu contraseña?</NormalText>
            </TouchableOpacity>

            <PurpleButton title="Iniciar sesión" fontSize={14} onPress={handleLogIn} />

            <TouchableOpacity onPress={handleSignUp}>
              <NormalText style={{ color: '#8A19D6', fontWeight: 700, marginTop: -10, alignSelf: 'flex-end' }} onPress={handleSignUp}>
                ¿No tienes una cuenta? Regístrate.
              </NormalText>
            </TouchableOpacity>
            
            <NormalText 
              style={{ 
                color: 'red', 
                fontWeight: 700, 
                alignSelf: 'center', 
                textAlign: 'center', 
                display: error ? 'block' : 'none',
              }} 
              >
              El correo o contraseña ingresados son inválidos.
            </NormalText>

          </View>
          
          <View style={styles.cont}>
            <View style={styles.line} />
            <NormalText>o</NormalText>
            <View style={styles.line} />
          </View>

          <WhiteButton 
            icon={
              <Image
                resizeMode="stretch"
                source={{
                  uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/d649b2ae889bd79f1cb5249a2015750b90a817331398ab72c05528b39b544961?",
                }}
                style={{width: 20, aspectRatio: 1}}
              />
            }
            title="Google" 
            border={{borderColor: '#ccc', borderWidth: 2}}
            fontColor="black"
          />

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
    marginTop: 300, 
    paddingVertical: 20, 
    paddingHorizontal: 30, 
    paddingBottom: 50,
  },
  image1: {
    zIndex: 0,
    overflow: 'hidden',
    width: '100%',
    height: 500,
    aspectRatio: 1,
  },
  cont: {
    alignItems: 'center',
    gap: 8,
    flexDirection: 'row',
    paddingBottom: 20,
    justifyContent: 'center',
  },
  line: {
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: '#ccc',
    height: 2,
    flex: 1,
  },
});

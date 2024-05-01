import { SafeAreaView, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// or any files within the Snack
import StartScreen from './screens/StartScreen';
import SignUp from './screens/SignUp';
import SignIn from './screens/SignIn';
import UserBookSales from './screens/UserBookSales';
import UserBookOffers from './screens/UserBookOffers';
import CreateBookSale from './screens/CreateBookSale';
import Profile from './screens/Profile';
import Home from './screens/Home';
import BookSaleDetails from './screens/BookSaleDetails';
import UserBookSales from './screens/UserBookSales';
import UserBookOffers from './screens/UserBookOffers';
import CreateBookSale from './screens/CreateBookSale';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="StartScreen" component={StartScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Perfil" component={Profile} />
        <Stack.Screen name="Detalles de venta" component={BookSaleDetails} />
        <Stack.Screen name="Ventas" component={UserBookSales} options={{ headerShown: false }} />
        <Stack.Screen name="Pedidos" component={UserBookOffers} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //justifyContent: 'start',
    backgroundColor: '#aaa0f1',
    //margin: 0,
    //padding: 0,
    //justifyContent: 'start',
    //alignItems: 'start'
  },
});

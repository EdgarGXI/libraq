import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth, AuthProvider, AuthContext } from './Auth';
import StartScreen from './screens/StartScreen';
import SignUp from './screens/SignUp';
import SignIn from './screens/SignIn';
import UserBookSales from './screens/UserBookSales';
import UserBookOffers from './screens/UserBookOffers';
import CreateBookSale from './screens/CreateBookSale';
import Profile from './screens/Profile';
import Home from './screens/Home';
import BookSaleDetails from './screens/BookSaleDetails';
import ReviewList from './screens/ReviewList';

const Stack = createNativeStackNavigator();

export default function App() {
  
  return (
    <AuthProvider>
      <NavigationContainer>
        <AuthContext.Consumer> 
          {({state}) => (
            <Stack.Navigator>
              {state.userToken === null ? (
                <>
                    <Stack.Screen name="StartScreen" component={StartScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
                    <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
                </>
              ) : (
                <>
                    <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                    <Stack.Screen name="Perfil" component={Profile} />
                    <Stack.Screen name="Detalles de venta" component={BookSaleDetails} />
                    <Stack.Screen name="Ventas" component={UserBookSales} options={{ headerShown: false }} />
                    <Stack.Screen name="Pedidos" component={UserBookOffers} options={{ headerShown: false }} />
                    <Stack.Screen name="Reseñas" component={ReviewList} />
                    <Stack.Screen name="Crear venta nueva" component={CreateBookSale} />
                </>
              )}
            </Stack.Navigator>
          )}
        </AuthContext.Consumer>
      </NavigationContainer>
    </AuthProvider>
  );
}

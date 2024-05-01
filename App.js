import { SafeAreaView, StyleSheet, View } from 'react-native';

// or any files within the Snack
import StartScreen from './screens/StartScreen';
import SignUp from './screens/SignUp';
import SignIn from './screens/SignIn';
import UserBookSales from './screens/UserBookSales';
import CreateBookSale from './screens/CreateBookSale';
import Profile from './screens/Profile';

export default function App() {
  return (
    <View style={styles.container}>
      <Profile />
    </View>
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
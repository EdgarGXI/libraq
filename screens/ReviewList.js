import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView
} from 'react-native';

import Review from '../components/Review';
import { Colors } from '../constants/theme';

export default function ReviewList({route}) {
  const { booksaleid } = route.params;
  // se fetchean las reviews que NO sean response (response==-1), orderby date desde la más reciente
  return (
    <View style={styles.view0}>
      <SafeAreaView style={{ width: '100%', flex: 1 }}>
        
         <ScrollView style={{ alignItems: 'center' }}>
          <View 
            style={{
              alignItems: 'center', 
              gap: 15, 
              width: '90%', 
              paddingTop: 20, 
              paddingBottom: 40,
            }}
          >
            <Review 
              reviewID={1}
              accountID={222}
              date='6 may 2024'
              content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
            />
            <Review 
              reviewID={2}
              accountID={555}
              date='10 oct 2023'
              content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
            />
          </View>
        </ScrollView>

      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  view0: {
    backgroundColor: Colors.accent,
    height: '100%',
    width: '100%',
  },
});

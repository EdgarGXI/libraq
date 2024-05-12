import * as SecureStore from 'expo-secure-store';
import { useEffect, useContext, createContext, useReducer } from 'react';
import { AsyncStorage } from 'react-native';

import { fetchByColumn, insertRow } from './db';

export const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            userName: action.name,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            userName: action.name,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            userName: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      userName: null,
    }
  );

  const signIn = async (email, password) => { 
    // fetches account data for email if it exists
    let acc = await fetchByColumn('account', 'email', email);
    // if email is already in use => check if password matches
    if (acc.length>0 && (password === acc[0]['password'])) {
      try {
        userToken = await SecureStore.setItemAsync('userToken', acc[0]['accountid'].toString());
        userName = await SecureStore.setItemAsync('userName', acc[0]['name']);
      } catch (e) {
        console.log(e);
        console.log('(setting tokens failed)')
      }
      dispatch({ type: 'SIGN_IN', token: acc[0]['accountid'], name: acc[0]['name'] }); // sign user in --> auto navigate home
    } else { // else: error: email or password incorrect
      throw 'Email or password incorrect';
    }
  }
  
  const signOut = () => dispatch({ type: 'SIGN_OUT' });

  const signUp = async (userData) => {
    await insertRow(
      'account',
      {
        name: userData['name'],
        lastname: userData['lastname'],
        email: userData['email'],
        password: userData['password'],
        bio: userData['bio'],
        dpt: userData['dpt'],
        city: userData['city'],
        postcode: userData['postcode'],
        address: userData['address'],
      },
    );
    let acc = await fetchByColumn('account', 'email', userData['email']);
    dispatch({ type: 'SIGN_IN', token: acc[0]['accountid'], name: acc[0]['name']}); // sign user in --> auto navigate home
  }

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
        signIn,
        signOut,
        signUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('useAuthContext should be used within a AuthContextProvider');
  return context;
}
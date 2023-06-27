import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, componentDidMount, BackHandler, useEffect} from 'react-native';
import Login from './src/views/Login';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './src/components/AuthStack';
import { AuthProvider } from './src/context/AuthContext';
import { hideNavigationBar } from 'react-native-navigation-bar-color';

export default function App() {

  

  return (
    <AuthProvider>
      <NavigationContainer>
        <AuthStack></AuthStack>
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

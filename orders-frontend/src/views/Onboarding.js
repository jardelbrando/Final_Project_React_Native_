import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useCallback } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, TouchableOpacity } from 'react-native';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';


const Onboarding = ({navigation}) => {

    const [fontsLoaded] = useFonts({
        'Pacifico-Regular': require('../assets/fonts/Pacifico-Regular.ttf'),
      });

    const onLayoutRootView = useCallback(async () => {
            if (fontsLoaded) {
                await SplashScreen.hideAsync();
            }
        }, [fontsLoaded]);

        if (!fontsLoaded) {
        return null;
    }

    return(
        <View style = {styles.container} onLayout={onLayoutRootView}>
            <Text style={styles.logo_title}>Bon appetit</Text>
            <Image style = {styles.logo} source={require('../assets/images/logo.png')}/>
            <TouchableOpacity style = {styles.button}onPress={() => {navigation.navigate('Login');}}>
                <Text style={styles.text}>Acessar</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Onboarding;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#c93e22',
    },

    logo_title:{
        fontSize: 40,
        fontFamily: 'Pacifico-Regular',
        fontWeight: 'bold',
        marginBottom: 40,
        color: 'white'
    },

    logo: {
        width: 500,
        height: 500,
        backgroundColor: 'white',
        borderRadius: 500
    },

    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ede73b',
        borderRadius: 20,
        marginTop: 40,
        height: 50,
        width: 300,
    },

    text: {
        fontSize: 20,
        fontFamily: 'notoserif',
        fontWeight: 'bold'
    }
})
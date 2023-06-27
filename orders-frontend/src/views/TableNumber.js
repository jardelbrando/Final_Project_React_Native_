import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useCallback, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, TouchableOpacity, BackHandler } from 'react-native';
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useAuth } from '../context/AuthContext';
import { Icon } from '@rneui/themed';


const Onboarding = ({navigation}) => {

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
        return () => backHandler.remove()
      }, [])

    const {
        authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn,
        orders,
        setOrders,
        tableNumber,
        setTableNumber} = useAuth();

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

    const checkTableNumber = () => {
        if(tableNumber > 0 && tableNumber < 16){  
            navigation.navigate('DrawerScreens');
        }      
    }

    const minusTableNumber = ()=> {
        if(tableNumber != 0){
            setTableNumber(tableNumber-1)
        }
    }

    const addTableNumber = ()=> {
        if(tableNumber < 10){
            setTableNumber(tableNumber+1)
        }
    }
    

    return(
        <View style = {styles.container} onLayout={onLayoutRootView}>
            <Text style={styles.logo_title}>Bon appetit</Text>
            <View style={[{flexDirection:'row', marginTop: 5}]}> 
                <View style={styles.orderButton}>
                    <Text style={styles.orderButtonText}>Insira o número da mesa: </Text>
                </View>   
                <View style={styles.orderNumber}>
                    <TouchableOpacity style={[styles.quantityButtons, {marginRight: 20}]} onPress={minusTableNumber}>
                        <Icon name='horizontal-rule' color='white' size={40} />
                    </TouchableOpacity>
                    <Text style={styles.quantityButtons}>{tableNumber}</Text>
                    <TouchableOpacity style={[styles.quantityButtons, {marginLeft: 20}]} onPress={addTableNumber}>
                        <Icon name='add' color='white' size={40}/>
                    </TouchableOpacity>
                </View>                 
            </View>
            <TouchableOpacity style = {styles.button}onPress={checkTableNumber}>
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

    quantityButtons: {
        fontSize: 30,
        color: 'white'
    },

    tableNumberInput: {
        paddingLeft: 30,
        width: 300,
        height: 50,
        borderRadius: 5,
        backgroundColor: 'white'
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
    },

    orderNumber:{
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#c93e22'
    },

    orderButton:{
        width: 200,
        backgroundColor: '#c93e22',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        marginRight: 20
    },

    orderButtonText:{
        color: 'white', 
        fontSize: 15,
        fontWeight: 'bold',
        borderRadius: 10, 
    },
})
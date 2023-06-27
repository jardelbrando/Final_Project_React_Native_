import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, Text, View, TextInput, Button, TouchableOpacity, BackHandler} from 'react-native';
import InputComponent from '../components/InputComponent';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Login = ({navigation}) => {

    const [email, setEmail] = useState(0);
    const [password, setPassword] = useState(0);
    
    
    
    const {
        authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn} = useAuth();
    
    

    const login = async() =>{
        try{
            const response = await axios.post(`http://192.168.15.50:8080/tokens`, {email: email, password: password});
           
            setIsLoggedIn(true);
            setAuthUser(response.data.token)
            navigation.navigate('TableNumber');
            BackHandler.addEventListener('hardwareBackPress', false);
            
        }catch (error){
            console.log(error);
            return(
                <View>
                    <span>Email ou senha incorretos</span>
                </View>
            )
        }

    }

    

    return(
        <View style= {styles.container}>
            <ImageBackground style= {styles.imageBack} source={require('../assets/images/restaurant.jpg')}>
                <Text style={styles.title}>Login</Text>
                <TextInput style = {styles.input} onChangeText={newEmail => setEmail(newEmail)} placeholder='Digite o email'></TextInput>
                <TextInput secureTextEntry={true} onChangeText={newPassword => setPassword(newPassword)} style = {styles.input} placeholder='Digite sua senha'></TextInput>
                <TouchableOpacity style={styles.button} onPress={login} title='Entrar'>
                    <Text style={styles.text}>Login</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    )
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#c93e22',
    },

    imageBack:{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    title:{
        fontSize: 40,
        fontFamily: 'monospace',
        fontWeight: 900,
        marginBottom: 40,
        color: 'white'
    },

    input: {
        backgroundColor: 'white',
        width: '80%',
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20,
        marginBottom: 20,
        fontSize: 16
    },

    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ede73b',
        borderRadius: 5,
        marginTop: 20,
        height: 50,
        width: '80%',
    },

    text: {
        fontSize: 20,
        fontFamily: 'notoserif',
        fontWeight: 'bold'
    }
})
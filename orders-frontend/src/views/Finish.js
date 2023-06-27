import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity, BackHandler, Alert, SafeAreaView, FlatList} from 'react-native';
import InputComponent from '../components/InputComponent';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@rneui/themed';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { TextInput } from 'react-native-gesture-handler';



const Finish = ({navigation, route}) => {

    const [list, setList] = useState(0);
    const [cont, setCont] = useState(0);
    const [emailFinish, setEmailFinish] = useState(0);
    const [passwordFinish, setPassordFinish] = useState(0);
    
    

    const {
        authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn,
        orders,
        setOrders,
        tableNumber,
        setTableNumber,
        total,
        setTotal} = useAuth();

    const isFocused = useIsFocused();
    useEffect(() => {
        fetchDishes();
        teste();
        }, [isFocused])

    const fetchDishes = async () => {
        try{
            const response = await axios.get(`http://192.168.15.50:8080/dishes`)
            setList(response.data);
        }catch(error){
            console.log(error);
        }
    
    }

    const teste = () => {
        let subtotal = 0;
        for(let k = 0; k < list.length; k++){
            for(let i = 0; i < orders.length; i++){
                if(orders[i].disheId == list[k].id){
                    subtotal = subtotal + (parseFloat(orders[i].quantity) * parseFloat(list[k].price))
                }
               
            }
        }
        console.log(subtotal);
        setCont(subtotal);
    }

    const findPrice = (id, quantity) => {
        let subtotal = 0;
        for(let k = 0; k < list.length; k++){
           
            if(id == list[k].id){
                subtotal = list[k].price
                
            }   
            
        }
        return subtotal;
    }

    const findName =  (id) =>{
        let name
        for(let k = 0; k < list.length; k++){
           
            if(id == list[k].id){
                name = list[k].name
            }   
            
        }
        return name
    }

    const findAvatar =  (id) =>{
        let avatar
        for(let k = 0; k < list.length; k++){
           
            if(id == list[k].id){
                avatar = list[k].avatar_url
            }   
            
        }
        return avatar
    }

    const logout = async() =>{
        console.log(passwordFinish);
        console.log(authUser);
        
        
            console.log('oi');
            try{
                const response = await axios.post(`http://192.168.15.50:8080/tokens`, {email: emailFinish, password: passwordFinish});
                setIsLoggedIn(false);
                setAuthUser(null);
                setOrders(0);
                setTableNumber(0);
                navigation.navigate('Onboarding');                
            }catch (error){
                console.log(error);
                return(
                    <View>
                        <span>Email ou senha incorretos</span>
                    </View>
                )
            }
    
    }

    

    const Item = ({name, avatar_url, id, price, quantity}) => (

        <TouchableOpacity onPress={()=> {navigation.navigate('Card', {
            id: id, 
            name: name,
            avatar_url: avatar_url,
            price: price,
            quantity,
            })}}>
            <View style={styles.item}>
                <View style={styles.itemText}>
                    <Text style={styles.text}>{name}</Text>
                </View>       
                <Text style={styles.text_preco}>R$ {price} x {parseInt(quantity)} = {parseFloat(price)*parseInt(quantity)}</Text>
                <Image style={styles.item_image} source={{uri:(avatar_url)}}/>
            </View>
        </TouchableOpacity>
      );
  
    return (
        <View style={styles.card}>
            <View style={styles.topBar}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                            <Icon name='arrow-back' color="white"/>
                </TouchableOpacity>
                <Image style = {styles.logo} source={require('../assets/images/logo.png')}/>
                <Text style = {styles.topBarText}>Bon Appetit</Text>
            </View>
            <View>
                <SafeAreaView style={styles.container}>
                    <FlatList
                        extraData={this.cont}
                        data={orders}
                        renderItem={({item})=> <Item id={item.disheId} name={findName(item.disheId)} quantity={item.quantity} avatar_url={findAvatar(item.disheId)} price={findPrice(item.disheId, item.quantity)}/>}
                        keyExtractor={item => item.id}
                        style = {{width: '100%'}}
                    
                        />
                    <Text style={[styles.title, {fontWeight: 'bold'}]}>Total: R$ {parseFloat(total).toFixed(2)}</Text>
                    <TextInput style = {[styles.input, {marginTop: 20}]} secureTextEntry={false} onChangeText={newEmail => setEmailFinish(newEmail)} placeholderTextColor='white' placeholder='Digite o email de funcionário'></TextInput>
                    <TextInput secureTextEntry={true} onChangeText={newPassword => setPassordFinish(newPassword)} style = {styles.input}  placeholderTextColor='white' placeholder='Digite a senha de funcionário'></TextInput>
                    <TouchableOpacity onPress={logout} style={styles.button}>
                        <Text style={styles.text_button}>Encerrar</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </View>
            
        </View>
    );
}

export default Finish;

const styles = StyleSheet.create({

    card: {
        flex: 1,
        flexDirection: 'column',
        
    },

    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#c93e22',
        borderRadius: 5,
        height: 50,
        width: 300,
    },

    text_button: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white'
    },

    input: {
        backgroundColor: '#c98375',
        color: 'white',
        width: 300,
        height: 35,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20,
        marginBottom: 20,
        fontSize: 16
    },

    container:{ 
        width: '100%',
        height: '90%',
        alignItems: 'center', 
        justifyContent: 'space-around' ,
    },

    title:{
        fontSize: 25,
        fontWeight: 300
    },

    description:{
        marginTop: 20,
        fontSize: 16,
        textAlign: 'left'
    },


    buttons:{
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
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
        fontWeight: 400,
        borderRadius: 10, 
    },

    item_image:{
        width: 350,
        height: 300,
        borderRadius: 20
    },

    topBar: {
        height: 100, 
        width: '100%',
        backgroundColor: '#c93e22',
        alignItems: 'flex-end',
        flexDirection: 'row'
    },

    topBarText:{
        marginLeft: 20,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 20
    },  

    logo: {
        width: 50,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 100,
        marginLeft: 20,
        marginBottom: 20
    },
     
    backButton: {
        width: 50,
        height: 50,
        borderWidth: 3,
        borderColor: 'white',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 20,
        marginBottom: 20
    },

    quantityButtons: {
        fontSize: 30,
        
    },

    item: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'black',
        width: '100%',
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingRight: 20,
        paddingLeft: 20,
        marginTop: 5
    },

    itemText: {
        width: 200
    },

    item_image: {
        marginRight: 20,
        width: 50,
        height: 50,
        borderRadius: 50
    },

    text_preco:{
        marginRight: 20
    }
})
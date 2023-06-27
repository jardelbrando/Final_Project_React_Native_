import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity, BackHandler, Alert} from 'react-native';
import InputComponent from '../components/InputComponent';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@rneui/themed';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Card = ({navigation, route}) => {

    const[quantity, setQuantity] = useState(0);
    
    const object = route.params;
   
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

    const minusQuantity = ()=> {
        if(quantity != 0){
            setQuantity(quantity-1)
        }
    }

    const addQuantity = ()=> {
        if(quantity < 10){
            setQuantity(quantity+1)
        }
    }

    const order = async () => {
        if(quantity > 0){
            try{

                const orderObject = {
                    tableNumber: tableNumber,
                    disheId: object.id,
                    quantity: quantity
                }
                if(orders == 0){
                    setOrders([orderObject])
                }else{
                    let listOrders = orders
                    listOrders.push(orderObject)
                    setOrders(listOrders)
                }
               
                const response = await axios.post(`http://192.168.15.50:8080/orders`, 
                {
                    "tableNumber": parseInt(tableNumber),
                    "disheId": parseInt(object.id), 
                    "quantity": parseInt(quantity), 
                    "observation": "nenhuma"
                });
                Alert.alert("Pedido Realizado" ,"Seu pedido foi encaminhado para a cozinha!");
                setTotal(total + object.price * quantity);
                navigation.goBack();

            }catch(error){
                console.log(error);
            }
        }    
    
    }
    
    return (
        <View style={styles.card}>
            <View style={styles.topBar}>
                <Image style = {styles.logo} source={require('../assets/images/logo.png')}/>
                <Text style = {styles.topBarText}>Bon Appetit</Text>
            </View>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Icon name='arrow-back'/>
                    </TouchableOpacity>

                    <Text style={styles.title}>{object.name}</Text>
                </View>
                <Image style={styles.item_image} source={{uri: object.avatar_url}}></Image>
                <Text style={[styles.title, {fontWeight: 'bold'}]}>R$ {parseFloat(object.price).toFixed(2)}</Text>
                <View>
                    <Text style={[styles.title, {fontWeight: 'bold'}]}>Descrição:</Text>
                    <Text style={styles.description}>{object.description}</Text>
                </View>
                <View style={styles.buttons}>
                    <View style={[{flexDirection:'row'}]}> 
                        <View style={styles.orderButton}>
                            <Text style={styles.orderButtonText}>Número da mesa</Text>
                        </View>   
                        <View style={styles.orderNumber}>
                            <Text style={[styles.quantityButtons , {paddingLeft: 45, paddingRight: 45}]}>{tableNumber}</Text>
                        </View>  
                    </View>
                    <View style={[{flexDirection:'row', marginTop: 5}]}> 
                        <View style={styles.orderButton}>
                            <Text style={styles.orderButtonText}>Quantidade desejada</Text>
                        </View>   
                        <View style={styles.orderNumber}>
                            <TouchableOpacity style={[styles.quantityButtons, {marginRight: 20}]} onPress={minusQuantity}>
                                <Icon name='horizontal-rule' />
                            </TouchableOpacity>
                            <Text style={styles.quantityButtons}>{quantity}</Text>
                            <TouchableOpacity style={[styles.quantityButtons, {marginLeft: 20}]} onPress={addQuantity}>
                                <Icon name='add' />
                            </TouchableOpacity>
                        </View>                 
                    </View>
                    
                </View>
                <TouchableOpacity onPress={order} style={[styles.orderButton, {width: 325, marginRight: 0}]}>
                    <Text style={styles.orderButtonText}>Pedir</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    );
}

export default Card;

const styles = StyleSheet.create({

    card: {
        flex: 1,
    },

    container:{
        height: '85%', 
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'center', 
        justifyContent: 'space-around' 
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
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 20
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginLeft: 20
    },

    quantityButtons: {
        fontSize: 30,
    }
})
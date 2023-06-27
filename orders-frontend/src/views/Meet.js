import { StatusBar } from 'expo-status-bar';
import React ,{useState, useEffect} from 'react';
import {Image,  StyleSheet, Text, View, TextInput, Button, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import InputComponent from '../components/InputComponent';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import axios from 'axios';

const Meet = ({navigation}) =>{

    const [list, setList] = useState(0);

    useEffect(() => {
        fetchDishes();
      }, [])

    const fetchDishes = async () => {
        try{
            const response = await axios.get(`http://192.168.15.50:8080/dishes/meet`)
            setList(response.data);
        }catch(error){
            console.log(error);
        }
    
    }

    const Item = ({name, avatar_url, id, description, category, price}) => (
        <TouchableOpacity onPress={()=> {navigation.navigate('Card', {
            id: id, 
            name: name,
            avatar_url: avatar_url,
            description: description,
            category: category,
            price: price})}}>
            <View style={styles.item}>
                <View style={styles.itemText}>
                    <Text style={styles.text}>{name}</Text>
                    <Text style={styles.text_subtitle}>{description}</Text>
                </View>       
                <Text style={styles.text}>R$ {price}</Text>
                <Image style={styles.item_image} source={{uri: avatar_url}}/>
            
            </View>
        </TouchableOpacity>
      );

      return(
        <SafeAreaView style={styles.container}>
            <FlatList
                data={list}
                renderItem={({item})=> <Item name={item.name} avatar_url={item.avatar_url} id={item.id} description={item.description} category={item.category} price={item.price}/>}
                keyExtractor={item => item.id}
                style = {{width: '100%'}}
            
                />
        </SafeAreaView>
    )
}

export default Meet;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
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
        fontWeight: 'bold',
        color: 'black'
    },

    text_subtitle: {
        fontSize: 14
    },

    item: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'black',
        width: '100%',
        height: 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 20,
        paddingLeft: 20,
        marginTop: 5
    },

    itemText: {
        width: 200
    },

    item_image: {
        width: 50,
        height: 50,
        borderRadius: 50
    }
})
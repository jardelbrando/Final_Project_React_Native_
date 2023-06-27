import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

export default props => {
    return(
        <View style = {styles.container}>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 40,
        backgroundColor: '#EEE',
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },

    icon: {
        color: '#333',
        marginLeft: 20
    },

    input: {
        marginLeft: 20,
        width: '70%'
    }
})
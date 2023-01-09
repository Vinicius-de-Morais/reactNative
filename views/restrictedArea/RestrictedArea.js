import React, {useState, useEffect, useReducer} from 'react';
import {Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RestrictedArea(){

    const [user, setUser] = useState(null);

    useEffect(()=>{
        async function getUser(){
            let response = await AsyncStorage.getItem('userData');
            let json = JSON.parse(response);
            setUser(json.name);
        }
        getUser()
    })

    return(
        <View>
            <Text>Area restrita</Text>
            <Text>Seja bem vindo {user}</Text>
        </View>
    )
}
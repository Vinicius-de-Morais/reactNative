import React, {useState, useEffect, useReducer} from 'react';
import {Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

import config from "../../config/config.json"
import {css} from '../../assets/css/Css'
import MenuArea from '../../assets/component/MenuArea';

export default function Profile({navigation}){

    // create all const that will be used
    const [userName, setUserName] = useState(null);
    const [idUser, setIdUser] = useState(null);
    const [oldPassword, setOldPassword] = useState (null);
    const [newPassword, setNewPassword] = useState (null);
    const [confNewPassword, setConfNewPassword] = useState (null);
    const [message, setMessage] = useState (null);
    
    useEffect(()=>{
        // get id of the logged user
        async function getUserId(){
            let response = await AsyncStorage.getItem('userData');
            let json=JSON.parse(response);
            setIdUser(json.id);
        }
        getUserId();

        // get name of the logged user
        async function getUserName(){
            let response = await AsyncStorage.getItem('userData');
            let json = JSON.parse(response);
            setUserName(json.name);
        }
        getUserName();
    })

    async function sendForm(){

        // verify if the passwords are equal to make the change
        if(newPassword == confNewPassword){    
            let response= await fetch(`${config.UrlRoot}verifyPass`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: idUser,
                    oldPassword: oldPassword,
                    newPassword: newPassword,
                })
            }).catch(error => console.log(error));

            let json = await response.json()
            setMessage(json)
        }else{
            setMessage('Nova senha e a confirmacao de senha nao conferem');
        }
        
    }
    
    return(
        <View style={[css.container, css.containerTop]}>
            <MenuArea title='Profile' navigation={navigation}/>
            <Text>Ola, {userName}!</Text>
            <View>
                <Text>{message}</Text>
                <TextInput placeholder='Senha Antiga' onChangeText={(text)=> setOldPassword(text)} />
                <TextInput placeholder='Nova Senha:' onChangeText={(text)=> setNewPassword(text)} />
                <TextInput placeholder='Confirmar nova senha' onChangeText={(text)=> setConfNewPassword(text)} />

                <TouchableOpacity onPress={()=>sendForm()}>
                    <Text>Trocar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
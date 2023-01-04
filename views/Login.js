//import { response } from 'express';
import React, {useState, useEffect} from 'react';
import {Text, View, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, Platform } from 'react-native';

import { css } from '../assets/css/Css';

export default function Login(props){

    const [displayMessage, setDisplayMessage] = useState('none');
    const [user, setUser] = useState(null);
    const [password, setPassword] = useState(null);
    const [login, setLogin] = useState(null);
    
    // send login form
    async function sendForm(){
        console.log('clicado')
        
        await fetch('http://192.168.0.144:3000/login', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: "user",
              password: "password",
            }),
            
        })
        .catch(error => console.log(error));
        
    }

    return(
        <KeyboardAvoidingView 
            behavior={Platform.OS == 'ios' ? "padding ": 'height'}
            style={[css.container, css.darkbg]}
        >
            {/* logo */}
            <View>
                <Image style={css.login__logo}source={require('../assets/img/logo.png')} />
                <Text>{user} - {password}</Text>
            </View>
                <Text style={css.login__msg(displayMessage)}>User or password incorrect</Text>
            
            {/* inputs */}
            <View style={css.login__form}>
                <TextInput style={css.login__input} placeholder='User' onChangeText={text=>setUser(text)}/>
                <TextInput style={css.login__input} placeholder='Password' 
                    secureTextEntry={true} onChangeText={text=>setPassword(text)}
                />
                <TouchableOpacity style={css.login__button} onPress={()=> sendForm()}>
                    <Text style={css.login__buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}
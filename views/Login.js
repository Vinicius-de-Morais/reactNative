import React, {useState, useEffect} from 'react';
import {Text, View, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { css } from '../assets/css/Css';

export default function Login({navigation}){

    // set the states that will be used in log screen
    const [displayMessage, setDisplayMessage] = useState('none');
    const [user, setUser] = useState(null);
    const [password, setPassword] = useState(null);
    const [login, setLogin] = useState(null);
    
    // send login form
    async function sendForm(){
        console.log('clicado')
        
        // send the user and passwd to see if match with the database
        let response = await fetch('http://192.168.0.144:3000/login', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: user,
              password: password,
            }),
            
        })
        .catch(error => console.log(error));

        let json = await response.json();
        
        // here we display if the user and passwd is working 
        if(json == "error"){
            setDisplayMessage('flex');
            setTimeout(()=>{
                setDisplayMessage('none');
            }, 3000)
            await AsyncStorage.clear();
        }else{
            // if it works will be redirected to another view
            let userData = await AsyncStorage.setItem('userData', JSON.stringify(json));
            navigation.navigate('RestrictedArea')
        }

        //console.log(json)
    }

    // The components of the view
    return(
        <KeyboardAvoidingView 
            behavior={Platform.OS == 'ios' ? "padding ": 'height'}
            style={[css.container, css.darkbg]}
        >
            {/* logo */}
            <View>
                <Image style={css.login__logo}source={require('../assets/img/logo.png')} />
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
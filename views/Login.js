import React, {useState, useEffect} from 'react';
import {Text, View, KeyboardAvoidingView, Image, TextInput, TouchableOpacity, Platform } from 'react-native';

import { css } from '../assets/css/Css';

export default function Login(props){

    const [displayMessage, setDisplayMessage] = useState('none');
    
    return(
        <KeyboardAvoidingView 
            behavior={Platform.OS == 'ios' ? "padding ": 'height'}
            style={[css.container, css.darkbg]}
        >
            <View>
                <Image style={css.login__logo}source={require('../assets/img/logo.png')} />
            </View>
                <Text style={css.login__msg(displayMessage)}>User or password incorrect</Text>
            <View style={css.login__form}>
                <TextInput style={css.login__input} placeholder='User'/>
                <TextInput style={css.login__input}placeholder='Password' secureTextEntry={true}/>
                <TouchableOpacity style={css.login__button} onPress={()=> setDisplayMessage('flex')}>
                    <Text style={css.login__buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}
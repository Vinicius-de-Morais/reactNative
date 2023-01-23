import React, {useState, useEffect} from 'react';
import {Text, View, Image, Button,TextInput, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

import {css} from '../../assets/css/Css'
import MenuArea from '../../assets/component/MenuArea';
import config from '../../config/config.json'

export default function RegisterCar({navigation}){

    const address = config.origin;
    const [code, setCode] = useState(null);
    const [user, setUser] = useState(null);
    const [car, setCar] = useState(null);
    const [response, setResponse] = useState(null);
    const [displayMessage, setDisplayMessage] = useState('none');
    
    // every time the message is displayed after 5 seconds e hide it
    useEffect(()=>{
        setTimeout(()=>{
            setDisplayMessage('none');
        }, 5000)
    }, [displayMessage])
    
    // on page load get the user ID
    useEffect(()=>{
        getUserId();
    }, [])

    // set an new random code every time the response change
    useEffect(()=>{
        randomCode();
        setCar(null)
    }, [response])

    // get the user id
    async function getUserId(){
        let response = await AsyncStorage.getItem('userData');
        let json = JSON.parse(response);
        setUser(json.id);
    }

    // generate and random coded
    async function randomCode(){
        let result = 'BR-';
        let length = 20;
        let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for( let i = length; i > 0; i--){ 
            result += chars[Math.floor(Math.random() * chars.length)];
        }
        setCode(result)
    }  

    // send form data
    async function sendForm(){
        let response= await fetch(`${config.UrlRoot}create`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: user,
                code: code,
                car: car,
                address: address
            })
        }).catch(error => console.log(error));

        let json = await response.json();
        setResponse(json);
    }

    // share the QRcode
    async function shareQr(){
        const image = config.UrlRoot+'img/code.png';
        FileSystem.downloadAsync(
            image,
            FileSystem.documentDirectory+'code.png'
        ).then(({uri})=>{
            Sharing.shareAsync(uri);
        });

        await Sharing.shareAsync()
    }

    return(
        <View style={[css.container, css.containerTop]}>
            <MenuArea title='Register' navigation={navigation}/>
            <Text>Registrar novo Carro</Text>
            <View style={css.login__input}>
                <TextInput 
                    placeholder='Nome do carro' 
                    onChangeText={(text)=> setCar(text)}
                    value={car}
                />                
            </View>
            <Text style={{
                    color: 'green',
                    display: displayMessage
                }}
            >
                Cadastro feito com sucesso
            </Text>
            
            <TouchableOpacity style={css.login__button} onPress={()=>{setDisplayMessage('flex'); sendForm()}}> 
                <Text>Cadastrar</Text>
            </TouchableOpacity>

            {response &&(
                <View>
                    <Image source={{uri: response, height:180, width: 180}}/>
                    <Button title='Compartilhar' onPress={()=> shareQr()}></Button>
                </View>
            )

            }
        </View>   
    )
}
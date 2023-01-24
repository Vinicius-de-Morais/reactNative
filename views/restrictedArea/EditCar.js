import React, {useState, useEffect, useReducer} from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BarCodeScanner} from 'expo-barcode-scanner';

import {css} from '../../assets/css/Css'
import MenuArea from '../../assets/component/MenuArea';
import config from "../../config/config.json"


export default function EditCar({navigation}){
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [displayQR, setDisplayQR] = useState('flex');
    const [displayForm, setDisplayForm] = useState('none');
    const [code, setCode] = useState(null);
    const [car, setCar] = useState(null);
    const [localization, setLocalization] = useState(null);

    // request the permission to use the camera
    useEffect(()=>{
        (async ()=>{
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted')
        }) ();
    }, []);
    
    // read qr code
    async function handleBarCodeScanned({ type, data}){
        setScanned(true);
        setDisplayQR('none');
        setDisplayForm('flex');
        setCode(data)
        searchCar(data)
    };
    
    // get the car in the backend
    async function searchCar(carCode){
        let response = await fetch(`${config.UrlRoot}searchCar`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                code: carCode,
            })
        }).catch(error => console.log(error));

        let json = await response.json();
        setCar(json.Cars[0].name);
    }

    async function sendForm(){

    }

    return(
        <View style={[css.container, css.containerTop]}>
            <MenuArea title='Edit' navigation={navigation}/>

            <BarCodeScanner 
                onBarCodeScanned={scanned ? undefined : (value)=>handleBarCodeScanned(value)}
                style={css.qr__code(displayQR)}
            />
            <Text>Código do carro: {code}</Text>
            <View style={css.qr__form(displayForm)}>
                <View style={css.login__input}>
                    <TextInput 
                        placeholder='Nome do carro' 
                        onChangeText={(text)=> setCar(text)}
                        value={car}
                    />                
                </View>
            </View>
            <View style={css.qr__form(displayForm)}>
                <View style={css.login__input}>
                    <TextInput 
                        placeholder='Localização do carro' 
                        onChangeText={(text)=> setLocalization(text)}
                        value={localization}
                    />                
                </View>
            </View>

            <TouchableOpacity style={css.login__button} onPress={()=>{sendForm()}}> 
                <Text>Atualizar</Text>
            </TouchableOpacity>

        </View>
    )
}
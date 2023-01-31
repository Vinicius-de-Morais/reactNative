import React, {useState, useEffect, useReducer} from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BarCodeScanner} from 'expo-barcode-scanner';
import * as Location from 'expo-location';
import Geocoder from 'react-native-geocoding';

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
    const [messageResponse, setMessageResponse] = useState(null);

    // request the permission to use the camera
    useEffect(()=>{
        (async ()=>{
            const {status} = await Location.requestForegroundPermissionsAsync();
            if(status !== 'granted'){
                setErrorMsg('Permisson to location was denied')
            }


        }) ();
    }, []);
    
    // request the permition to get the location
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
        setCode(data);
        await getLocation();
        await searchCar(data);
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

    // get the user adress
    async function getLocation(){
        // get the location, but just the latitude and longitude
        let location = await Location.getCurrentPositionAsync({});
        Geocoder.init(config.geocodingAPI)
        Geocoder.from(location.coords.latitude, location.coords.longitude)
            .then(json =>{
                let addressComponent = json.results[0].formatted_address
                setLocalization(addressComponent)
            })
    }
    
    //read the QRcode again
    async function readAgain(){
        setScanned(false);
        setDisplayForm('none');
        setDisplayQR('flex');
        setCode(null);
        setCar(null)
        setLocalization(null)
    }

    // make the update of the car
    async function sendForm(){
        let response = await fetch(`${config.UrlRoot}update`,{
            method: 'POST',
            headers:{
                Accept: 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                code: code,
                car: car,
                local: localization
            })
        }).catch(error => console.log(error));

        let json = await response.json();

        setMessageResponse(json)
    }

    return(
        <View style={[css.container, css.containerTop]}>
            <MenuArea title='Edit' navigation={navigation}/>

            <BarCodeScanner 
                onBarCodeScanned={scanned ? undefined : (value)=>handleBarCodeScanned(value)}
                style={css.qr__code(displayQR)}
            />
            <Text style={{color: 'green'}}>{messageResponse}</Text>
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

            {scanned &&
                <View>
                    <TouchableOpacity style={css.login__button} onPress={()=>{readAgain()}}> 
                        <Text>Scanear Novamente</Text>
                    </TouchableOpacity>
                </View>

            }

        </View>
    )
}
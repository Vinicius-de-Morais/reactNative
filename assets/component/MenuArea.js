import React from "react";
import {Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

import {css} from '../../assets/css/Css'

export default function MenuArea(props){

    async function logout(){
        await AsyncStorage.clear();
        props.navigation.navigate('Login');
    }

    return(
        <View style={css.area__menu}>
            <TouchableOpacity style={css.button__home} onPress={()=>props.navigation.navigate('Home')}>
                <Icon name='home' size={30} color='#333'/>
            </TouchableOpacity>

            <Text style={css.area__title}>{props.title}</Text>

            <TouchableOpacity style={css.button__logout} onPress={()=>logout()}>
                <Icon name='sign-out' size={30} color='#333'/>
            </TouchableOpacity>
        </View>
    )
}
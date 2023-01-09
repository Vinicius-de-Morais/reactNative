import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, Image } from 'react-native';

import {css} from '../assets/css/Css'

export default function Home({navigation}){

    // The components of the view
    return(
        <View style={css.containerHome}>
            
            {/* login button */}
            <TouchableOpacity
                onPress={() => navigation.navigate('Login', { id: 30 })}
            >
                <Image
                    style={css.button_Home}
                    source={require('../assets/img/buttonLogin.png')}
                />
            </TouchableOpacity>

            {/* tracking button */}
            <TouchableOpacity
                onPress={() => navigation.navigate('Tracking')}
            >
                <Image
                style={css.button_Home}
                    source={require('../assets/img/buttonTrack.png')}
                />
            </TouchableOpacity>
        </View>
    )
}
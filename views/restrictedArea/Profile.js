import React, {useState, useEffect, useReducer} from 'react';
import {Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

import {css} from '../../assets/css/Css'
import MenuArea from '../../assets/component/MenuArea';

export default function Profile({navigation}){

    return(
        <View style={[css.container, css.containerTop]}>
            <MenuArea title='Profile' navigation={navigation}/>
        </View>
    )
}
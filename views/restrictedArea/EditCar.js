import React, {useState, useEffect, useReducer} from 'react';
import {Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {css} from '../../assets/css/Css'
import MenuArea from '../../assets/component/MenuArea';

export default function EditCar({navigation}){

    return(
        <View style={[css.container, css.containerTop]}>
            <MenuArea title='Edit' navigation={navigation}/>
        </View>
    )
}
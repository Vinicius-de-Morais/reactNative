import React, {useState, useEffect, useReducer} from 'react';
import {Text, View } from 'react-native';
import {css} from '../../assets/css/Css';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

// import views for the bottomtab
import {Profile, RegisterCar, EditCar} from '../index';

export default function RestrictedArea(){

    const [user, setUser] = useState(null);
    const Tab = createMaterialBottomTabNavigator();
    useEffect(()=>{
        async function getUser(){
            let response = await AsyncStorage.getItem('userData');
            let json = JSON.parse(response);
            setUser(json.name);
        }
        getUser()
    })

    return(

        <Tab.Navigator
            initialRouteName='Profile'
            activeColor='#b2b4b7'
            inactiveColor='#fff'
            barStyle={css.area__tab}
        >
            <Tab.Screen 
                name="Profile" 
                component={Profile}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon:()=>(
                        <Icon name="users" size={20} color="#333" />
                    )
                }}
            />
            <Tab.Screen 
                name="RegisterCar" 
                component={RegisterCar}
                options={{
                    tabBarLabel: 'Register',
                    tabBarIcon:()=>(
                        <Icon name="archive" size={20} color="#333" />
                    )
                }}
            />
            <Tab.Screen 
                name="EditCar" 
                component={EditCar}
                options={{
                    tabBarLabel: 'Edit',
                    tabBarIcon:()=>(
                        <Icon name="edit" size={20} color="#333" />
                    )
                }}
            />
        </Tab.Navigator>
    )
}
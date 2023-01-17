import React, {useState, useEffect} from 'react';
import {Text, View , BackHandler, Alert} from 'react-native';
import {css} from '../../assets/css/Css';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

// import views for the bottomtab
import {Profile, RegisterCar, EditCar} from '../index';

export default function RestrictedArea({navigation}){

    const Tab = createMaterialBottomTabNavigator();
    
    // to check if the back button is pressed and exit from app
    useEffect(() => {
        const backAction = () => {
            Alert.alert("Alerta!", "Deseja mesmo sair do app?", [
                {
                    text: "Não",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "Sim", onPress: () => {
                    navigation.navigate('Home');
                    BackHandler.exitApp();
                    }
                }
            ]);
            return true;
        };
    
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
    
        return () => backHandler.remove();
    }, []);

    // here we just render the bottom tab bar to change what will bee rendered
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
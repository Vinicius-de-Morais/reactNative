import React, {useState, useEffect} from 'react';
import {Alert, Button, Text, View } from 'react-native';
import {css} from './assets/css/Css'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {Home, Login, Tracking} from './views/index'

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={Home}
          options={{

            title:"Cars Tracker",
            headerStyle: {backgroundColor: 'black'},
            headerTintColor:'#333',
            headerTitleAlign:'center',
            headerTitleStyle:{fontWeight:'bold'}
          }}
        />
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
        <Stack.Screen name="Tracking" component={Tracking} />
        {/* <Stack.Screen name="RestrictArea" component={RestrictArea} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
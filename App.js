import React, {useState, useEffect} from 'react';
import {Alert, Button, Text, View } from 'react-native';
import {css} from './assets/css/Css'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import AsyncStorage from '@react-native-async-storage/async-storage';

// import view os the app
import {Home, Login, Tracking,RestrictedArea} from './views/index'

export default function App() {

  const Stack = createNativeStackNavigator();

  // see if the async storage is working
  // async function asyncTest(){
  //   let resData = await AsyncStorage.getItem('userData');
  //   console.log(JSON.parse(resData));
  // }
  // asyncTest()

  {/* creating the navigation of app */}
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* screens to bee called by navigate // here is were we put the screens of app */}
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
        <Stack.Screen name="RestrictedArea" component={RestrictedArea} options={{headerTitle: 'Restricted Area'}}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}
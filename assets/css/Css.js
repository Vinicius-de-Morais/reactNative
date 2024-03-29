import { StyleSheet } from "react-native";

export const css = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    containerTop:{
      justifyContent: 'flex-start'
    },
    containerHome: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textStyle:{
      color: '#808080',
      backgroundColor: 'black',
      padding: 3,
    },
    button_Home:{
      margin: 10,
      width:170,
      height:110
    },

    darkbg:{
      backgroundColor: '#333'
    },
    login__msg:(text = 'none') => ({
      fontWeight:'bold',
      fontSize: 22,
      color: '#ff2800',
      marginTop: 10,
      marginBottom: 15,
      display: text
    }),
    login__form:{
      width: '80%',
    },
    login__input:{
      backgroundColor: '#fff',
      fontSize: 9,
      padding: 7,
      marginBottom: 15
    },
    login__button:{
      padding: 12,
      backgroundColor: '#b2b4b7',
      alignSelf: 'center',
      borderRadius: 5
    },
    login__buttonText:{
      fontWeight:'bold',
      fontSize: 15,
    },
    login__logo:{
      width: 300, 
      height: 190,
      marginBottom: 10
    },
    area__tab:{
      backgroundColor:'#b2b4b7',
      fontSize: 20,
      fontWeight: 'bold',
      color:'#333'
    },
    area__menu:{
      flexDirection: 'row',
      paddingTop: 40,
      paddingBottom: 10,
      width: '100%',
      backgroundColor: '#111',
      alignItems: 'center',
      justifyContent: 'center'
    },
    button__home:{
      textAlign: 'left',
    },
    area__title:{
      width: '80%',
      fontWeight: 'bold',
      fontSize: 20,
      color: '#fff',
      textAlign: 'center'
    },
    button__logout:{
      textAlign: 'right',
    },
    qr__code:(display='flex')=>({
      width: '100%',
      height: '100%',
      backgroundColor : '#000',
      justifyContent: 'center',
      display: display
    }),
    qr__form:(display = none)=>({
      width: '100%',
      display:display
    })
  });
  
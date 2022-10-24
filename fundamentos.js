import React, {useState, useEffect} from 'react';
import {Alert, Button, Text, View } from 'react-native';
import {css} from './assets/css/Css'
import Page from './views/Page'

export default function App() {
  const[product, setProuct]=useState('any');
  const[quantity, setQuantity]=useState(0);

  useEffect(() =>{
      Alert.alert("A new product was added");
  }, [quantity])

  const props={
    name:'John Snow',
    product: product,
    quantity: quantity,
  }
  return (
    <View style={css.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>{product}</Text>
      <Page {...props} /* Maneira de se declarar props que sao objetos {...props}*//>
      <Button title="Add products" onPress={() => setQuantity(quantity + 1)}/>
    </View>
  );
}

function Page(props){
    return(
        <View>
            <Text style={css.textStyle}>
                O nome do usuario é {props.name}.
                Comprou {props.quantity} unidades do produto {props.product}.
            </Text>

        </View>
    )

}
import { View } from 'react-native'
import {useState} from 'react'
import { TextInput,Button,Text} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import { createIconSetFromFontello } from 'react-native-vector-icons';
export default function DisponibleCarro (props) {
  // useStateCarro

 //Extrayendo datos Props
    const {carro}= props;

    let fechaLista=new Date(carro.created);
    const palabra = carro.state;
    let mensaje;
    if(palabra){
      mensaje='Disponible'
    }else{
      mensaje='No Disponible'
    }
    fechaLista=fechaLista.getDate()+"/"+fechaLista.getMonth()+"/"+fechaLista.getFullYear()


  //Funciones navegacion

    const navigation = useNavigation()
    ;
    const irEditarCarro=()=>{
        navigation.navigate('EditarCarro',{data:carro});
    }

    //Funciones 
    const eliminarVehiculo = async (id) => {
     console.log(id)
    
    
        try {          
          const response = await axios.delete(`http://127.0.0.1:7000/api/cars/deletecar/${id}`);
          console.log(response.data.message,response.data.placa)
          /*if (response.data.error==false) 
          { 
              setErrorMessage(false);
              setMessage('Actualización Exitosa');
              reset();
              setTimeout(() => {
              setMessage('');
              irListaCarros();
               
            }, 2000)
           
          }
          else {
              setErrorMessage(true);
              setMessage("Este automóvil ya existe")
              setTimeout(() => {
                  setMessage('');
              }, 2000)
    
          }*/
      } catch (error) {
          console.log(error)
          
      }
      finally {
      }
      }
     
    
  return (
    <View style={{flex:1,marginTop:15}}>
      <View style={{padding:5,backgroundColor:'#3f42b8',borderRadius:10}}>
      <Text style={{margintTop:5,fontSize:15,textAlign:'center',color:'white'}}>Placa : {carro.platenumber}   Marca : {carro.brand} </Text>
      <Text style={{margintTop:5,fontSize:15,textAlign:'center',color:'white'}}>Fecha Creación : {fechaLista} Precio : {carro.dailyvalue}</Text>
      <Text style={{margintTop:5,fontSize:15,textAlign:'center',color:carro.state?'#66f169':'#f16966'}} >Estado : {mensaje}</Text>
      <View style={{justifyContent:'space-between',alignContent:'space-between',display:'flex',flexDirection:'row'}}>
      
      </View>
      </View>
      
    </View>
  )
}


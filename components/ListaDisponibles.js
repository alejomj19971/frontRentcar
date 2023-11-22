import { View,FlatList,SafeAreaView} from "react-native";
import { useState,useEffect } from "react";
import { styles } from "../assets/styles/allstyles";
import { TextInput, Button,Select,Icon, MD3Colors,Text} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import DisponibleCarro from "./DisponibleCarro";


const ListaDisponibles = (props) => {

  //useState
const[carros,setCarros]=useState([]);
//Funciones navegacion
const navigation = useNavigation()
;
const irRegistroCarro=()=>{
    navigation.navigate('Car');
}


const traerCarros = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:7000/api/cars/listarcar/disponibles`);

        const listaCarros=response.data
        setCarros(listaCarros);
      

    } catch (error) {
        console.log(error)
        alert(error)
    }
    finally {
    }

  }
 


useEffect(() => {
    traerCarros();
}, [carros])

  return (
    <View>
      
    <Text
        style={{ marginTop: 20, backgroundColor: "#ffffff",border:'none',color:'#6366f1',textAlign:'center' }}
        icon="send"
        mode="outlined"
        onPress={traerCarros}
        labelStyle={{ color: "white" }}
 
    >
       Actualizar Lista
    </Text>

    <SafeAreaView>
        <FlatList
        data={carros}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        keyExtractor={(carro)=>{carro.platenumber}}
        renderItem={({item})=><DisponibleCarro carro={item} />}
        />

      

    </SafeAreaView>





    <Text
        style={{ marginTop: 20, backgroundColor: "#ffffff",border:'none',color:'#6366f1',textAlign:'center' }}
        icon="send"
        mode="outlined"
        onPress={irRegistroCarro}
        //onPress={registrarUsuario}
        labelStyle={{ color: "white" }}
        
    >
       Volver
    </Text>
    </View>
  )
}

export default ListaDisponibles
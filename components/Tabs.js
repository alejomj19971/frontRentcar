import {View} from 'react-native';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState,useEffect } from 'react';
import {AuthProvider} from '../assets/context/AuthContext'

//Componentes

import Car from './Car'
import Login from './Login'
import RentCar from './RentCar';
import DevolucionCarro from './DevolucionCarro';
import ListaDisponibles from './ListaDisponibles';
import VehiculosDisponibles from './VehiculosDisponibles';
import ListaCarros from './ListaCarros';

const Tab = createBottomTabNavigator();

const cerrar=undefined;

const Tabs=()=>{
    
const [registro,setRegistro]=useState(true);

const obtenerRol=(rol)=>{
 setRegistro(rol)
}


const selectRol=registro;

return(

<SafeAreaProvider>
    <PaperProvider>
    <AuthProvider>
        <Tab.Navigator
        initialRouteName="Login"
        activeColor="#B3B3B3"
        inactiveColor="#f16366"
        barStyle={{ paddingBottom: 30 }}
        >
     
         
        <Tab.Screen options={{ tabBarLabel:'Cerrar Sesión',tabBarStyle:{display:'none'},
        headerShown:false,
            tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="close" color={color} size={26} />)}} 
        name="Close" component={()=>(<Login cerrar={cerrar} />)} 

        />
        
        {selectRol&&
        <Tab.Screen options={{ tabBarLabel: 'Car',
            tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="car" color={color} size={26} />)}} 
        name="Car" component={Car}  />
        }


     


    {!selectRol &&
    <Tab.Screen options={{ tabBarLabel:'Rentar',
        headerShown:false,
            tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="car" color={color} size={26} />)}} 
        name="RentCar" component={RentCar} 

        />
    }

    {selectRol &&  
    <Tab.Screen options={{ tabBarLabel:'Devolucion',
        headerShown:false,
            tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="car" color={color} size={26} />)}} 
        name="DevolucionCarro" component={DevolucionCarro} 

        />
    }

    {selectRol &&  
    <Tab.Screen options={{ tabBarLabel:'EdicionVehiculos',
        headerShown:false,
            tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="car" color={color} size={26} />)}} 
        name="ListaCarros" component={ListaCarros} 

        />
    }
            
    <Tab.Screen  component={()=>(<VehiculosDisponibles registro={registro}          obtenerRol={obtenerRol}/>)} 

     options={{ tabBarLabel:'Disponibles',
        headerShown:false,
            tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="car" color={color} size={26} />)}} 

        name="VehiculosDisponibles"
        />

          


     
       

        </Tab.Navigator>
        </AuthProvider>
    </PaperProvider>
</SafeAreaProvider>



)

}

export default Tabs;
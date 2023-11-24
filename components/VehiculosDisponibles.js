import { View, Text } from 'react-native'
import React from 'react'
import ListaDisponibles from './ListaDisponibles'
import useAuth from '../assets/hooks/useAuth'

const VehiculosDisponibles = ({obtenerRol}) => {

 
 const {admin} = useAuth();

 if(admin){
    obtenerRol(admin)
 }else{
    obtenerRol(admin)
 }
  return (
   <ListaDisponibles />
  )
}

export default VehiculosDisponibles
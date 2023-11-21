import {View} from 'react-native';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//Componentes

import Car from './Car'
import Login from './Login'
import RentCar from './RentCar';
const Tab = createBottomTabNavigator();


const Tabs=()=>{

return(

<SafeAreaProvider>
    <PaperProvider>
        <Tab.Navigator
        initialRouteName="Login"
        activeColor="#B3B3B3"
        inactiveColor="#f16366"
        barStyle={{ paddingBottom: 30 }}
        >
     
         

        <Tab.Screen options={{ tabBarLabel: 'Car',
            tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="car" color={color} size={26} />)}} 
        name="Car" component={Car}  />
 

        <Tab.Screen options={{ tabBarLabel:'Cerrar Sesión',
        headerShown:false,tabBarStyle:{display:'none'},
            tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="close" color={color} size={26} />)}} 
        name="Login" component={Login} 

        />

        
    <Tab.Screen options={{ tabBarLabel:'Rentar',
        headerShown:false,tabBarStyle:{display:'none'},
            tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="car" color={color} size={26} />)}} 
        name="RentCar" component={RentCar} 

        />


     
       

        </Tab.Navigator>
    </PaperProvider>
</SafeAreaProvider>



)

}

export default Tabs;
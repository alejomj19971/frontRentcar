import { View,Picker} from "react-native";
import { useState,useEffect } from "react";
import { styles } from "../assets/styles/allstyles";
import { TextInput, Button,Text,Checkbox } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { DatePickerInput } from 'react-native-paper-dates';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios'




export default function RentCar(){

  // Funciones navegación
  const navigation = useNavigation();
  
  const irListaDisponibles=()=>{
      navigation.navigate('ListaDisponibles')
  }

  
 


  //UseState
    const [errormessage, setErrorMessage] = useState(false);
    const [message, setMessage] = useState(''); 
    const [checked, setChecked] = useState(false);
    const [placa,setPlaca]= useState('')
    const[carros,setCarros]=useState([]);
    const [username,setUsername]= useState('');
    

    //Controlador
    const {control,handleSubmit,formState: { errors },reset,setValue,} = useForm({
    defaultValues: {
      rentnumber:"",
      username :"",
      platenumber: "",
      initialdate: "",
      finaldate:""
      
    },
  });

 // Al iniciar la pagina trae los carros disponibles
    useEffect(() => {
     traerCarrosDisponibles();
    }, [])
    

  // Funciones 
  const renderizarCarrosEnPicker = () => {
    const elementosPicker = [];
    carros.forEach((carro) => {
      elementosPicker.push(
        <Picker.Item  label={carro.platenumber} value={carro.platenumber} />
        // Ajusta 'modelo' y 'id' a las propiedades de tus objetos de carros
      );
    });
    return elementosPicker;
  };
 

  const traerCarrosDisponibles = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:7000/api/cars/listarcar/disponibles`);

    
      const listaCarros=response.data
      setCarros(listaCarros);
      console.log(listaCarros)
      

  } catch (error) {
      console.log(error)
      alert(error)
  }
  finally {
  }

}


const buscarUsuario =async()=>{
    try {
                
        const response = await axios.get(`http://127.0.0.1:7000/api/users/buscarUsuario/${username}`);
        console.log(response.data.error)
        if (response.data.error==false) 
        { 
            setErrorMessage(false);
            setMessage('Usuario encontrado');
            reset();
            setTimeout(() => {
            setMessage('');
        }, 2000)
        
        }
        else {
            setErrorMessage(true);
            setMessage("Usuario no encontrado")
            setTimeout(() => {
                setMessage('');
            }, 2000)

        }
    } catch (error) {
        console.log(error)
        
    }
    finally {
    }

}

const desactivarAuto = async()=>{
    const datos={
        platenumber:placa,
        state:false
    }
    try {
        const response = await axios.put(`http://127.0.0.1:7000/api/cars/updatecar`,datos);
        console.log(response.data.error)
        if (response.data.error==false) 
        { 
            setErrorMessage(false);
            setMessage('Actualización Exitosa');
            reset();
            setTimeout(() => {
            setMessage('');
            
             
          }, 2000)
         
        }
        else {
            setErrorMessage(true);
            setMessage("No fue posible actualizar ")
            setTimeout(() => {
                setMessage('');
            }, 2000)
  
        }
    } catch (error) {
        console.log(error)
        
    }
    finally {
    }
// 
}

  const registrarRenta = async (data) => {

    const {username,rentnumber}=data
    setUsername(username)
    //Valores de fecha
    let fechaInicial=new Date(data.initialdate);
    let fechaFinal=new Date(data.finaldate);
    let fechaActual=new Date(Date.now())
// Formato para que no se compare la hora exacta
    let fechaActualCompara= new Date(fechaActual.getFullYear(),fechaActual.getMonth(),fechaActual.getDate())

    let fechaInicialCompara = new Date(fechaInicial.getFullYear(),fechaInicial.getMonth(),fechaInicial.getDate())

    let fechaFinalCompara=new Date(fechaFinal.getFullYear(),fechaFinal.getMonth(),fechaFinal.getDate())

    const datos ={
      rentnumber:rentnumber,
      platenumber: placa,
      username: username,
      initialdate: fechaInicial,
      finaldate:fechaFinal,
      state:checked
    }
  
  // Comprobar que la placa no este vacia
  if(placa!="none")
  {
    // Comprobar que la fechainicial sea mayor o igual a la fecha actual
    if(fechaInicialCompara>=fechaActualCompara)
    {
        //Comprobar fecha final mayor o igual a la inicial
            if(fechaFinalCompara>=fechaInicialCompara)
            {

                // Validar el nombre de usuario
                buscarUsuario();
                if(errormessage==false){


               
                    // Enviar los datos
                    
                        try {
                    
                            const response = await axios.post(`http://127.0.0.1:7000/api/rents/rentarcar`,datos);
                            console.log(response.data.error)
                            if (response.data.error==false) 
                            { 
                                desactivarAuto();
                                setErrorMessage(false);
                                setMessage('Renta exitosa');
                                reset();
                                setTimeout(() => {
                                setMessage('');
                            }, 2000)
                            
                            }
                            else {
                                setErrorMessage(true);
                                setMessage("El numero de renta ya existe")
                                setTimeout(() => {
                                    setMessage('');
                                }, 2000)
                    
                            }
                        } catch (error) {
                            console.log(error)
                            
                        }
                        finally {
                        }
                    // 
                }
                else{
                    setErrorMessage(true);
                    setMessage("El Usuario no es válido")
                    setTimeout(() => {
                    setMessage('');
                }, 2000)
                }

            }else{setErrorMessage(true);
                setMessage("La fecha final debe ser igual a la fecha inicial o posterior")
                setTimeout(() => {
                    setMessage('');
                }, 2000) }
        }
        else{ setErrorMessage(true);
            setMessage("La fecha inicial debe ser la fecha actual o posterior")
            setTimeout(() => {
                setMessage('');
            }, 2000) }
            
    }  
    else{
        setErrorMessage(true);
        setMessage("Por favor seleccione una placa de vehiculo")
        setTimeout(() => {
            setMessage('');
        }, 2000)
        }
    
  }
  
   
  

    return(
        <View style={styles.container}>
        <View style={{padding:40,backgroundColor:'#FFFFFF',borderCurve:'continuous',borderRadius:20,border:'none',shadowRadius:2,shadowColor:'#6366f1'}}>
          <Text variant="titleLarge" style={{marginBottom:10,marginTop:10,fontSize:25,color:'#f16366',textAlign:'center'}}>Rentar Vehiculo</Text>
          
          <Text style={{marginBottom :5, margintTop:5,textAlign:'center', color:errormessage?'#f16366':'#66f169'  }}>
          {message}
          </Text>

{/*rentnumber */}
<Controller
        control={control}
          rules={{
                required: true,
                pattern: /^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9]+$/g
                
              }}
          render={({ field: { onChange, onBlur, value } }) => (
      <TextInput
        onBlur={onBlur}
        onChangeText={onChange}
        value={value}  
        label="Número de renta"
        mode="outlined"
        textColor="#333333"
        activeOutlineColor="#6366f1"
        right={<TextInput.Icon icon="account" />}
      />
      )}
            name="rentnumber"
        />
      {errors.rentnumber?.type === 'required' && <Text style={{color:'#f16366',marginTop:3,textAlign:'center'}} >Este Campo es Obligatorio</Text>}
       {errors.rentnumber?.type === 'pattern' && <Text style={{color:'#f16366',marginTop:3,textAlign:'center'}}>Escribe un numero de renta solo con letras y numeros</Text>}

          {/*usuario */}
 <Controller
        control={control}
          rules={{
                required: true,
                pattern: /^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9]+$/g
                
              }}
          render={({ field: { onChange, onBlur, value } }) => (
      <TextInput
        onBlur={onBlur}
        onChangeText={onChange}
        value={value}  
        label="Usuario"
        mode="outlined"
        textColor="#333333"
        activeOutlineColor="#6366f1"
        right={<TextInput.Icon icon="account" />}
      />
      )}
            name="username"
        />
      {errors.username?.type === 'required' && <Text style={{color:'#f16366',marginTop:3,textAlign:'center'}} >Este Campo es Obligatorio</Text>}
       {errors.username?.type === 'pattern' && <Text style={{color:'#f16366',marginTop:3,textAlign:'center'}}>Escribe un nombre de usuario solo con letras y numeros</Text>}
      
       <Picker
              style={{ marginTop: 10 ,fontSize:15,borderWidth: 1,widht:'100%',borderColor:'#79747E',borderRadius:8,padding:12,color:'#333333'}}
              selectedValue={placa}
              onValueChange={(placa) => setPlaca(placa)}
        > 
        <Picker.Item label="Por favor seleccione una placa" value="none" />
        {renderizarCarrosEnPicker()}
                       
               
        </Picker> 
     
  
        {/*initialDate*/}
         
        <Controller
           control={control}
           rules={{
           required: true,
         
           }}
           render={({ field: { onChange, onBlur, value } }) => (
  
     
       <View 
       style={{marginTop:10}}>
       <SafeAreaProvider>
       <DatePickerInput
         mode="outlined"
         locale="es"
         label="Fecha inicial "
         value={value}
         onChange={onChange}
         onBlur={onBlur}
         inputMode="start"
       />
       </SafeAreaProvider>
       </View>
      
       )}
         name="initialdate"
       />
       {errors.initialdate?.type==="required" && <Text>Este Campo es Obligatorio</Text>}
    
    {/*finaldate*/}
         
    <Controller
           control={control}
           rules={{
           required: true,
         
           }}
           render={({ field: { onChange, onBlur, value } }) => (
  
     
       <View 
       style={{marginTop:10}}>
       <SafeAreaProvider>
       <DatePickerInput
         mode="outlined"
         locale="es"
         label="Creado "
         value={value}
         onChange={onChange}
         onBlur={onBlur}
         inputMode="start"
       />
       </SafeAreaProvider>
       </View>
      
       )}
         name="finaldate"
       />
       {errors.finaldate?.type==="required" && <Text>Este Campo es Obligatorio</Text>}
    
  
   
  
  
        {/*Created*/}
         
     {/* <Controller
           control={control}
           rules={{
           required: true,
         
           }}
           render={({ field: { onChange, onBlur, value } }) => (
  
     
       <View 
       style={{marginTop:10}}>
       <SafeAreaProvider>
       <DatePickerInput
         mode="outlined"
         locale="es"
         label="Creado "
         value={value}
         onChange={onChange}
         onBlur={onBlur}
         inputMode="start"
       />
       </SafeAreaProvider>
       </View>
      
       )}
         name="created"
       />
       {errors.created?.type==="required" && <Text>Este Campo es Obligatorio</Text>}
  */}
  
           {/*State*/}
     {   
        <Checkbox.Item 
        label="Activo"
        labelStyle={{fontSize:20 ,color:'#333333'}}
        color="#6366f1"
        uncheckedColor="#B3B3B3"
        status={checked ? 'checked' : 'unchecked'}
        onPress={() => {
          setChecked(!checked);
        }} />
     
    }
  
        <Button
          style={[{ marginTop: 20, backgroundColor: "#6366f1",border:'none' }]}
          icon="send"
          mode="outlined"
          onPress={handleSubmit(registrarRenta)}
          labelStyle={{ color: "white" }}
        >
          RENTAR VEHICULO
        </Button>
  
        <Text
      style={{ marginTop: 20, backgroundColor: "#ffffff",border:'none',color:'#6366f1',textAlign:'center' }}
      icon="send"
      mode="outlined"
      onPress={irListaDisponibles}
      labelStyle={{ color: "white" }}
    >
      Lista de rentas
    </Text>
  
    </View>
    </View>
        





    )


}
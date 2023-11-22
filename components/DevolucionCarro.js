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

export default function  DevolucionCarro() {
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
  const [numeroRenta,setNumeroRenta] = useState('');
  const[carros,setCarros]=useState([]);
  const [username,setUsername]= useState('');
  const [fechaLimite,setFechaLimite]=useState('')

     

    //Controlador
    const {control,handleSubmit,formState: { errors },reset,setValue,} = useForm({
        defaultValues: {
            returndate:"",
            rentnumber:"0"
          
        },
      });




useEffect(() => {
    traerCarrosNoDisponibles()
},[])
   

//Funciones
const traerCarrosNoDisponibles = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:7000/api/cars/listarcar/nodisponibles`);

    
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



const traerNumeroRenta = async (placa) => {
    console.log(placa)
    try {
      const response = await axios.get(`http://127.0.0.1:7000/api/rents/listarentnumber/${placa}`);

    console.log({response})
      const numeroRenta= response.data.rentnumber
      const fechaLimite = response.data.finaldate
      setNumeroRenta(numeroRenta);
      setFechaLimite(fechaLimite);
      setValue('rentnumber',numeroRenta);
      console.log(numeroRenta)
      

  } catch (error) {
      console.log(error)
      alert(error)
  }
  finally {
  }

}



  const renderizarCarrosEnPicker = () => {
    const elementosPicker = [];
    carros.forEach((carro) => {
      elementosPicker.push(
        <Picker.Item  label={carro.platenumber} value={carro.platenumber} />
        
      );
    });
    return elementosPicker;
  };

function generarCadenaUnica() {
    const timestamp = Date.now().toString(); // Obtiene el timestamp actual como cadena
    const numeroAleatorio = Math.floor(Math.random() * 1000).toString(); // Genera un número aleatorio como cadena
    return timestamp + numeroAleatorio;
}





  // Registrar devolucion
  
  const registrarDevolucion = async (data) => {
    const {rentnumber,returndate}=data
    
    let fechaLista=new Date(returndate);
    
    let fechaDevolucionCompara = new Date(fechaLista.getFullYear(),fechaLista.getMonth(),fechaLista.getDate())

    let fechaLimiteCompara=new Date(fechaLimite.getFullYear(),fechaLimite.getMonth(),fechaLimite.getDate())

    const datos ={
     returndate:fechaLista,
     rentnumber:rentnumber,
     platenumber:placa,
     returnnumber:generarCadenaUnica()
    
  
    }
  

    if(fechaDevolucionCompara>=fechaLimiteCompara){
      try {

        
        const response = await axios.post(`http://127.0.0.1:7000/api/returns/returncar`,datos);
        console.log(response.data.error)
        if (response.data.error==false) 
        { 

            setErrorMessage(false);
            setMessage('Devolución Exitosa');
            reset();
            setTimeout(() => {
              setMessage('');
          }, 2000)
         
        }
        else {
            setErrorMessage(true);
            setMessage("Hubo un error verifique la placa")
            setTimeout(() => {
                setMessage('');
            }, 2000)
  
        }
    } catch (error) {
        console.log(error)
        
    }
    finally {
    }

    }else{
        setErrorMessage(true);
        setMessage("El vehiculo ha sido devuelto debe pagar intereses equivalente al tiempo adicional")
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
        editable={false}
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





       <Picker
              style={{ marginTop: 10 ,fontSize:15,borderWidth: 1,widht:'100%',borderColor:'#79747E',borderRadius:8,padding:12,color:'#333333'}}
              selectedValue={placa}
              onValueChange={(placa) => setPlaca(placa)}
        > 
        <Picker.Item label="Por favor seleccione una placa" value="none" />
        {renderizarCarrosEnPicker()}
                                 
        </Picker> 



  
        {/*returndate*/}
         
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
         name="returndate"
       />
       {errors.returndate?.type==="required" && <Text>Este Campo es Obligatorio</Text>}

   
       <Button
          style={[{ marginTop: 20, backgroundColor: "#6366f1",border:'none' }]}
          icon="send"
          mode="outlined"
          onPress={()=>{traerNumeroRenta(placa)}}
          labelStyle={{ color: "white" }}
        >
          BUSCAR VEHICULO
        </Button>
  

        <Button
          style={[{ marginTop: 20, backgroundColor: "#6366f1",border:'none' }]}
          icon="send"
          mode="outlined"
          //onPress={handleSubmit(registrarRenta)}
          labelStyle={{ color: "white" }}
        >
          RENTAR VEHICULO
        </Button>
  
        <Text
      style={{ marginTop: 20, backgroundColor: "#ffffff",border:'none',color:'#6366f1',textAlign:'center' }}
      icon="send"
      mode="outlined"
      onPress={traerNumeroRenta}
      labelStyle={{ color: "white" }}
    >
      Lista de rentas
    </Text>
  
    </View>
    </View>
        
)

}
import { View,Picker} from "react-native";
import { useState } from "react";
import { styles } from "../assets/styles/allstyles";
import { TextInput, Button,Select,Icon, MD3Colors,Text} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import useAuth from "../assets/hooks/useAuth";

function Login(){


// Context 
const {login,logout,user,admin,setAdmin} = useAuth();



  
    const navigation = useNavigation();
    const navigateToRegistro = () => {
        navigation.navigate('RegistroUsuario'); // Navega a la pantalla que contiene el componente
      };

      const navigateToOlvidoContraseña = () => {
        navigation.navigate('CambioContraseña'); // Navega a la pantalla que contiene el componente
      };

    const [errormessage, setErrorMessage] = useState(false);
    const [message, setMessage] = useState(''); 
    const [showPass,setShowPass] = useState(false);
    
 

  //Funciones 

  const iniciarSesion = async (data) => {
    console.log(data)
    const datos ={
      username:data.username,
      password:data.password

    }
    try {
        const response = await axios.post(`http://127.0.0.1:7000/api/users/login`,datos);
        if (response.data.username=== data.username && response.data.password === data.password) 
        { // Encuentra el usuario 
            
           /*if (response.data.role === "1") {
                

                console.log("User");
                setUser(false);
                reset();
                navigation.navigate('vehiculoDisponible');
            }
            else if (response.data.role === "2") {
              
                console.log("Admin");
                setUser(true);
                reset();
                navigation.navigate('vehiculoDisponible');
            }*/
            login(response.data)
            if(response.data.role=="Administrador"){
              setAdmin(true)
              setErrorMessage(false);
              setMessage('Ingreso Exitoso');
              navigation.navigate('VehiculosDisponibles');
              setMessage('');
              reset();
            }
            else
            {
              setAdmin(false)
              setErrorMessage(false);
              setMessage('Ingreso Exitoso');
              navigation.navigate('VehiculosDisponibles');
              setMessage('');
              reset();
            }
           
           

        }
        else {
            setErrorMessage(true);
            setMessage("Usuario no encontrado",
                console.log("Usuario no encontrado"));
            setTimeout(() => {
                setMessage('');
            }, 2000)

        }
    } catch (error) {
        console.log(error)
        alert(error)
    }
    finally {
        //setLoading(false); 
    }
};

// Controlador del formulario
   
const { control, handleSubmit, formState: { errors }, reset } = useForm({
  defaultValues: {
      username: '',
      password: ''
  }
});

  return (
    <View style={styles.container}>
    <View style={{padding:40,backgroundColor:'#FFFFFF',borderCurve:'continuous',borderRadius:20,border:'none',shadowRadius:2,shadowColor:'#6366f1'}}>
      <Text  style={{marginBottom:10,marginTop:10,fontSize:25,color:'#f16366',textAlign:'center'}}>Bienvenido a RentCar</Text>
    
      <Text style={{ color:errormessage?'#f16366':'#66f169'  }}>
        {message}
        </Text>
    
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

   {/*contrasena */}
   <Controller
      control={control}
        rules={{
          required: true,
          pattern: /(?=.*\d)(?=.*[A-Za-zÁÉÍÓÚáéíóúñÑ])[A-Za-zÁÉÍÓÚáéíóúñÑ0-9]+/g}}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={{ marginTop: 10 }}
              label="Contraseña"
              mode="outlined"
              textColor="#333333"
              activeOutlineColor="#6366f1"
              
              secureTextEntry={!showPass}
              right={
                <TextInput.Icon
                  icon={showPass ? "eye" : "eye-off"}
                  onPress={() => setShowPass(!showPass)}
                />} />
                )}
                name="password"
                />
        {errors.password?.type === "required" && <Text style={{color:'#f16366',marginTop:3,textAlign:'center'}}>Este Campo es Obligatorio</Text>}
        {errors.password?.type === "pattern" && <Text style={{color:'#f16366',marginTop:3,textAlign:'center'}}>El Password Debe contener solo  números y letras</Text>}


    <Button
      style={[{ marginTop: 20, backgroundColor: "#6366f1",border:'none' }]}
      icon="login"
      
      mode="outlined"
      onPress={handleSubmit(iniciarSesion)}
      labelStyle={{ color: "white" }}
    >
      Iniciar sesion
    
    </Button>

    <View style={{marginTop:10,justifyContent:'space-between'}}>
        <Text
        style={{ marginTop: 20, backgroundColor: "#ffffff",border:'none',color:'#6366f1',textAlign:'center' }}
        icon="send"
        mode="outlined"
        onPress={navigateToRegistro}
        labelStyle={{ color: "white" }}
    >
       Registrarse aquí
    </Text>

    <Text
        style={{ marginTop: 20, backgroundColor: "#ffffff",border:'none',color:'#6366f1',textAlign:'center' }}
        icon="send"
        mode="outlined"
        onPress={navigateToOlvidoContraseña}
        //onPress={registrarUsuario}
        labelStyle={{ color: "white" }}
        
    >
       ¿Olvidaste tu contraseña?
    </Text>
    </View>

</View>
</View>
  )


}



export default Login
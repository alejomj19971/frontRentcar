import { View,Picker} from "react-native";
import { useState } from "react";
import { styles } from "../assets/styles/allstyles";
import { TextInput, Button,Select,Icon, MD3Colors,Text} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'

export default function CambioContraseña() {
  const navigation = useNavigation();
 
  const [showPass,setShowPass]=useState(false);
  const [errormessage, setErrorMessage] = useState(false);
  const [message, setMessage] = useState(''); 

  const irAInicio=()=>{
    navigation.navigate('Login');
  }
                                          

  //Funciones 
  
const actualizarContraseña = async (data) => {
 
  const datos ={
    username:data.username,
    password:data.password,
    reservword:data.reservword

  }

  
    try {

      const response = await axios.patch(`http://127.0.0.1:7000/api/users/restablecercontrasena
      `,datos);
      console.log(response.data.error)
      if (response.data.error==false) 
      { 
          setErrorMessage(false);
          setMessage('Contraseña Restablecida');
          reset();
          setTimeout(() => {
            setMessage('');
        }, 2000)

          
      }
      else {
          setErrorMessage(true);
          setMessage("No se pudo restablecer la contraseña verifique los datos")
          setTimeout(() => {
              setMessage('');
          }, 2000)

      }
  } catch (error) {
      console.log(error)
     
  }
  finally {
  }
  


};
// conctrolador 
const { control, handleSubmit, formState: { errors }, reset } = useForm({
  defaultValues: {
      username: '',
      password: '',
      reservword:''
  }
});

 
return (
  
  <View style={styles.container}>
  <View style={{padding:40,backgroundColor:'#FFFFFF',borderCurve:'continuous',borderRadius:20,border:'none',shadowRadius:2,shadowColor:'#6366f1'}}>
    <Text variant="titleLarge" style={{marginBottom:10,marginTop:10,fontSize:25,color:'#f16366',textAlign:'center'}}>Restablecer Contraseña</Text>

    <Text style={{marginBottom :5, margintTop:5,textAlign:'center', color:errormessage?'#f16366':'#66f169'  }}>
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

     {/*palabraSecreta */}
     <Controller
        control={control}
          rules={{
                required: true,
                pattern: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g
                
              }}
          render={({ field: { onChange, onBlur, value } }) => (
      <TextInput
        onBlur={onBlur}
        onChangeText={onChange}
        value={value}
        style={{ marginTop: 10 }}
        label="Palabra reservada"
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
            name="reservword"
        />
      {errors.reservword?.type === 'required' && <Text style={{color:'#f16366',marginTop:3,textAlign:'center'}} >Este Campo es Obligatorio</Text>}
       {errors.reservword?.type === 'pattern' && <Text style={{color:'#f16366',marginTop:3,textAlign:'center'}}>Escriba una palabra reservada  solo con Letras y Espacios</Text>}



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
        label="Nueva contraseña"
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
        {errors.password?.type === "pattern" && <Text style={{color:'#f16366',marginTop:3,textAlign:'center'}}>El Password Debe contener  números y letras</Text>}
  


  <Button
    style={[{ marginTop: 20, backgroundColor: "#6366f1",border:'none' }]}
    icon="content-save"
    
    mode="outlined"
    onPress={handleSubmit(actualizarContraseña)}
    labelStyle={{ color: "white" }}
  >
    Guardar Cambios
  </Button>

  <Text
    style={{ marginTop: 20, backgroundColor: "#ffffff",border:'none',color:'#6366f1',textAlign:'center' }}
    icon="send"
    mode="outlined"
    onPress={irAInicio}
    //onPress={registrarUsuario}
    labelStyle={{ color: "white" }}
  >
    Iniciar Sesion
  </Text>


</View>
</View>
  );
}
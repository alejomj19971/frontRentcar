import { View,Picker} from "react-native";
import { useState } from "react";
import { styles } from "../assets/styles/allstyles";
import { TextInput, Button,Select,Icon, MD3Colors,Text} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'


export default function RegistroUsuario() {
  
  //States
  const [errormessage, setErrorMessage] = useState(false);
  const [message, setMessage] = useState(''); 
  const [rol,setRol]=useState('none');
  const [showPass, setShowPass] = useState(false);



  //Funciones Navegacion
  const navigation= useNavigation();

  const irAInicio=()=>{
    navigation.navigate('Login');
  }


   // Controlador del formulario
   
const { control, handleSubmit, formState: { errors }, reset } = useForm({
  defaultValues: {
      username: '',
      name:'',
      password: '',
      reserveword:''
  }
});


// Funciones 

const registrarUsuario = async (data) => {
 
  const datos ={

    username:data.username ,
    name:data.name,
    password:data.password ,
    role:rol,
    reservword:data.reserveword

  }

  if(rol=='Administrador'|| rol=='Usuario'){
    setErrorMessage(false);
    setMessage('')

    try {

  

      const response = await axios.post(`http://127.0.0.1:7000/api/users/registrar`,datos);
      console.log(response.data.error)
      if (response.data.error==false) 
      { 

          setErrorMessage(false);
          setMessage('Registro Exitoso');
          reset();
          setTimeout(() => {
            setMessage('');
        }, 2000)

          
      }
      else {
          setErrorMessage(true);
          setMessage("Este usuario ya existe")
          setTimeout(() => {
              setMessage('');
          }, 2000)

      }
  } catch (error) {
      console.log(error)
      alert(error)
  }
  finally {
  }
  }
  else{

    setErrorMessage(true);
    setMessage('Por favor seleccione un rol válido')

      setTimeout(() => {
        setMessage('');
    }, 2000)

  }

};




  return (
  
    <View style={styles.container}>
      <View style={{padding:40,backgroundColor:'#FFFFFF',borderCurve:'continuous',borderRadius:20,border:'none',shadowRadius:2,shadowColor:'#6366f1'}}>
        <Text variant="titleLarge" style={{marginBottom:10,marginTop:10,fontSize:25,color:'#f16366',textAlign:'center'}}>Registrate</Text>

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



  {/*nombre */}
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
        label="Nombre completo"
        textColor="#333333"
        mode="outlined"
        activeOutlineColor="#6366f1"
        
        right={<TextInput.Icon icon="text" />}
      />
      )}
            name="name"
        />
      {errors.name?.type === 'required' && <Text style={{color:'#f16366',marginTop:3,textAlign:'center'}} >Este Campo es Obligatorio</Text>}
       {errors.name?.type === 'pattern' && <Text style={{color:'#f16366',marginTop:3,textAlign:'center'}}>Escriba un nombre solo con Letras y Espacios</Text>}

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
        {errors.password?.type === "pattern" && <Text style={{color:'#f16366',marginTop:3,textAlign:'center'}}>El Password Debe contener  números y letras</Text>}
  

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
            name="reserveword"
        />
      {errors.reserveword?.type === 'required' && <Text style={{color:'#f16366',marginTop:3,textAlign:'center'}} >Este Campo es Obligatorio</Text>}
       {errors.reserveword?.type === 'pattern' && <Text style={{color:'#f16366',marginTop:3,textAlign:'center'}}>Escriba una palabra reservada  solo con Letras y Espacios</Text>}

       
        <Picker
              style={{ marginTop: 10 ,fontSize:15,borderWidth: 1,widht:'100%',borderColor:'#79747E',borderRadius:8,padding:12,color:'#333333'}}
              selectedValue={rol}
              onValueChange={(rol) => setRol(rol)}
        > 
                <Picker.Item label="Por favor seleccione un rol" value="none" />
                <Picker.Item label="Administrador" value="Administrador" />
                <Picker.Item label="Usuario" value="Usuario" />
          </Picker> 
       




      <Button
        style={[{ marginTop: 20, backgroundColor: "#6366f1",border:'none' }]}
        icon="send"
        
        mode="outlined"
        onPress={handleSubmit(registrarUsuario)}
        labelStyle={{ color: "white" }}
      >
        REGISTRARSE
      </Button>

      <Text
    style={{ marginTop: 20, backgroundColor: "#ffffff",border:'none',color:'#6366f1',textAlign:'center' }}
    icon="send"
    mode="outlined"
    onPress={irAInicio}
   
    labelStyle={{ color: "white" }}
  >
    Iniciar Sesion
  </Text>

  </View>
  </View>
  );
}
import {useState,createContext} from 'react'
import { set } from 'react-hook-form';

export  const AuthContext=createContext({
    user:undefined,
    login:()=>{},
    logut:()=>{}
});

export function AuthProvider(props){

const {children}=props
const [auth,setAuth]= useState(undefined);
const [admin,setAdmin]=useState(false);


const login =(userData)=>{
    setAuth(userData);
}

const logout = ()=>{
    setAuth(undefined)
}

const valueContext={
    auth,
    login,
    logout,
    admin,
    setAdmin
};

return(
<AuthContext.Provider value={valueContext}>
    {children}
</AuthContext.Provider>

)

}



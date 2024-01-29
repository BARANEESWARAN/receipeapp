import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Base_Url } from '../config/BaseUrl'
import {Cookies, useCookies} from "react-cookie"
import { useNavigate } from 'react-router-dom'
const Login=()=>{
    const[username,setUsername]=useState("")
    const[password,setPassword]=useState("")
    const[cookies,setCookies]=useCookies(["access_token"])
const navigate=useNavigate()
    const onSubmit=async(e)=>{

        try{
            e.preventDefault()
            const response=await axios.post(`${Base_Url}auth/login`,
            {
                username,
                password
            })
          
          if(response.data.success){
            setCookies("access_token",response.data.token)
            localStorage.setItem("userId",response.data.userId)
            setUsername("")
            setPassword("")
            alert("login")
            navigate("/home")
            
          }
        }
        catch(err){
            console.log(err)
            alert(err.message)
        }
    

    }
    return <Form 
    username={username}
     setUsername={setUsername}
      password={password} 
      setPassword={setPassword}
      label={"Login"}
      onSubmit={onSubmit}
      />
    
    }
const Register=()=>{
const[username,setUsername]=useState("")
const[password,setPassword]=useState("")
const onSubmit=async(e)=>{
e.preventDefault()
    try{
        const response=await axios.post(`${Base_Url}auth/register`,{
            username,
            password
        })
        if(response){
            alert("registered successsfuly")
        }
    }

catch(err){
    console.log(err)
    alert(err.message)
}
 
}
return <Form 
username={username}
 setUsername={setUsername}
  password={password} 
  setPassword={setPassword}
  label={"Register"}
  onSubmit={onSubmit}
  />

}


const Form=({username,setUsername,password,setPassword,label,onSubmit})=>{
    const[cookies,setCookies]=useCookies(["access_token"])
     const navigate=useNavigate()
    useEffect(()=>{
if(cookies?.access_token&&localStorage.getItem("userId")){
    navigate("/home")
}
    },[])
    return(
<form>
    <h2>{label}</h2>
    <div className='form-group'>
<label htmlFor='username' >Username</label>
<input 
id='username' 
type='text'
onChange={(e)=>setUsername(e.target.value)}
value={username}
defaultValue={""}
/>
    </div>
    <div className='form-group'>
<label htmlFor='password' >Username</label>
<input 
id='password' 
type='password'
onChange={(e)=>setPassword(e.target.value)}
value={password}
defaultValue={""}
/>
    </div>

    <button className='register-btn btn'  type='submit' onClick={onSubmit}>{label}</button>
</form>
    )
}



function Auth() {
  return (
    <div className='auth-container'>
<Login/>
<Register/>


    </div>
  )
}

export default Auth
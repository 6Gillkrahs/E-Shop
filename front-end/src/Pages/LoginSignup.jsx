import React, { useEffect, useState } from 'react'
import './CSS/LoginSignUp.css'

const LoginSignup = () => {
  const [state,setstate] = useState('Login')
  const [formData,setFormData] = useState({
    name:"",
    email:"",
    password:""
  })
  const login  = async ()=>{
    let respData;
    await fetch('http://localhost:4000/login',{
      method:"POST",
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formData)
    }).then((res)=>res.json())
      .then((data)=>{
        respData = data 
      })
      if(respData.success){
        localStorage.setItem('auth-token',respData.token)
        window.location.replace('/')
      }else{
        alert(respData.error)
      }
  }

  const signup  = async ()=>{
    let respData;
    await fetch('http://localhost:4000/signup',{
      method:"POST",
      headers: {
        Accept:'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(formData)
    }).then((res)=>res.json())
      .then((data)=>{
        respData = data 
      })
      if(respData.success){
        localStorage.setItem('auth-token',respData.token)
        window.location.replace('/login')
      }else{
        alert(respData.error)
      }
  }

  const changeHandler = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  return (
    <div className='loginsignup'>
      <div className='loginsignup-container'>
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === 'Sign up' ?<input name='name' value={formData.name} onChange={changeHandler} type="text" placeholder='Your Name' />: <></> }
          <input name='email'  onChange={changeHandler} type="email" placeholder='Your Email' id="" />
          <input name='password' value={formData.password}  onChange={changeHandler} type="password" placeholder='Password'id="" />
        </div>
        <button onClick={()=>{state === 'Login'?login():signup()}} >Continue</button>
        {state === 'Sign up'? <p className="loginsignup-login">Already have an account <span onClick={()=>{setstate('Login')}}>Login here</span></p>:  <p className="loginsignup-login">Create an account?<span onClick={()=>{setstate('Sign up')}}>Click here</span></p>}
        <div className='loginsignup-agree'>
          <input type="checkbox" name="" id="" />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>  
      </div>
    </div>
  )
}

export default LoginSignup

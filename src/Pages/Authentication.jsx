import React, { useContext, useEffect, useState } from 'react'
import register from '../assets/register.png'
import { Link, useNavigate } from 'react-router-dom'
import { loginApi, registerApi } from '../../services/allApi'
import { toast } from 'react-toastify'
import Spinner from 'react-bootstrap/Spinner';
import { tokenAuthContext } from '../context/ContextApi'
import AOS from 'aos';
import 'aos/dist/aos.css';




function Authentication({insideRegister}) {
  const {setIsAuthorised}=useContext(tokenAuthContext)
  const [userData,setUserData]=useState({username:"",email:"",password:""})
  const [isloggedIn,seIsloggedIn]=useState(false)
  const navigate=useNavigate()
  console.log(userData);
  

  const handleRegister=async(e)=>{
    e.preventDefault()
    const{username,email,password}=userData
    if(username && email&&password){
      // api call
      try { 
        const result= await registerApi(userData)
        // console.log(result);
      
      if(result.status==200){
        navigate('/login')
        setUserData({username:"",email:"",password:""})
      }
      else{
        if(result.status==406){
          alert(result.response.data)
          setUserData({username:"",email:"",password:""})
        }
      }
        
      } catch (err) {
        console.log(err);
        
        
      }
    }
    else{
      toast.warning('please fill the form completely')
    }
  }

  const handleLogin=async(e)=>{
    e.preventDefault()

    if(userData.email && userData.password){
      // api call
      try {
        const result=await loginApi(userData)
        console.log(result);

        if(result.status==200){

          seIsloggedIn(true)
          sessionStorage.setItem("user",JSON.stringify(result.data.user))
          sessionStorage.setItem("token",result.data.token)
          setIsAuthorised(true)

          setTimeout(() => {           
            setUserData({username:"",email:"",password:""})
            navigate('/')
            seIsloggedIn(false)
            
          }, 2000);

        }  
        else{
          if(result.status==404){
            toast.error(result.response.data)
          }
        }      
        
      } catch (err) {
        console.log(err);
        
        
      }
    }
    else{
      toast.warning('please fill the form completely')
    }
  }
    useEffect(() => {
    AOS.init({ duration: 1000, once: true })
  }, [])
  return (
    <>
<div className='d-flex justify-content-center mt-5 mb-5' style={{flexWrap:'wrap'}}>
<div className='row' style={{width:'950px',height:'500px',backgroundColor:'#F3F7F0',borderRadius:'30px 0px'}}>
      <div className='col-lg-6'>
        <img data-aos="zoom-in-right" src={register} alt="" style={{height:'500px',width:'500px'}}/>

      </div>
      <div className='col-lg-6 p-5'>
      <h1 style={{fontWeight:'bold', color:'#444f45'}}>Project Fair</h1>
      <h6 className='mb-4' style={{fontWeight:'bold', color:'#444f45'}}>Sign Up to your account</h6>
      {insideRegister&&
      <input onChange={e=>setUserData({...userData,username:e.target.value})} value={userData.username} style={{width:'350px',height:'50px', padding:'10px', marginBottom:'20px'}} placeholder='Username' type="text" />}
      <input onChange={e=>setUserData({...userData,email:e.target.value})} value={userData.email} style={{width:'350px',height:'50px', padding:'10px', marginBottom:'20px'}} placeholder='Email address' type="text" />
      <input onChange={e=>setUserData({...userData,password:e.target.value})} value={userData.password} style={{width:'350px',height:'50px', padding:'10px', marginBottom:'20px'}} placeholder='Password' type="text" />

      {insideRegister?
      <button onClick={handleRegister} style={{width:'350px',height:'40px',border:'none', borderRadius:'5px',backgroundColor:'#93B874',fontWeight:'bold', color:'#444f45'}}>Sign Up</button>
      :
      <button onClick={handleLogin} style={{width:'350px',height:'40px',border:'none', borderRadius:'5px',backgroundColor:'#93B874',fontWeight:'bold', color:'#444f45'}}>Sign In {isloggedIn &&
        <Spinner animation="border" size="sm" variant="light" />
        }</button>
      }
      
      {insideRegister?
      <p>Already have an account<Link to={'/login'} style={{textDecoration:'none'}}>Login</Link></p>
      :
      <p>Don't have an account yet <Link to={'/register'} style={{textDecoration:'none'}}>Register</Link></p>
      }
      
      </div>
    </div>
</div>
    </>
  )
}

export default Authentication
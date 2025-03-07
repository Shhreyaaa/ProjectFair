import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import View from '../Components/View'
import Profile from '../Components/Profile'



function Dashboard() {
  const [username,setUsername]=useState("")

  useEffect(() => {
   if(sessionStorage.getItem("user")){
    setUsername(JSON.parse(sessionStorage.getItem("user")).username)

   }
   else{
    setUsername("")
   }
  },[] )
  
  return (
    <>
    <Header/>
    <div className='row p-5'>
      <div className='col-lg-8'>
        <h2>Welcome <span className='text-warning'>{username.split(" ")[0]}</span></h2>
        <View/>        
      </div>

      <div className='col-lg-4'>
        <Profile/>
      </div>

    </div>

    </>
  )
}

export default Dashboard
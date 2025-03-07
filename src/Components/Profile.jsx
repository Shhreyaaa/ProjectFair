import React, { useEffect } from 'react'
import { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import profile from '../assets/profile.png'
import SERVER_URL from '../../services/serverUrl';
import { toast } from 'react-toastify';
import { updateProfileApi } from '../../services/allApi';





function Profile() {
  const [open, setOpen] = useState(false);
  const [userDetails,setuserDetails]=useState({username:"",email:"",password:"",linkedin:"",github:"",profile:""})
  const [preview,setPreview]=useState("")
  const [existingProfileImg,setExistingProfileImg]=useState("")


  useEffect(() => {
    if(sessionStorage.getItem('user')){
      let existingDetails=JSON.parse(sessionStorage.getItem('user'))
      setuserDetails({...userDetails,username:existingDetails?.username,email:existingDetails?.email,password:existingDetails?.password,linkedin:existingDetails?.linkedin,github:existingDetails?.github})
      setExistingProfileImg(existingDetails?.profile)
    }
    
  }, [open])

  useEffect(() => {
    if(userDetails?.profile){
      setPreview(URL.createObjectURL(userDetails.profile))
    }
    else{
      setPreview("")
    }
  }, [userDetails.profile])

  const handleUpdateProfile=async()=>{
    const {username,email,password,github,linkedin,profile}=userDetails

    if(github&&linkedin){
      // reqBody
      const reqBody=new FormData()
      reqBody.append("username",username)
      reqBody.append("email",email)
      reqBody.append("password",password)
      reqBody.append("github",github)
      reqBody.append("linkedin",linkedin)
      preview? reqBody.append("profile",profile):reqBody.append("profile",existingProfileImg)

      const token=sessionStorage.getItem("token")
      // console.log(token);

      if(token){
        const reqHeader={
          "content-type":preview?"multipart/form-data":"application/json",
          "authorization":`Bearer ${token}`
        }

        try {
          const result=await updateProfileApi(reqBody,reqHeader)
          console.log(result);

          if(result.status==200){
            setOpen(!open)
            sessionStorage.setItem("user",JSON.stringify(result.data))
            
          }          
          
        } catch (err) {
          console.log(err);
          
          
        }

       
      }


    }
    else{
      toast.warning("Enter the field completely")

    }
  }
  
  

  return (
    <>
 <div className='d-flex p-2'>
 <h3>Profile</h3>
 <button onClick={() => setOpen(!open)} aria-controls="example-collapse-text" aria-expanded={open} className='btn '><i class="fa-solid fa-chevron-down"></i></button>
 </div>

    <Collapse in={open}>
        <div id="example-collapse-text">
          <div >
          <label style={{cursor:'pointer',marginTop:'30px'}} >
          <input onChange={(e)=>setuserDetails({...userDetails,profile:e.target.files[0]})} type="file" style={{display:'none'}} />           
          {
            existingProfileImg ? 
              <img style={{borderRadius:'50%',width:'250px',height:'250px', marginLeft:'40px',marginBottom:'30px'}} src={preview?preview:`${SERVER_URL}/uploads/${existingProfileImg}`} alt="Profile" />
            : 
              <img style={{ width: "300px" }} src={preview?preview:profile} alt="Profile" />
            
          }           
              
              
            

          </label> 


          <input onChange={(e)=>setuserDetails({...userDetails,github:e.target.value})}  value={userDetails?.github} className='p-3' style={{width:'380px',height:'45px', marginBottom:'10px'}}  type="text" placeholder='github.com' />
          <input onChange={(e)=>setuserDetails({...userDetails,linkedin:e.target.value})}  value={userDetails?.linkedin} className='p-3' style={{width:'380px',height:'45px', marginBottom:'10px'}} type="text" placeholder='linkedin.com' />
          <button onClick={handleUpdateProfile} style={{width:'380px',height:'45px', marginBottom:'10px',backgroundColor:'rgb(150, 81, 2)',border:'none', borderRadius:'5px', fontWeight:'bold'}}> Update Profile</button>
          
          </div>
        </div>
      </Collapse>
    </>
  )
}

export default Profile
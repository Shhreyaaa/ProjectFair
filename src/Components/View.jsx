import React, { useContext, useEffect, useState } from 'react'
import Add from '../Components/Add'
import Edit from '../Components/Edit'
import { deleteProjectApi, userProjectApi } from '../../services/allApi'
import { addResponseContext, editResponseContext } from '../context/ContextApi'


function View() {
  const {addResponse}=useContext(addResponseContext)
  const {editResponse}=useContext(editResponseContext)

  const [userProjects,setUserProjects]=useState([])

  useEffect(() => {
    getUserProjects()
  }, [addResponse,editResponse])
  

  const getUserProjects=async()=>{
    const token=sessionStorage.getItem("token")

    if(token){
      const reqHeader={
        "content-type":"application/json",
        "authorization":`Bearer ${token}`
      }

      try{
        const result=await userProjectApi(reqHeader)
        console.log(result);
        setUserProjects(result.data)                

      }
      catch(err){
        console.log(err);        

      }
    }
  }

  const handleDeleteProject=async(pid)=>{
    const token=sessionStorage.getItem("token")
   if(token){
    const reqHeader={
      "content-type":"application/json",
      "authorization":`Bearer ${token}`
    }
    try {
      const result=await deleteProjectApi(pid,reqHeader)
      console.log(result);
      if(result.status==200){
        getUserProjects()
      }
      
      
    } catch (err) {
      console.log(err);
      
      
    }
   }
  }
  return (
    <>
    <div className='d-flex justify-content-between p-1 mb-4' style={{marginTop:'100px'}}>
      <div className='' style={{fontWeight:'bold',fontSize:'larger'}}>All Projects</div>
      <div><Add/></div>
    </div>

   { userProjects?.length>0?
    userProjects?.map(projects=>(
    <div className='w-100 d-flex align-items-center justify-content-between mb-2 p-3' style={{height:'60px',border:'2px solid black', borderRadius:'5px'}}>
    
    <div><h5 >{projects?.title}</h5></div>
    <div className='d-flex' style={{justifyContent:'space-around'}}>
        <div className=''>
          <Edit projects={projects}/>
        </div>
        <a href={projects?.github} className='btn'><i className='fa-brands fa-github '></i></a>
        <button onClick={()=>handleDeleteProject(projects._id)} className='btn'><i className='fa-solid fa-trash text-danger'></i></button>
    
    </div>
    </div>
    ))
    :
    <div>No projects added yet</div>    
    }
    </>
  )
}

export default View
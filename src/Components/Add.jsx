import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import add from '../assets/add.png'
import { toast } from 'react-toastify';
import { addProjectApi } from '../../services/allApi';
import { addResponseContext } from '../context/ContextApi';



function Add() {

  const {setAddResponse}=useContext(addResponseContext)

  const[projectDetails,setProjectDetails]=useState({title:"",languages:"",github:"",website:"",overview:"",projectImg:""})
  console.log(projectDetails);  

  const[imgFileStatus,setImgFileStatus]=useState(false)
  const[preview,setPreview]=useState("")
  
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setProjectDetails({title:"",languages:"",github:"",website:"",overview:"",projectImg:""})
  }
  const handleShow = () => setShow(true);

  useEffect(() => {
    if(projectDetails.projectImg.type=="image/png" || projectDetails.projectImg.type=="image/jpg" || projectDetails.projectImg.type=="image/jpeg"){
      setImgFileStatus(true)
      setPreview(URL.createObjectURL(projectDetails.projectImg))
            
    }
    else{
      setImgFileStatus(false)
      setProjectDetails({...projectDetails,projectImg:""})
      setPreview(add)
    }
   
  }, [projectDetails.projectImg])

  const handleAddProject=async()=>{
    const {title,languages,github,website,overview,projectImg}=projectDetails
    if(title && languages && github && website && overview && projectImg){
      

      // reqBody
      const reqBody=new FormData()
      reqBody.append("title",title)
      reqBody.append("languages",languages)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("overview",overview)
      reqBody.append("projectImg",projectImg)

      // reqHeader

      const token=sessionStorage.getItem("token")
      console.log(token);
      
      

      if(token){
        const reqHeader={
          "content-type":"multipart/form-data",
          "authorization":`Bearer ${token}`
        }

              // api call
    try{
      const result=await addProjectApi(reqBody,reqHeader)
      // console.log(result);
      if(result.status==200){
        setAddResponse(result.data)
        toast.success("Project added successfully");
        handleClose()
      }
      else{
        toast.error(result.response.data)
      }
    }
    catch(err){
      console.log(err);
   }   
      }  
      

    }
    else{
      toast.warning("enter the field completely")

    }
  }

 
  
  return (
    <>
    <button onClick={handleShow} style={{border:'none', backgroundColor:'rgb(150, 81, 2)',borderRadius:'2px',height:'30px',width:'120px'}}><i class="fa-solid fa-plus"></i> New Project</button>

    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title style={{color:'rgb(150, 81, 2)',fontWeight:'bold'}}>New Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className='row p-3'>
          <div className='col-lg-4'>
            <label style={{cursor:'pointer'}}> <img src={preview} alt="" style={{width:'220px',height:'220px'}} /><input onChange={e=>setProjectDetails({...projectDetails,projectImg:e.target.files[0]})} type="file" style={{display:'none'}} /></label>

            { !imgFileStatus &&
              <div style={{width:'200px'}}><p className='text-warning' style={{fontSize:'small'}}>*upload only the following file type (jpg, jpeg, png)</p></div>
              }
            
          </div>
          <div className='col-lg-8'>
            <input onChange={e=>setProjectDetails({...projectDetails,title:e.target.value})} className='w-100 p-2 mb-2 mt-2' style={{height:'50px', border:'none', borderRadius:'4px'}} type="text" placeholder='Project Title' />
            <input onChange={e=>setProjectDetails({...projectDetails,languages:e.target.value})} className='w-100 p-2 mb-2' style={{height:'50px', border:'none', borderRadius:'4px'}} type="text" placeholder='Languages Used' />
            <input onChange={e=>setProjectDetails({...projectDetails,github:e.target.value})} className='w-100 p-2 mb-2' style={{height:'50px', border:'none', borderRadius:'4px'}} type="text" placeholder='Project Github Link' />
            <input onChange={e=>setProjectDetails({...projectDetails,website:e.target.value})} className='w-100 p-2 mb-2' style={{height:'50px', border:'none', borderRadius:'4px'}} type="text" placeholder='Project Website Link' />
          </div>
          
          <input onChange={e=>setProjectDetails({...projectDetails,overview:e.target.value})} className=' p-2 mt-3' style={{width:'747px',height:'50px', border:'none', borderRadius:'4px'}} type="text" placeholder='Project Overview' />
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button style={{borderRadius:'5px'}} variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAddProject} style={{borderRadius:'5px'}} variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Add
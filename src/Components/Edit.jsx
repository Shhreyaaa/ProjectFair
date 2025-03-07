import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import SERVER_URL from '../../services/serverUrl';
import { toast } from 'react-toastify';
import { updateProjectApi } from '../../services/allApi';
import { editResponseContext } from '../context/ContextApi';


function Edit({projects}) {

    const{setEditResponse}=useContext(editResponseContext)

    const[projectDetails,setProjectDetails]=useState({id:projects?._id,title:projects?.title,languages:projects?.languages,github:projects?.github,website:projects?.website,overview:projects?.overview,projectImg:""})

    const[imgFileStatus,setImgFileStatus]=useState(false)
    const[preview,setPreview]=useState("")

    const [show, setShow] = useState(false);
  
    const handleClose = () => {
      setShow(false);
      setProjectDetails({id:projects?._id,title:projects?.title,languages:projects?.languages,github:projects?.github,website:projects?.website,overview:projects?.overview,projectImg:""})
    }
    const handleShow = () => {
      setShow(true);
      setProjectDetails({id:projects?._id,title:projects?.title,languages:projects?.languages,github:projects?.github,website:projects?.website,overview:projects?.overview,projectImg:""})

    }

    useEffect(() => {
        if(projectDetails.projectImg.type=="image/png" || projectDetails.projectImg.type=="image/jpg" || projectDetails.projectImg.type=="image/jpeg"){
          setImgFileStatus(true)
          setPreview(URL.createObjectURL(projectDetails.projectImg))
                
        }
        else{
          setImgFileStatus(false)
          setProjectDetails({...projectDetails,projectImg:""})
          setPreview("")
        }
       
      }, [projectDetails.projectImg])
    


    const handleUpdate=async()=>{
      const{id,title,languages,github,website,overview,projectImg}=projectDetails

      if(title && languages && github && website && overview){

        const reqBody= new FormData()
        reqBody.append("title",title)
        reqBody.append("languages",languages)
        reqBody.append("github",github)
        reqBody.append("website",website)
        reqBody.append("overview",overview)
        preview? reqBody.append("projectImg",projectDetails.projectImg):reqBody.append("projectImg",projects.projectImg)

        const token=sessionStorage.getItem("token")

        if(token){
          const reqHeader={
            "content-type":"multipart/form-data",
            "authorization":`Bearer ${token}`
          }

         try {
          const result=await updateProjectApi(id,reqBody,reqHeader)
          console.log(result);

          if(result.status==200){
            setEditResponse(result.data)
            handleClose()
          }
          
         } catch (err) {
          console.log(err);         
          
         }       
          
        }       

      }
      else{
        toast.warning("Please fill the form completely")
      }

    }
    
  return (
    <>
    <button className='btn' onClick={handleShow} ><i class="fa-solid fa-pen-to-square"></i></button>
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title style={{color:'rgb(150, 81, 2)',fontWeight:'bold'}}>Update Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className='row p-3'>
          <div className='col-lg-4'>
            <label style={{cursor:'pointer'}}> 
              <img src={preview?preview:`${SERVER_URL}/uploads/${projects.projectImg}`} alt="" style={{width:'220px',height:'220px'}} /><input onChange={e=>setProjectDetails({...projectDetails,projectImg:e.target.files[0]})} type="file" style={{display:'none'}} />
            </label>

            { !imgFileStatus &&
              <div style={{width:'200px'}}><p className='text-warning' style={{fontSize:'small'}}>*upload only the following file type (jpg, jpeg, png)</p></div>
              }
            
          </div>
          <div className='col-lg-8'>
            <input onChange={e=>setProjectDetails({...projectDetails,title:e.target.value})} className='w-100 p-2 mb-2 mt-2' style={{height:'50px', border:'none', borderRadius:'4px'}} type="text" placeholder='Project Title' value={projectDetails?.title} />
            <input onChange={e=>setProjectDetails({...projectDetails,languages:e.target.value})} className='w-100 p-2 mb-2' style={{height:'50px', border:'none', borderRadius:'4px'}} type="text" placeholder='Languages Used' value={projectDetails.languages} />
            <input onChange={e=>setProjectDetails({...projectDetails,github:e.target.value})} className='w-100 p-2 mb-2' style={{height:'50px', border:'none', borderRadius:'4px'}} type="text" placeholder='Project Github Link' value={projectDetails.github} />
            <input onChange={e=>setProjectDetails({...projectDetails,website:e.target.value})} className='w-100 p-2 mb-2' style={{height:'50px', border:'none', borderRadius:'4px'}} type="text" placeholder='Project Website Link' value={projectDetails.website} />
          </div>
          
          <input onChange={e=>setProjectDetails({...projectDetails,overview:e.target.value})} className=' p-2 mt-3' style={{width:'747px',height:'50px', border:'none', borderRadius:'4px'}} type="text" placeholder='Project Overview' value={projectDetails.overview} />
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button style={{borderRadius:'5px'}} variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleUpdate}  style={{borderRadius:'5px'}} variant="primary">Update</Button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default Edit
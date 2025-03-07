import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { allProjectApi } from '../../services/allApi';
import SERVER_URL from '../../services/serverUrl'
import Modal from 'react-bootstrap/Modal';


function Projects() {
  const [show, setShow] = useState(false);
  const [allProjects,setAllProjects]=useState([])
  const [selectedProject, setSelectedProject] = useState("")
  const [searchKey,setSearchKey]=useState("")
    
  const handleClose = () => {
    setShow(false);
    
  }
  const handleShow = (projects) => {
    setShow(true);
    setSelectedProject(projects)
  }
  

  useEffect(() => {
   getAllProjects()
  }, [searchKey])
  
  
  const getAllProjects=async()=>{

   
    const token=sessionStorage.getItem("token")
    // console.log(token);
    
    
    if(token){
      const reqHeader={
        "content-type":"application/json",
        "authorization":`Bearer ${token}`    
        
      }

      try {
        const result=await allProjectApi(searchKey,reqHeader)
        console.log(result);
        setAllProjects(result.data)
        
        
      } catch (err) {
        console.log(err);
        
      }
  
    }
  }
  return (
    <>
    <div style={{padding:'40px', display:'flex', justifyContent:'space-between'}}>
    <h2 style={{color:'rgb(150, 81, 2)'}}>All Projects</h2>
    <Form inline style={{width:'300px'}} >        
     <Form.Control onChange={(e)=>setSearchKey(e.target.value)} style={{height:'50px', borderRadius:'4px'}} type="text" placeholder="Search project by language" className=""  />
    </Form>

    </div>

   <div className='row' style={{padding:'30px'}}>
   {allProjects?.length>0?
    allProjects.map(projects=>(
    <div className='col-lg-3 mb-4'>
    <Card style={{ width: '15rem',}} onClick={() => handleShow(projects)}>
      <Card.Img variant="top" src={`${SERVER_URL}/uploads/${projects.projectImg}`} alt="" style={{height:'250px',width:'238px'}} />
      <Card.Body>
        <Card.Title style={{textAlign:'center'}}>{projects.title}</Card.Title>
                
      </Card.Body>
    </Card>
</div>
    ))
    
    :
    <div>Project not found</div>
    }
   </div>

   <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Project details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='row'>
                <div className='col-lg-6'>
                    <img src={`${SERVER_URL}/uploads/${selectedProject.projectImg}`}  className='w-100' alt="" />
                </div>

                <div className='col-lg-6'>
                    <h3>{selectedProject.title}</h3>
                    <h4>Languages Used: <span className='text-warning'>{selectedProject.languages}</span></h4>
                    <h4><span className='fs-5'>{selectedProject.overview} </span></h4>
                </div>
            </div>

            <div className='mt-3'>
                <a href={selectedProject.github} className='btn btn-success me-4'style={{width:'174px'}}><i className='fa-brands fa-github'></i></a>
                <a href={selectedProject.website} className='btn btn-success 'style={{width:'174px'}}><i className='fa-solid fa-link'></i></a>
            </div>
        </Modal.Body>
        
      </Modal>
    </>
  )
}

export default Projects
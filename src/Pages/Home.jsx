import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ProjectCard from '../Components/ProjectCard'
import Card from 'react-bootstrap/Card';
import { homeProjectApi } from '../../services/allApi';
import { toast } from 'react-toastify';





function Home() {
  const[homeProjects,setHomeProjects]=useState("")
  const navigate=useNavigate()
  useEffect(() => {
    getHomeProjects()
   
  }, [])
  
  
  const getHomeProjects=async()=>{

    try {
      
      const result=await homeProjectApi()
      // console.log(result);

      if(result.status==200){
        setHomeProjects(result.data)
      }
      
      
    } catch (err) {
      console.log(err);
      
      
    }

  }

  const handleProjects=()=>{
    if(sessionStorage.getItem("token")){
      navigate('/projects')

    }
    else{
      toast.warning('Please login to get full access of our projects')
    }
  }

  return (
    <>
    <div className='d-flex w-100 mt-5' style={{height:'450px',padding:'100px'}}>
      <div style={{width:'400px'}}>
        <h1 style={{fontWeight:'bold'}}><i class="fa-brands fa-docker"></i> Project Fair</h1>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae, voluptates ullam at perspiciatis tenetur dicta! Alias, magni culpa! Aut omnis aspernatur provident cum sequi culpa optio accusantium in sapiente dicta.</p>

        {sessionStorage.getItem("token")?
        <Link to={'/dashboard'}><button style={{border:'none',backgroundColor:'orange', height:'40px',width:'250px',borderRadius:'4px'}}>MANAGE YOUR PROJECTS</button></Link>:
        <Link to={'/login'}><button style={{border:'none',backgroundColor:'orange', height:'40px',width:'200px',borderRadius:'4px'}}>START TO EXPLORE</button></Link>
        }
      </div>
      <div>
        <img src='https://www.bukisweb.com/images/reactjs/web-development.png' style={{marginTop:'-50px', width:'450px',marginLeft:'200px'}} alt="" />
      </div>
    </div>

    <h2 style={{textAlign:'center',marginTop:'20px',color:'orange',marginBottom:'20px'}}>Explore Our Projects</h2>
<marquee >
  <div className='d-flex mb-5'>
 { homeProjects?.length>0?
  
  homeProjects?.map(projects=>(
    <div className='me-5'>
      <ProjectCard displayData={projects}/>
    </div>
  
   ))
   
 :
  <div className='text-danger my-5 fw-bold'>Project not found</div>
  
  }

  </div>
</marquee>

<button onClick={handleProjects} className='btn btn-link' style={{marginLeft:'510px'}}>Click here to view more projects</button>

{/* testimonial */}
<h2 style={{textAlign:'center',marginTop:'20px',color:'orange',marginBottom:'20px'}}>Our Testimonial</h2>

    <div className='d-flex justify-content-center ' style={{marginBottom:'100px'}}>
    <Card style={{ width: '18rem'}}className='p-3 me-5'>
      
      <Card.Body>
        <Card.Title>
          <div className='text-center'>
            <img className='text-center rounded-circle w-50' src="https://t3.ftcdn.net/jpg/02/30/60/82/360_F_230608264_fhoqBuEyiCPwT0h9RtnsuNAId3hWungP.jpg" alt="" />
          </div>
        </Card.Title>
        <Card.Text>
          <h5 className='text-center mt-3'>Max miller</h5>
          <div className='d-flex justify-content-center mt-3'>
          <i className='fa-solid fa-star text-warning'></i>
          <i className='fa-solid fa-star text-warning'></i>
          <i className='fa-solid fa-star text-warning'></i>
          <i className='fa-solid fa-star text-warning'></i>
          </div>
          <p className='mt-3' style={{textAlign:'center'}}>Lorem, ipsum dolor sit amet liber consectetur adipisicing elit. Eius rem est temporibus quaerat quo, itaque sint inventore nobis dolores.</p>
        </Card.Text>
        
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }} className='p-3 me-5'>
      
      <Card.Body>
        <Card.Title>
          <div className='text-center'>
            <img className='text-center rounded-circle w-50' src="https://img.freepik.com/premium-vector/cute-woman-avatar-profile-vector-illustration_1058532-14592.jpg" alt="" />
          </div>
        </Card.Title>
        <Card.Text>
          <h5 className='text-center mt-3'>Nita Sharma</h5>
          <div className='d-flex justify-content-center mt-3'>
          <i className='fa-solid fa-star text-warning'></i>
          <i className='fa-solid fa-star text-warning'></i>
          <i className='fa-solid fa-star text-warning'></i>
          <i className='fa-solid fa-star text-warning'></i>
          </div>
          <p className='mt-3' style={{textAlign:'center'}}>Lorem, ipsum dolor sit amet liber consectetur adipisicing elit. Eius rem est temporibus quaerat quo, itaque sint inventore nobis dolores.</p>
        </Card.Text>
        
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }}className='p-3'>
      
      <Card.Body>
        <Card.Title>
          <div className='text-center'>
            <img className='text-center rounded-circle w-50' src="https://img.freepik.com/premium-vector/businessman-avatar-illustration-cartoon-user-portrait-user-profile-icon_118339-5507.jpg" alt="" />
          </div>
        </Card.Title>
        <Card.Text>
          <h5 className='text-center mt-3'>David John</h5>
          <div className='d-flex justify-content-center mt-3'>
          <i className='fa-solid fa-star text-warning'></i>
          <i className='fa-solid fa-star text-warning'></i>
          <i className='fa-solid fa-star text-warning'></i>
          <i className='fa-solid fa-star text-warning'></i>
          </div>
          <p className='mt-3' style={{textAlign:'center'}}>Lorem, ipsum dolor sit amet liber consectetur adipisicing elit. Eius rem est temporibus quaerat quo, itaque sint inventore nobis dolores.</p>
        </Card.Text>
        
      </Card.Body>
    </Card>
    </div>

</>
  )
}

export default Home
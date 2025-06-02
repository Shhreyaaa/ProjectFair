import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { tokenAuthContext } from '../context/ContextApi';



function Header() {
  const {setIsAuthorised}=useContext(tokenAuthContext)
  const navigate=useNavigate()
  const logOut=()=>{
    sessionStorage.clear()
    setIsAuthorised(false)
    navigate('/')

  }
  return (
    <>
    <Navbar className="" style={{backgroundColor:'#93b874',height:'80px'}} expand="lg">
        <Container>
        <Link style={{textDecoration:'none'}} to={'/'}><Navbar.Brand href="#home" style={{fontWeight:'bold',fontSize:'25px'}}><i class="fa-solid fa-biohazard"></i>
            PROJECT FAIR
          </Navbar.Brand></Link>
          <button onClick={logOut} className='' style={{border:'none', fontWeight:'bold',background:'none',fontSize:'20px'}} >Log out <i class="fa-solid fa-arrow-right-from-bracket"></i></button>
        </Container>
        
      </Navbar>

    </>
  )
}

export default Header
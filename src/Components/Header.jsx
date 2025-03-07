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
    <Navbar className="" style={{backgroundColor:'rgb(150, 81, 2)'}}>
        <Container>
        <Link style={{textDecoration:'none'}} to={'/'}><Navbar.Brand href="#home" style={{fontWeight:'bold'}}><i class="fa-brands fa-docker"></i>
            PROJECT FAIR
          </Navbar.Brand></Link>
          <button onClick={logOut} className='' style={{border:'none', fontWeight:'bold',backgroundColor:'rgb(150, 81, 2)'}} >LogOut</button>
        </Container>
        
      </Navbar>

    </>
  )
}

export default Header
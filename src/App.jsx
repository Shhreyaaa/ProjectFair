import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './Pages/Dashboard'
import Projects from './Pages/Projects'
import Home from './Pages/Home'
import Authentication from './Pages/Authentication'
import Footer from './Components/Footer'
import { ToastContainer } from 'react-toastify';
import { useContext } from 'react'
import { tokenAuthContext } from './context/ContextApi'



function App() {
    const {isAuthorised}=useContext(tokenAuthContext)

  return (
    <>
<ToastContainer
position="top-right"
theme="colored"
/>
     <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<Authentication/>}></Route>
      <Route path='/register' element={<Authentication insideRegister={true}/>}></Route>
      <Route path='/dashboard' element={isAuthorised?<Dashboard/>:<Navigate to={'/login'}/>}></Route>
      <Route path='/projects' element={isAuthorised?<Projects/>:<Navigate to={'/login'}/>}></Route>
     </Routes>
     <Footer/>
    </>
  )
}

export default App

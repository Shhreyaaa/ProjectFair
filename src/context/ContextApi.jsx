import React, { createContext, useEffect, useState } from 'react'

export const addResponseContext=createContext()
export const editResponseContext=createContext()
export const tokenAuthContext=createContext()

function ContextApi({children}) {
    const [addResponse,setAddResponse]=useState("")
    const [editResponse,setEditResponse]=useState("")
    const [isAuthorised,setIsAuthorised]=useState(false)

    useEffect(() => {
      if(sessionStorage.getItem("token")){
        setIsAuthorised(true)
      }
      else{
        setIsAuthorised(false)
      }
        
      
    }, [isAuthorised])
    
  return (
    <>
      <tokenAuthContext.Provider value={{isAuthorised,setIsAuthorised}}>
        <editResponseContext.Provider value={{editResponse,setEditResponse}}>
          <addResponseContext.Provider value={{addResponse,setAddResponse}}>
            {children}
          </addResponseContext.Provider>
        </editResponseContext.Provider>        
      </tokenAuthContext.Provider>
    </>
  )
}

export default ContextApi
import React from 'react'
import { Navigate } from 'react-router-dom'
import { useUserAuth } from '../../context/UserAuthContext'
const ProtectedRoute = ({children}) => {


    
    // if user exit then can acces any page with routing else redirect to login page
        let {user} = useUserAuth()
    
    if(!user){
      return  <Navigate to = "/login"/>
    }
  return (
    <div>{children}</div>
  )
}

export default ProtectedRoute
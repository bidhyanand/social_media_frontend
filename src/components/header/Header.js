import React from 'react'
import {  useNavigate } from 'react-router-dom'

const Header = () => {

 const navigate = useNavigate()
  return (
    <div className='flex flex-row justify-between px-10 py-7 border-b-2 bg-slate-400  ' >
         <div className='text-2xl font-bold italic cursor-pointer ' onClick={()=>navigate("/")} >
            Social Media App
            </div>  

            <div className='flex gap-20 cursor-pointer ' >
                <div onClick={()=>navigate('/login')} >
                    
                    Login
                </div>

                <div onClick={()=>navigate('/signup')} >
                    signUp
                </div>
                <div>
                    Logout
                </div>
                
                </div>    
    </div>
  )
}

export default Header
import React from 'react'
import { Routes , Route} from 'react-router-dom'
import Feeds from '../feeds/Feeds'
import Login from '../login/Login'
import Signup from '../signup/Signup'

const Routing = () => {
  return (
        <Routes>
            <Route path='/' element={<Feeds/>}/>
            <Route path = {"/login"} element = {<Login/>} />
            <Route path = {"/signup"} element = {<Signup/>}/>
        </Routes>
  )
}

export default Routing
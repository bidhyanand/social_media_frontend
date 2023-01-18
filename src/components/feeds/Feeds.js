import React from 'react'
import { useUserAuth } from '../../context/UserAuthContext'

const Feeds = () => {
  const {user} = useUserAuth()
  console.log(user,"ma user ho");
  return (
    <div>
      
    </div>
  )
}

export default Feeds
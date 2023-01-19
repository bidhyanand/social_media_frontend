import React, { useEffect, useState } from 'react'

import { collection, getDocs } from "firebase/firestore";
import { db } from '../../firebase/Firebase';
import { toast } from 'react-toastify';
import { auth } from '../../firebase/Firebase';
console.log(auth,"hello");

const Feeds = () => {

  // to store all the data from the db
const [data,setData] = useState([])

const [userData,setUserData] = useState([])
console.log(data,"users data ho");

useEffect(()=>{
  const fetData = async () =>{
    let list = []
    try {
      const querySnapshot = await getDocs(collection(db,"post"));
      querySnapshot.forEach((doc) => {
        list.push(doc.data())
        console.log(doc.id, " => ", doc.data());
      });
      setData(list)
    } catch (error) {
      toast.error(error.message)
      
    }
    
  }

fetData()
},[])

useEffect(()=>{
  const fetchData = async () =>{
    let usersData = []
    try {
      const querySnapshot = await getDocs(collection(db,"users"));
      querySnapshot.forEach((doc) => {
        usersData.push(doc.data())
        console.log(doc.id, " => ", doc.data());
      });
      setUserData(usersData)
    } catch (error) {
      toast.error(error.message)
      
    }
    
  }

fetchData()
},[])

  return (
    <div>
      {data.map((items,index)=>{
        console.log(items.image,"map items");
        return(
          <div key={index} className="flex justify-center py-5 " >
           <div className='shadow-xl border-2 rounded-xl border-stone-400 border-double divide-y-2 divide-red-400 w-1/3 ' >
           <div className='py-5 px-2' >
              {items.status.post}
            </div>
          {
            Object.keys(items.image.imageURL).length !==0 ?

            <div className='px-20 py-2' >
            <img src={items.image.imageURL}  width={200}  />
          </div>
          :
          null
          }
            
           </div>

          </div>
        )
      })}
      
    </div>
  )
}

export default Feeds
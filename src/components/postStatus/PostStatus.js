import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import React, { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { auth, db, storage } from '../../firebase/Firebase'
console.log(auth,"hello auth");

const PostStatus = () => {
  const [post,setPost] = useState()
  const[file,setFile] = useState("")
  const[image,setImage]= useState()
  const[imageURL,setImageURL] = useState({})

  const navigate = useNavigate()

  // function to handle text area
  const handleTextArea = (e) =>{
return(
setPost(e.target.value)
)
  }

// to submit data and stored in firebase
const handleSubmit = async () =>{
  try {
   

   setDoc(doc(db, "post", auth.currentUser.uid), {
      status:{post},
      image:{imageURL},
      
      timeStamp: serverTimestamp(),
    });
    toast.success("Post created sucessfully");
    navigate("/feeds");
  } catch (error) {
    toast.error(error.message);
  }




  

}

// function to handle imagees
useEffect(()=>{
  const uploadFile=()=>{
    const name = new Date ().getTime() + file.name
    const storageRef = ref(storage,file.name)
    const uploadTask = uploadBytesResumable(storageRef, file);

uploadTask.on('state_changed', 
(snapshot) => {
 
  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  console.log('Upload is ' + progress + '% done');
  
  switch (snapshot.state) {
    case 'paused':
      console.log('Upload is paused');
      break;
    case 'running':
      console.log('Upload is running');
      break;
      default:
      break;
  }
}, 
(error) => {
  console.log(error);
}, 
() => {
  
  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
   setImage ((prev)=>({...prev,img:downloadURL}))
   setImageURL(downloadURL)
  });
}
);
    

  }
file&&uploadFile()
},[file])

  return (
  
         
          <div className=" pt-10  flex justify-center  ">
            
              <div className="shadow sm:overflow-hidden sm:rounded-md">
                <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                    <div className="  text-gray-700 text-center text-lg font-extrabold underline ">
                      
                              Post Your Feed Here!!!
                      
                     </div>

                  <div>
                    <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                      What's on your mind ?
                    </label>
                    <div className="mt-3">
                      <textarea
                        id="about"
                        name="about"
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="write something................"
                        defaultValue={''}
                        onChange={handleTextArea}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Express your feelings be chill && enjoy your day.
                    </p>
                  </div>

                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700">Photo</label>
                    <div className="mt-1 flex items-center">
                      <span className="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </span>
                      <button
                        type="button"
                        className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        Change
                      </button>
                    </div>
                  </div> */}

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Profile picture</label>
                    <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6  ">
                      <img  src= {imageURL } width={100} height={100} ></img>
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={(e)=>setFile(e.target.files[0])}
                            
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Save
                  </button>
                </div>
              </div>
          </div>

      
  )
}

  

export default PostStatus
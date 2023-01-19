import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, db , storage} from "../../../firebase/Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Signup = () => {
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();
  const[file,setFile] = useState("")
  const[image,setImage]= useState()
  const[imageURL,setImageURL] = useState({})
  // const[perc,setPerc] = useState(null)


  useEffect(()=>{
    const uploadFile=()=>{
      // const name = new Date ().getTime() + file.name
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

  // state to save the user images

  //  to add user in the att and collection field simultaneously.
  const onSubmit = async (data) => {

    // to add user in the other collection only
    //   try {
    //   const response = await   addDoc  (collection(db,"new-user"),{

    //       email : data.email,
    //       password : data.password,
    //       displayName : data.displayName
    //     });
    // console.log(response,"hello user");

    //     toast.success("user created sucessfully");
    //     navigate("/login")

    //   } catch (error) {
    //     toast.error(error.message);
    //   }

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      console.log(response, "hell");

      await setDoc(doc(db, "users", response.user.uid), {
        ...data,
        image:{imageURL},
        
        timeStamp: serverTimestamp(),
      });
      toast.success("user created sucessfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-center items-center flex-col pt-5 ">
        <div className="text-2xl py-2  "> Firebase Auth Signup</div>
        <div className="py-5 flex flex-col gap-5 ">
          <div>
            <div className=" text-center pb-2 text-lg font-bold">
              Enter Full Name
            </div>

            <input
              className="bg-slate-500 border-2 px-10 py-2 rounded-md "
              {...register("displayName", { required: true })}
              placeholder={"Enter Full Name"}
            />
          </div>
          <div>
            <div className="text-center pb-2 text-lg font-bold ">
              Enter Email-address
            </div>
            <input
              className="bg-slate-500 border-2 px-10 py-2 rounded-md"
              {...register("email", { required: true })}
              placeholder={"Enter Email Address"}
            />
          </div>

          <div>
            <div className=" text-center pb-2 text-lg font-bold">
              Enter Password
            </div>

            <input
              className="bg-slate-500 border-2 px-10 py-2 rounded-md "
              {...register("password", { required: true })}
              placeholder={"Enter Password"}
            />
          </div>
        </div>
        <div className="pb-5" >
            <div className=" text-center pb-2 text-lg font-bold">
              Enter Your Profile Image
            </div>

            <input
              className="bg-slate-500 border-2  py-2 rounded-md "
              id="file"
              type={"file"}
              // value={image}
              onChange={(e)=>setFile(e.target.files[0])}
              required
            />
          </div>
        <div className="pb-5">
          <input
            className="hover:bg-blue-500 border-2 px-10 py-2 rounded-md cursor-pointer  "
            
            type={"submit"}
          />
        </div>

       

        <div className="py-5 px-7 border-2  ">
          Already have an account?{" "}
          <Link to={"/Login"} className="text-blue-500 underline ">
            Login
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Signup;

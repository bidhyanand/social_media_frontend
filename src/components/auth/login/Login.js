import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  validateEmail,
  validatePassword,
} from "../../../utils/ValidateUserFields";
// import{signIn} from '../../context/UserAuthContext'
import { useUserAuth } from "../../../context/UserAuthContext";

const Login = () => {
const navigate = useNavigate()

const { signIn } = useUserAuth();
  
  const {
    register,
    handleSubmit,
  } = useForm();

  // handle form
  // const onSubmit = (data) => {
  //   console.log(data);
  //   if (!validateEmail(data.email)) {
  //     toast.error("Please enter a valid mail");
  //   } else if (!validatePassword(data.password)) {
  //     toast.error(
  //       "Password must be minimum 3 characters and maximum 10"
  //     );
  //   } else {
  //     toast.success("user created sucessfully");
  //   }
  // };

  const onSubmit = async (data) => {
    try {
      await signIn(data.email, data.password);
      toast.success("Login sucessfully");
      navigate("/feeds")

    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-center items-center flex-col ">
        <div className="text-2xl py-2 underline text-blue-500 ">Firebase Auth Login</div>
        <div className="py-5 flex flex-col gap-5 ">
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
          {/* {errors.password && <span>This field is required</span>} */}
        </div>
       <div className="pb-5" >
       <input
          className="hover:bg-blue-500 border-2 px-10 py-2 rounded-md cursor-pointer  "
          type={"submit"}
        />
       </div>
        <div className="py-5 px-7 border-2  " >
          Don't have account? <Link to={"/signup"} className="text-blue-500 underline " >Signup</Link>
        </div>
      </div>
    </form>
  );
};

export default Login;

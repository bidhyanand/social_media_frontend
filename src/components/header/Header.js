import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserAuth } from "../../context/UserAuthContext";

const Header = () => {
  const navigate = useNavigate();

  // user log out account
  const { logout } = useUserAuth();

  const handleLogout = async () => {
    try {
      toast.success("Logged Out account");
      await logout();

    } catch (error) {
      toast.error(error.message);
    }
  };

  // to get the current path
  const path = window.location.pathname;

  return (
    <div
      className="flex flex-row justify-between px-10 py-7 border-
    b-2 bg-slate-400  "
    >
      <div
        className="text-2xl font-bold italic cursor-pointer "
        onClick={() => navigate("/")}
      >
        Social Media App
      </div>

      {path === "/" ? (
        <div className="flex gap-10">
          <div
            onClick={() => navigate("/login")}
            className="flex gap-20 cursor-pointer "
          >
            Login
          </div>

          <div
            onClick={() => navigate("/signup")}
            className="flex gap-20 cursor-pointer "
          >
            signUp
          </div>
        </div>
      ) : path === "/login" ? (
        <>
          <div
            onClick={() => navigate("/signup")}
            className="flex gap-20 cursor-pointer "
          >
            signUp
          </div>{" "}
        </>
      ) : path === "/signup" ? (
        <>
          <div onClick={() => navigate("/login")} className="flex gap-20 cursor-pointer ">
            Login
          </div>
        </>
      ) : path === "/feeds" ? (
        <>
          <div
            onClick={()=> navigate ('/feeds/post') }
            className="flex gap-20 cursor-pointer "
          >
            Create Post
          </div>
          <div
            onClick={handleLogout}
            className="flex gap-20 cursor-pointer "
          >
            Logout
          </div>
        </>
      ) : (
        <>""</>
      )}
    </div>
  );
};

export default Header;

import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../auth/login/Login";
import Signup from "../auth/signup/Signup";
import Feeds from "../feeds/Feeds";
import PostStatus from "../postStatus/PostStatus";
import ProtectedRoute from "./ProtectedRoute";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={""} />
      <Route
        path={"/feeds"}
        element={
          <ProtectedRoute>
            <Feeds />
          </ProtectedRoute>
        }
      />
      <Route
        path="/feeds/post"
        element={
          <ProtectedRoute>
            <PostStatus />
          </ProtectedRoute>
        }
      />
      <Route path={"/login"} element={<Login />} />
      <Route path={"/signup"} element={<Signup />} />
    </Routes>
  );
};

export default Routing;

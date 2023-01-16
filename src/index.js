import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Header from "./components/header/Header";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router-dom";
import Routing from "./components/routing/Router";

import 'react-toastify/dist/ReactToastify.css';
const router = createBrowserRouter([
  {
    path :"*",
    element : <App/>
  }
])

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ToastContainer />

    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

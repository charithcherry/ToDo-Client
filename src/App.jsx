import Navbar from "./components/Navbar";
import Login from "./pages/login";
import ToDo from "./pages/ToDo";
import "./css/app.css";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import axios from "axios"


const App = () => {
  const [user,setUser] = useState(null)
useEffect(()=>{
  const getUser = async()=>{
    const instance = axios.create({
      withCredentials: true
    })
    const config = {
      headers:{
        "Accept" : "application/json",
        "Content-Type":"application/json",
        "Access-Control-Allow-Credentials":true
      }
    };
    try {
      const response = await instance.get("http://localhost:5000/auth/login/success",config)
      if(response.status===200){
        setUser(response.data.user)
      }
      else{
      throw new Error("authentication failed")
      }
    } catch (error) {
      console.log(error)
    }
  }
  getUser();
},[])
  console.log(user)
  return (
    <BrowserRouter>
      <div>
        <Navbar user ={user}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={user ? <Navigate to='/'/>:<Login/>} />
          <Route exact path="/toDo" element={<ToDo user={user}/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
  
}
export default App;

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { Component } from 'react';
import Signin from "./pages/Signin";
import SignUp from "./pages/User/SignUp";
import AdminProfile from "./pages/Admin/AdminProfile";
import './App.css';

export default function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          
          <Route path="/Signin" element={<Signin />}></Route>
          <Route path="/SignUp" element={<SignUp />}></Route>
          <Route path="/AdminProfile" element={<AdminProfile />}></Route>

        </Routes>
      </div>
      </Router>
  );
}
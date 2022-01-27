import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { Component } from 'react';
import Login from "./pages/User/Login";
import SignUp from "./pages/User/SignUp";
import './App.css';
import CompanySignUp from "./pages/Company/SignUp";
import CompanyLogin from "./pages/Company/Login";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          
          <Route path="/Login" element={<Login />}></Route>
          <Route path="/SignUp" element={<SignUp />}></Route>
        </Routes>
      </div>
      </Router>
  );
}
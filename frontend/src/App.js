import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { Component } from "react";
import Signin from "./pages/Signin";
import SignUp from "./pages/User/SignUp";
import AdminProfile from "./pages/Admin/AdminProfile";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import UserProfile from "./pages/User/UserProfile";
import CompanyProfile from "./pages/Company/CompanyProfile";
import Mainpage from "./pages/Mainpage";
import UserHomepage from "./pages/User/UserHomepage";
import ViewApplicants from "./pages/Company/ViewApplicants";
import CompanyHomePage from "./pages/Company/CompanyHomePage";
import "./App.css";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* <Route path="/" element={<Mainpage />}></Route>
          <Route path="/Signin" element={<Signin />}></Route>
          <Route path="/SignUp" element={<SignUp />}></Route>
          <Route path="/AdminProfile" element={<AdminProfile />}></Route>
          <Route path="/AdminDashboard" element={<AdminDashboard />}></Route>
          <Route path="/UserProfile" element={<UserProfile />}></Route>
          <Route path="/CompanyProfile" element={<CompanyProfile />}></Route>
          <Route path="/UserHomePage" element={<UserHomepage />}></Route>
          <Route path="/ViewApplicants" element={<ViewApplicants />}></Route> */}
          <Route path="/" element={<CompanyHomePage />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

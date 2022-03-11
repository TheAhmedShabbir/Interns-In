import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { Component } from "react";
import Signin from "./pages/Signin";
import SignUp from "./pages/User/SignUp";
import CompanySignUp from "./pages/Company/CompanySignUp";
import AdminProfile from "./pages/Admin/AdminProfile";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import UserAbout from "./pages/User/UserAbout";
import UserProfile from "./pages/User/UserProfile";
import CompanyProfile from "./pages/Company/CompanyProfile";
import Mainpage from "./pages/Mainpage";
import UserHomepage from "./pages/User/UserHomepage";
import ViewApplicants from "./pages/Company/ViewApplicants";
import CompanyHomePage from "./pages/Company/CompanyHomePage";
import Forums from "./pages/Forums";
import ForumTopic from "./pages/ForumTopic";
import Notifications from "./pages/Notifications";
import PostJob from "./pages/Company/PostJob";
import CompanySignIn from "./pages/Company/CompanySignIn";
import SavedJobs from "./pages/User/SavedJobs";
import "./App.css";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Mainpage />}></Route>
          <Route path="/Signin" element={<Signin />}></Route>
          <Route path="/SignUp" element={<SignUp />}></Route>
          <Route path="/CompanySignIn" element={<CompanySignIn />}></Route>
          <Route path="/CompanySignUp" element={<CompanySignUp />}></Route>
          <Route path="/AdminProfile" element={<AdminProfile />}></Route>
          <Route path="/AdminDashboard" element={<AdminDashboard />}></Route>
          <Route path="/UserAbout" element={<UserAbout />}></Route>
          <Route path="/UserProfile" element={<UserProfile />}></Route>
          <Route path="/CompanyProfile" element={<CompanyProfile />}></Route>
          <Route path="/UserHomePage" element={<UserHomepage />}></Route>
          <Route path="/ViewApplicants" element={<ViewApplicants />}></Route>
          <Route path="/CompanyHomePage" element={<CompanyHomePage />}></Route>
          <Route path="/Forums" element={<Forums />}></Route>
          <Route path="/ForumTopic" element={<ForumTopic />}></Route>
          <Route path="/Notifications" element={<Notifications />}></Route>
          <Route path="/savedJobs" element={<SavedJobs />}></Route>
          <Route path="/PostJob" element={<PostJob />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

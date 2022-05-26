import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { Component } from "react";
import SignIn from "./pages/SignIn";
import UserSignUp from "./pages/User/UserSignUp";
import CompanySignUp from "./pages/Company/CompanySignUp";
import Shortlisted from "./pages/Company/Shortlisted";
import AdminProfile from "./pages/Admin/AdminProfile";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import UserAbout from "./pages/User/UserAbout";
import UserProfile from "./pages/User/UserProfile";
import CompanyProfile from "./pages/Company/CompanyProfile";
import Mainpage from "./pages/Mainpage";
import UserHomepage from "./pages/User/UserHomepage";
import CompanyHomePage from "./pages/Company/CompanyHomePage";
import Forums from "./pages/Forums";
import ForumTopic from "./pages/ForumTopic";
import UserNotifications from "./pages/User/UserNotifications";
import CompanyNotifications from "./pages/Company/CompanyNotifications";
import AdminNotifications from "./pages/Admin/AdminNotifications";
import PostJob from "./pages/Company/PostJob";
import SavedJobs from "./pages/User/SavedJobs";
import CompanyForums from "./pages/Company/CompanyForum";
import CompanyForumTopic from "./pages/Company/CompanyForumTopic";
import "./App.css";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Mainpage />}></Route>
          <Route path="/SignIn" element={<SignIn />}></Route>
          <Route path="/UserSignUp" element={<UserSignUp />}></Route>
          <Route path="/CompanySignUp" element={<CompanySignUp />}></Route>
          <Route path="/AdminProfile" element={<AdminProfile />}></Route>
          <Route path="/AdminDashboard" element={<AdminDashboard />}></Route>
          <Route path="/UserAbout" element={<UserAbout />}></Route>
          <Route path="/UserProfile" element={<UserProfile />}></Route>
          <Route path="/CompanyProfile" element={<CompanyProfile />}></Route>
          <Route path="/shortlisted" element={<Shortlisted />}></Route>
          <Route path="/UserHomePage" element={<UserHomepage />}></Route>
          <Route path="/CompanyHomePage" element={<CompanyHomePage />}></Route>
          <Route path="/CompanyForums" element={<CompanyForums />}></Route>
          <Route path="/CompanyForumTopic" element={<CompanyForumTopic/>}></Route>
          <Route path="/Forums" element={<Forums />}></Route>
          <Route path="/ForumTopic/:id" element={<ForumTopic />}></Route>
          <Route
            path="/UserNotifications"
            element={<UserNotifications />}
          ></Route>
          {/* <Route
            path="/CompanyNotifications"
            element={<CompanyNotifications />}
          ></Route> */}
          {/* <Route
            path="/AdminNotifications"
            element={<AdminNotifications />}
          ></Route> */}
          <Route path="/savedJobs" element={<SavedJobs />}></Route>
          <Route path="/PostJob" element={<PostJob />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

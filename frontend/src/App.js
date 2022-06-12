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
import PostJob from "./pages/Company/PostJob";
import SavedJobs from "./pages/User/SavedJobs";
import AppliedJobs from "./pages/User/AppliedJobs";
import "./App.css";
import { AccountVerify } from "./pages/verify";
import { AccountNotVerified } from "./pages/account-not-verified";
import {
  AuthorizedRoute,
  EnrouteToDashboard,
} from "./authorization/authorized-routes";





export default function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <EnrouteToDashboard>
                <Mainpage />
              </EnrouteToDashboard>
            }
          ></Route>
          <Route
            path="/SignIn"
            element={
              <EnrouteToDashboard>
                <SignIn />
              </EnrouteToDashboard>
            }
          ></Route>
          <Route
            path="/UserSignUp"
            element={
              <EnrouteToDashboard>
                <UserSignUp />
              </EnrouteToDashboard>
            }
          ></Route>
          <Route path="/CompanySignUp" element={<CompanySignUp />}></Route>
          <Route path="/AdminProfile" element={<AdminProfile />}></Route>
          <Route
            path="/AdminDashboard"
            element={
              <AuthorizedRoute>
                <AdminDashboard />
              </AuthorizedRoute>
            }
          ></Route>
          <Route
            path="/UserAbout"
            element={
              <AuthorizedRoute>
                <UserAbout />
              </AuthorizedRoute>
            }
          ></Route>
          <Route
            path="/UserProfile"
            element={
              <AuthorizedRoute>
                <UserProfile />
              </AuthorizedRoute>
            }
          ></Route>
          <Route
            path="/CompanyProfile"
            element={
              <AuthorizedRoute>
                <CompanyProfile />
              </AuthorizedRoute>
            }
          ></Route>
          <Route
            path="/shortlisted"
            element={
              <AuthorizedRoute>
                <Shortlisted />
              </AuthorizedRoute>
            }
          ></Route>
          <Route
            path="/UserHomePage"
            element={
              <AuthorizedRoute>
                <UserHomepage />
              </AuthorizedRoute>
            }
          ></Route>
          <Route
            path="/CompanyHomePage"
            element={
              <AuthorizedRoute>
                <CompanyHomePage />
              </AuthorizedRoute>
            }
          ></Route>
          <Route
            path="/AppliedJobs"
            element={
              <AuthorizedRoute>
                <AppliedJobs />
              </AuthorizedRoute>
            }
          ></Route>
          <Route path="verify" element={<AccountVerify />}></Route>
          <Route path="unverified" element={<AccountNotVerified />}></Route>
          {/* <Route path="/CompanyForums" element={<CompanyForums />}></Route>
          <Route path="/CompanyForumTopic" element={<CompanyForumTopic/>}></Route> */}
          <Route
            path="/Forums"
            element={
              <AuthorizedRoute>
                <Forums />
              </AuthorizedRoute>
            }
          ></Route>
          <Route
            path="/ForumTopic/:id"
            element={
              <AuthorizedRoute>
                <ForumTopic />
              </AuthorizedRoute>
            }
          ></Route>
          <Route
            path="/UserNotifications"
            element={
              <AuthorizedRoute>
                <UserNotifications />
              </AuthorizedRoute>
            }
          ></Route>
          {/* <Route
            path="/CompanyNotifications"
            element={<CompanyNotifications />}
          ></Route> */}
          {/* <Route
            path="/AdminNotifications"
            element={<AdminNotifications />}
          ></Route> */}
          <Route
            path="/savedJobs"
            element={
              <AuthorizedRoute>
                <SavedJobs />
              </AuthorizedRoute>
            }
          ></Route>
          <Route
            path="/PostJob"
            element={
              <AuthorizedRoute>
                <PostJob />
              </AuthorizedRoute>
            }
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

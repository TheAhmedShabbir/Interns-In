import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./pages/Login";
import React, { Component } from 'react';
import './App.css';
import CompanySignUp from "./pages/Company/SignUp";
import CompanyLogin from "./pages/Company/Login";

export default function App() {
  return (
    <Router>
      {/* <AppBar /> */}
      <div className="App">
        <Switch>
          <Route exact path="/Login">
            {/* <CompanyLogin />
            <CompanySignUp/> */}
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./pages/Login";
import React, { Component } from 'react';
import './App.css';

export default function App() {
  return (
    <Router>
      {/* <AppBar /> */}
      <div className="App">
        <Switch>
          <Route exact path="/Login">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
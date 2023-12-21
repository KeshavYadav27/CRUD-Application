import React from "react";
import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import AddDepartment from "./components/AddDepartment.js";
import { RequireToken } from "./components/Auth.js";
import Login from "./components/Login.js";
import Profile from "./components/Profile.js";
import Signup from "./components/Signup.js";
import UpdateDepartment from "./components/UpdateDepartment.js";
import UpdateEmployee from "./components/UpdateEmployee.js";

function App() {
  return (
    <div className="vh-100 gradient-custom">
      <div className="container">
        <h1 className="page-header text-center">Management App</h1>

        <BrowserRouter>
          <Routes>
            <Route path="/Signup" element={<Signup />} />
            <Route path="/" element={<Login />} />
            <Route
              path="/profile"
              element={
                <RequireToken>
                  <Profile />
                </RequireToken>
              }
            />
            <Route exact path="/updateemployee" Component={UpdateEmployee} />
            <Route
              exact
              path="/updatedepartment"
              Component={UpdateDepartment}
            />
            <Route exact path="/adddepartment" Component={AddDepartment} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;

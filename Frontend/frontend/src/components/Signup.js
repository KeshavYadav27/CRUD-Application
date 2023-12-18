import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchToken, setToken } from "./Auth.js";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isMale, setIsMale] = useState(false);
  const [dName, setDName] = useState("");
  const [salary, setSalary] = useState("");

  const handleSubmit = () => {
    if (name.length === 0) {
      alert("Name has left Blank!");
    } else if (email.length === 0) {
      alert("Email has left Blank!");
    } else if (password.length === 0) {
      alert("Password has left Blank!");
    } else {
      axios
        .post("http://localhost:8000/signup", {
          name: name,
          email: email,
          password: password,
          is_male: isMale,
          d_name: dName,
          salary: salary,
        })
        .then(function (response) {
          console.log(response);
          alert(response.data["message"]);
          if (response.data.token) {
            setToken(response.data);
            navigate("/profile");
          }
        })
        .catch(function (error) {
          console.log(error, "error");
        });
    }
  };

  return (
    <div>
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card">
                <div className="card-body p-5">
                  {fetchToken() ? (
                    <p>You are logged in!</p>
                  ) : (
                    <p>Sign up for an Account!</p>
                  )}
                  <form>
                    <div className="form-outline mb-4">
                      <label className="form-label">Your Name</label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="name"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label">Your Email ID</label>
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label">Your Password</label>
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label">Department Name</label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="dName"
                        id="dName"
                        value={dName}
                        onChange={(e) => setDName(e.target.value)}
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label">Salary</label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="salary"
                        id="salary"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                      />
                    </div>
                    <div className="form-check mb-4">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="isMale"
                        checked={isMale}
                        onChange={() => setIsMale(!isMale)}
                      />
                      <label className="form-check-label" htmlFor="isMale">
                        Is_Male
                      </label>
                    </div>
                    <div className="d-flex justify-content-center">
                      <input
                        type="button"
                        className="btn btn-success btn-lg"
                        name="submit"
                        id="submit"
                        value="Sign Up"
                        onClick={handleSubmit}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

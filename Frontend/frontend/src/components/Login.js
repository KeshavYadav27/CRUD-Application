import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchToken, setToken } from "./Auth.js";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (email.length === 0) {
      alert("Username has left Blank!");
    } else if (password.length === 0) {
      alert("password has left Blank!");
    } else {
      console.log("axios");
      axios
        .post("http://localhost:8000/login", {
          email: email,
          password: password,
        })
        .then(function (response) {
          console.log(response);
          //   console.log(response.data);
          //   alert(response.data["message"]);
          if (response.data["message"] === "Login failed") {
            alert("Login failed");
          } else {
            if (response.data) {
              setToken(response.data); // Since data has one field but now data has 3 fields; // Set the login data to state
              console.log(response.data);
              navigate("/profile", { state: { loginData: response.data } }); // Pass data as state
            }
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
                    <p>Login Account!</p>
                  )}
                  <form>
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
                        type="text"
                        className="form-control form-control-lg"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    <div className="d-flex justify-content-center">
                      <input
                        type="button"
                        className="btn btn-success btn-lg"
                        name="submit"
                        id="submit"
                        value="Login"
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

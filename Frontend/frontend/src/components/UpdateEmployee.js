import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { setToken } from "./Auth.js";

const UpdateEmployee = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [name, changeName] = useState("");
  const [email, changeEmail] = useState("");
  const [password, changePassword] = useState("");
  const [isMale, changeIsMale] = useState(false);
  const [dName, changeDName] = useState("");
  const [salary, changeSalary] = useState("");

  useEffect(() => {
    console.log(state.id);
  }, [state]);

  const handleSubmit = () => {
    if (name.length === 0) {
      alert("Name has left Blank!");
    } else if (email.length === 0) {
      alert("Email has left Blank!");
    } else if (password.length === 0) {
      alert("Password has left Blank!");
    } else if (dName.length === 0) {
      alert("Department Name has left Blank!");
    } else {
      axios
        .put(`http://localhost:8000/updateemployee/${String(state.id)}`, {
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
            console.log(setToken(response.data));
            navigate("/profile", { state: { loginData: state.loginData } });
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
                  <form>
                    <p>Update Employee Details</p>
                    <div className="form-outline mb-4">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="name"
                        id="name"
                        value={name}
                        onChange={(e) => changeName(e.target.value)}
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label">Email ID</label>
                      <input
                        type="email"
                        className="form-control form-control-lg"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => changeEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control form-control-lg"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => changePassword(e.target.value)}
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
                        onChange={(e) => changeDName(e.target.value)}
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
                        onChange={(e) => changeSalary(e.target.value)}
                      />
                    </div>
                    <div className="form-check mb-4">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="isMale"
                        checked={isMale}
                        onChange={() => changeIsMale(!isMale)}
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
                        value="Update"
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
};

export default UpdateEmployee;

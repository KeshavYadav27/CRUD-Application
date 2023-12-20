import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { setToken } from "./Auth.js";

const AddDepartment = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [name, changeName] = useState("");

  useEffect(() => {
    console.log(state);
  }, [state]);

  const handleSubmit = () => {
    if (name.length === 0) {
      alert("Name has left Blank!");
    } else {
      axios
        .post(`http://localhost:8000/addDepartment`, {
          name: name,
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
                    <div className="form-outline mb-4">
                      <label className="form-label">
                        Add department name here
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="name"
                        id="name"
                        value={name}
                        onChange={(e) => changeName(e.target.value)}
                      />
                    </div>

                    <div className="d-flex justify-content-center">
                      <input
                        type="button"
                        className="btn btn-success btn-lg"
                        name="submit"
                        id="submit"
                        value="Add Department"
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

export default AddDepartment;

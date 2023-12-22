import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchToken } from "./Auth";

const UpdateDepartment = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [name, changeName] = useState("");
  const token = fetchToken();
  console.log(token);

  useEffect(() => {
    console.log(state);
  }, [state]);

  const handleSubmit = () => {
    if (name.length === 0) {
      alert("Name has left Blank!");
    } else {
      axios
        .put(
          `http://localhost:8000/department/${String(state.id)}`,
          {
            name: name,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // I included the token in the headers for authentication
            },
          }
        )
        .then(function (response) {
          console.log(response);
          alert(response.data["message"]);
          if (response.data["message"]) {
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
                  <p>Update Department Name</p>
                  <form>
                    <div className="form-outline mb-4">
                      <label className="form-label">Department Name</label>
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
                        className="btn btn-primary"
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

export default UpdateDepartment;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchToken } from "./Auth";
import DepartmentRow from "./DepartmentRow";
import EmployeeRow from "./EmployeeRow";

export default function Profile() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [empData, setEmpData] = useState([]);
  const [deptData, setDeptData] = useState([]);
  const token = fetchToken();
  console.log(token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const emplist = await axios.get("http://localhost:8000/employee", {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        });
        const deptlist = await axios.get("http://localhost:8000/department", {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        });

        setEmpData(emplist.data);
        setDeptData(deptlist.data);

        console.log(state, emplist.data, deptlist.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [state, token]);

  // useEffect(() => {
  //   console.log(state);
  // }, [state]);

  const signOut = () => {
    localStorage.removeItem("Token");
    navigate("/");
  };
  const handleAddDepartment = () => {
    console.log("Add Department");
    navigate(`/adddepartment`, { state });
  };

  const handleDeleteEmployee = (id) => {
    axios
      .delete(`http://localhost:8000/employee/${String(id)}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      })
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
  };

  const handleDeleteDepartment = (id) => {
    axios
      .delete(`http://localhost:8000/department/${String(id)}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      })
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
  };

  const handleUpdateEmployee = (id) => {
    console.log("Update Employee", id);
    navigate(`/updateemployee`, {
      state: { loginData: state.loginData, id: id },
    });
  };

  const handleUpdateDepartment = (id) => {
    console.log("Update Department", id);
    navigate(`/updatedepartment`, {
      state: { loginData: state.loginData, id: id },
    });
  };

  return (
    <>
      <div style={{ minHeight: 800, marginTop: 20 }}>
        <h1>Profile Page</h1>

        <p>Hi, this is your profile.</p>

        {state.loginData.super_user && (
          <>
            <h2>Employee Table</h2>
            <div className="row">
              <div className="col-sm-10 col-xm-12 mr-auto ml-auto mt-4 mb-4">
                <div>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Is Male</th>
                        <th>Department Name</th>
                        <th>Salary</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(() => {
                        const rows = [];
                        const employeeData = empData;

                        for (let i = 0; i < employeeData.length; i++) {
                          const employee = employeeData[i];
                          if (!employeeData[i]["super_user"]) {
                            rows.push(
                              <EmployeeRow
                                id={employee.id}
                                name={employee.name}
                                email={employee.email}
                                password={employee.password}
                                is_male={employee.is_male}
                                d_name={employee.d_name}
                                salary={employee.salary}
                                handleUpdateEmployee={() =>
                                  handleUpdateEmployee(employee.id)
                                }
                                handleDeleteEmployee={() =>
                                  handleDeleteEmployee(employee.id)
                                }
                              />
                            );
                          }
                        }

                        return rows;
                      })()}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>

            <h2>Department Table</h2>
            <h7>From here we can add department</h7>
            <button
              onClick={() => handleAddDepartment()}
              className="btn btn-outline-success btn-sm mr-2"
            >
              Add Department
            </button>
            <div className="row">
              <div className="col-sm-10 col-xm-12 mr-auto ml-auto mt-4 mb-4">
                <div>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Department Name</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(() => {
                        const rows = [];
                        const departmentData = deptData;

                        for (let i = 0; i < departmentData.length; i++) {
                          const dept = departmentData[i];

                          rows.push(
                            <DepartmentRow
                              id={dept.id}
                              name={dept.name}
                              handleUpdateDepartment={() =>
                                handleUpdateDepartment(dept.id)
                              }
                              handleDeleteDepartment={() =>
                                handleDeleteDepartment(dept.id)
                              }
                            />
                          );
                        }

                        return rows;
                      })()}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </>
        )}

        <div>
          <button type="button" className="btn btn-primary" onClick={signOut}>
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
}

// {
//   state.loginData.employee_data.map((employee) => (
//     <EmployeeRow>
//       id = {employee.id}
//       name = {employee.name}
//       email = {employee.email}
//       password = {employee.password}
//       is_male = {employee.is_male}
//       d_name = {employee.d_name}
//       salary = {employee.salary}
//     </EmployeeRow>
//   ));
// }

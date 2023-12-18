import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import DepartmentRow from "./DepartmentRow";
import EmployeeRow from "./EmployeeRow";

export default function Profile() {
  const navigate = useNavigate();
  const { state } = useLocation();
  useEffect(() => {
    console.log(state);
  }, [state]);

  const signOut = () => {
    localStorage.removeItem("Token");
    navigate("/");
  };

  const numberOfFields = Object.keys(state?.loginData).length;
  console.log(state.loginData.employee_data["0"]);

  return (
    <>
      <div style={{ minHeight: 800, marginTop: 20 }}>
        <h1>Profile Page</h1>
        <p>Hi, this is your profile</p>

        {numberOfFields >= 3 && (
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
                        const employeeData = state.loginData.employee_data;

                        for (let i = 0; i < employeeData.length; i++) {
                          const employee = employeeData[i];

                          rows.push(
                            <EmployeeRow
                              key={employee.id}
                              id={employee.id}
                              name={employee.name}
                              email={employee.email}
                              password={employee.password}
                              is_male={employee.is_male}
                              d_name={employee.d_name}
                              salary={employee.salary}
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

            <h2>Department Table</h2>
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
                        const departmentData = state.loginData.department_data;

                        for (let i = 0; i < departmentData.length; i++) {
                          const dept = departmentData[i];

                          rows.push(
                            <DepartmentRow id={dept.id} name={dept.name} />
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
          <button
            type="button"
            className="btn btn-success btn-lg"
            onClick={signOut}
          >
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

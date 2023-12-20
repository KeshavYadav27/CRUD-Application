import React from "react";

const EmployeeRow = ({
  id,
  name,
  email,
  password,
  is_male,
  d_name,
  salary,
  handleUpdateEmployee,
  handleDeleteEmployee,
}) => {
  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{password}</td>
      <td>{is_male ? "Male" : "Female"}</td>
      <td>{d_name}</td>
      <td>{salary}</td>
      <td>
        <button
          onClick={() => handleUpdateEmployee(id)}
          className="btn btn-outline-info btn-sm ml-1 mr-2"
        >
          Update
        </button>
        <button
          onClick={() => handleDeleteEmployee(id)}
          className="btn btn-outline-danger btn-sm mr-2"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default EmployeeRow;

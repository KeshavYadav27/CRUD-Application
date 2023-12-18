import React from "react";
const DepartmentRow = ({ id, name }) => {
  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>
        <button className="btn btn-outline-info btn-sm ml-1 mr-2">
          Update
        </button>
        <button className="btn btn-outline-danger btn-sm mr-2">Delete</button>
      </td>
    </tr>
  );
};

export default DepartmentRow;

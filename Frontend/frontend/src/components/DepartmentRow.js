import React from "react";
const DepartmentRow = ({
  id,
  name,
  handleUpdateDepartment,
  handleDeleteDepartment,
}) => {
  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>
        <button
          onClick={() => handleUpdateDepartment(id)}
          className="btn btn-outline-info btn-sm ml-1 mr-2"
        >
          Update
        </button>
        <button
          on
          onClick={() => handleDeleteDepartment(id)}
          className="btn btn-outline-danger btn-sm mr-2"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default DepartmentRow;

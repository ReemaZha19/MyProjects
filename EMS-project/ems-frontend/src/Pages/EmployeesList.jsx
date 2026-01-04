import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { employeesList, searchEmployees, deleteEmployee } from "../services/EmployeeService";

const EmployeesList = () => {
  const [employees, setEmployees] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  // Load employees or search result
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const keyword = params.get("search");

    if (keyword) {
      searchEmployees(keyword)
        .then(res => setEmployees(res.data))
        .catch(err => console.error(err));
    } else {
      employeesList()
        .then(res => setEmployees(res.data))
        .catch(err => console.error(err));
    }
  }, [location.search]);

  // Delete employee
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      deleteEmployee(id)
        .then(() => {
          // Refresh the list after deletion
          const params = new URLSearchParams(location.search);
          const keyword = params.get("search");
          if (keyword) {
            searchEmployees(keyword)
              .then(res => setEmployees(res.data))
              .catch(err => console.error(err));
          } else {
            employeesList()
              .then(res => setEmployees(res.data))
              .catch(err => console.error(err));
          }
        })
        .catch(err => console.error(err));
    }
  };

  // Navigate to update employee page
  const handleUpdate = (id) => {
    navigate(`/update-employee/${id}`);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">All Employees</h2>
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>Email</th>
            <th>Position</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.firstName}</td>
              <td>{emp.lastName}</td>
              <td>{emp.address}</td>
              <td>{emp.email}</td>
              <td>{emp.position}</td>
              <td>{emp.salary}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleUpdate(emp.id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(emp.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {employees.length === 0 && (
            <tr>
              <td colSpan="8" className="text-center">
                No employees found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeesList;

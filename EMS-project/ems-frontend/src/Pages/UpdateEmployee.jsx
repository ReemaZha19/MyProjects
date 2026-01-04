import React, { useEffect, useState } from "react";
import { getEmployeeById, updateEmployee } from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";

const UpdateEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    position: "",
    salary: "",
  });

  useEffect(() => {
    getEmployeeById(id)
      .then((response) => {
        setEmployee(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateEmployee(id, employee)
      .then(() => {
        navigate("/employees");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Update Employee</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            className="form-control"
            value={employee.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            className="form-control"
            value={employee.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Address</label>
          <input
            type="text"
            name="address"
            className="form-control"
            value={employee.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={employee.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Position</label>
          <input
            type="text"
            name="position"
            className="form-control"
            value={employee.position}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Salary</label>
          <input
            type="number"
            name="salary"
            className="form-control"
            value={employee.salary}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary me-2">
          Update
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate("/employees")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateEmployee;

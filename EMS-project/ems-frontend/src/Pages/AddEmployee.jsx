import { useState } from "react";
import { createEmployee } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const navigate = useNavigate();

  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    position: "",
    salary: "",
  });

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createEmployee(employee)
      .then(() => {
        navigate("/employees"); 
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Add Employee</h2>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
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

          <div className="col-md-6 mb-3">
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
        </div>

        <div className="mb-3">
          <label>Address</label>
          <input
            type="text"
            name="address"
            className="form-control"
            value={employee.address}
            onChange={handleChange}
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

        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Position</label>
            <input
              type="text"
              name="position"
              className="form-control"
              value={employee.position}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>Salary</label>
            <input
              type="number"
              name="salary"
              className="form-control"
              value={employee.salary}
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Save Employee
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;

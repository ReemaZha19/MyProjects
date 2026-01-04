import React, { useEffect, useState } from "react";
import { employeesList } from "../services/EmployeeService";

const Dashboard = () => {

  const [totalEmployees, setTotalEmployees] = useState(0);

  useEffect(() => {
    employeesList()
      .then((response) => {
        setTotalEmployees(response.data.length);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h2 className="mb-4">Dashboard</h2>

      <div className="row">
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5>Total Employees</h5>
              <h3>{totalEmployees}</h3> 
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5>Departments</h5>
              <h3>8</h3>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body">
              <h5>Active Users</h5>
              <h3>5</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

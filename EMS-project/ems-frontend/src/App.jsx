import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import Footer from "./Components/Footer";

import Dashboard from "./Pages/Dashboard";
import AddEmployee from "./Pages/AddEmployee";
import EmployeesList from "./Pages/EmployeesList";
import UpdateEmployee from "./Pages/UpdateEmployee";
import Login from "./Pages/Login";

import PrivateRoute from "./Components/PrivateRoute";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("isLoggedIn")
  );

  const handleLogin = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      {isLoggedIn && <Navbar onLogout={handleLogout} />}
      <div className="row">
        {isLoggedIn && <div className="col-2"><Sidebar /></div>}

        <div className={isLoggedIn ? "col-10 p-3" : "col-12 p-3"}>
          <Routes>
            <Route
              path="/login"
              element={
                isLoggedIn ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />
              }
            />

            <Route
              path="/"
              element={
                <PrivateRoute isLoggedIn={isLoggedIn}>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute isLoggedIn={isLoggedIn}>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/add-employee"
              element={
                <PrivateRoute isLoggedIn={isLoggedIn}>
                  <AddEmployee />
                </PrivateRoute>
              }
            />
            <Route
              path="/employees"
              element={
                <PrivateRoute isLoggedIn={isLoggedIn}>
                  <EmployeesList />
                </PrivateRoute>
              }
            />
            <Route
              path="/update-employee/:id"
              element={
                <PrivateRoute isLoggedIn={isLoggedIn}>
                  <UpdateEmployee />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} />
          </Routes>
        </div>
      </div>

      {isLoggedIn && <Footer />}
    </BrowserRouter>
  );
};

export default App;

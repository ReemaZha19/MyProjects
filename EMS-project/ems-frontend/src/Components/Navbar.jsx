import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onLogout }) => {
  const [darkMode, setDarkMode] = useState(true);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/employees?search=${keyword}`);
    } else {
      navigate("/employees");
    }
    setKeyword("");
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    if (onLogout) onLogout();
    navigate("/login");
  };

  return (
    <nav
      className={`navbar navbar-expand-lg pt-3 pb-3 ${
        darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"
      } px-4`}
    >
      <a className="navbar-brand d-flex align-items-center mx-5" href="#">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="EMS Logo"
          width="35"
          className="me-2"
        />
        EMS
      </a>

      <form className="d-flex mx-auto w-50" onSubmit={handleSearch}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search employee by ID, name, email, position..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button className="btn text-black bg-white" type="submit">
          Search
        </button>
      </form>

      <div className="d-flex align-items-center">
        <button
          className="btn btn-outline-secondary me-3"
          onClick={toggleTheme}
          title="Toggle theme"
        >
          {darkMode ? <i className="bi bi-sun-fill"></i> : <i className="bi bi-moon-fill"></i>}
        </button>

        {localStorage.getItem("isLoggedIn") && (
          <button className="btn btn-danger me-5" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

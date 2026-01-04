import './Style.css';
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="sidebar bg-dark text-white vh-100 p-3">
            <h5 className="text-center mb-4">EMS MENU</h5>

            <ul className="nav flex-column">
                <li className="nav-item mb-2">
                    <Link to="/" className="nav-link text-white">
                        Dashboard
                    </Link>
                </li>

                <li className="nav-item mb-2">
                    <Link to="/add-employee" className="nav-link text-white">
                        Add Employee
                    </Link>
                </li>

                <li className="nav-item mb-2">
                    <Link to="/employees" className="nav-link text-white">
                        All Employees
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;

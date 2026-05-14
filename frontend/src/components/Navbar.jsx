import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {

  localStorage.removeItem("user");

  navigate("/");
};
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      
      <h1 className="text-2xl font-bold">
        Parking System
      </h1>

      <div className="space-x-4">
        <Link to="/">Login</Link>

        <Link to="/register">Register</Link>

        <Link to="/dashboard">Dashboard</Link>
        <button
  onClick={handleLogout}
  className="bg-red-500 text-white px-4 py-2 rounded"
>
  Logout
</button>
      </div>

    </nav>
  );
}

export default Navbar;
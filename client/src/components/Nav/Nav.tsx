import "./Nav.css";
import logo from "../../assets/logo.png";
import { logout } from "../../services/authService";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/authContext";

interface NavProps {
  onMyListClick: () => void;
}

export default function Nav({ onMyListClick }: NavProps) {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth(); // grab this from context

  const handleLogout = async () => {
    await logout();
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <img src={logo} className="logo" alt="logo"></img>
      <div className="nav-left">
        <button onClick={onMyListClick} className="nav-links">
          Reading List
        </button>
        <button onClick={handleLogout} className="nav-links">
          Logout
        </button>
      </div>
    </nav>
  );
}

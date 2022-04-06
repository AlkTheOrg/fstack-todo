import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { logout } from "../slices/authSlice";
import "../styles/Navbar.scss";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const handleLogout = () => dispatch(logout());
  return (
    <div className="Navbar">
      <div id="logo" onClick={() => navigate('/')}>Toodo</div>
      <div className="buttons">
        {user ? (
          <>
            <button onClick={() => navigate('/profile')}>Profile</button>
            <button className="filled-btn miami-marmalade-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <button onClick={() => navigate("/login")}>Login</button>
            <button className="filled-btn console-sky-btn" onClick={() => navigate("/signup")}>Signup</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;

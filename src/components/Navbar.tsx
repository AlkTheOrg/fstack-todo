import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { logout } from "../slices/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const handleLogout = () => dispatch(logout());
  return (
    <div style={{ width: "100%", height: "70px", background: "lightgreen" }}>
      {user ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <>
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/signup")}>Signup</button>
        </>
      )}
    </div>
  );
};

export default Navbar;

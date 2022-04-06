import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, reset, setUser } from "../slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store";
import "../styles/Login.scss";

interface Props {}

export const Login: React.FC<Props> = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const { loading, isError, message } = useSelector((state: RootState) => state.auth);
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(reset());
  }, [dispatch])

  const user = useSelector((state: RootState) => state.auth.user);
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resultAction = await dispatch(login({ username, password }));
    console.log('handled login');
    if (login.fulfilled.match(resultAction)) {
      const foundUser = resultAction.payload;
      console.log('foundUser:', foundUser);
      dispatch(setUser(foundUser));
    }
  };

  return (
    <div className="Login">
      <div className="page">
        <div>
          <h2>Login</h2>
        </div>
        <div className="validation">{isError ? message : ''}</div>
        <form onSubmit={handleLogin}>
          <input
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            type="text"
            value={username}
            id="username"
            required
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            value={password}
            id="password"
            required
          />
          {loading ? (
            <div className="loading">
              <span>Loading...</span>
            </div>
          ) : (
            <button type="submit" id="submit">Login</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;

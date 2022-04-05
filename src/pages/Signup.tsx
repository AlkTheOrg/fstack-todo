import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { register, reset, setUser } from "../slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store";

interface Props {}

export const Signup: React.FC<Props> = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
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

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resultAction = await dispatch(
      register({ username, email, password })
    );
    if (register.fulfilled.match(resultAction)) {
      const newUser = resultAction.payload;
      dispatch(setUser(newUser));
    }
  };

  return (
    <div className="page">
      <div>
        <h2>Signup</h2>
      </div>

      {isError && <div className="error">{message}</div>}
      <form onSubmit={handleSignup}>
        <input
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          type="text"
          value={username}
          required
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          value={email}
          required
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          value={password}
          required
        />

        {loading ? (
          <div className="loading">
            <span>Loading...</span>
          </div>
        ) : (
          <button type="submit">Login</button>
        )}
      </form>
    </div>
  );
};

export default Signup;

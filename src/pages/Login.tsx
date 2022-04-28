import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login, reset, setUser } from "../slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store";
import "../styles/Form.scss";
import todoService, { TodoPageReponse } from "../services/todoService";
import { pageAdded, todoAdded } from "../slices/todoSlice";
import Spinner from "../components/Spinner";

interface Props {}

export const Login: React.FC<Props> = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const { isLoading, isError, message } = useSelector((state: RootState) => state.auth);
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(reset());
  }, [dispatch])

  const user = useSelector((state: RootState) => state.auth.user);
  useEffect(() => {
    if (user && user.id) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resultAction = await dispatch(login({ username, password }));
    console.log('handled login');
    if (login.fulfilled.match(resultAction)) {
      const foundUser = resultAction.payload;
      await apiTodoPages(foundUser.id);
      console.log('foundUser:', foundUser);
      dispatch(setUser(foundUser));
    }
  };

  async function apiTodoPages(id: string) {
    let result = await todoService.getTodoPages(id);
    result.forEach((todoPage: TodoPageReponse) => {
      dispatch(
        pageAdded({
          id: todoPage._id,
          name: todoPage.name,
          sortKey: todoPage.sortKey,
          sortOrder: todoPage.sortOrder,
        })
      );
      todoPage.todos.forEach((todo) => {
        const { color, completed, due, _id, name } = todo;
        dispatch(
          todoAdded({
            color,
            completed,
            id: _id,
            name,
            pageId: todoPage._id,
            due: new Date(Date.parse(due)),
          })
        );
      });
    });
  }

  return (
    <div className="Form">
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
            disabled={isLoading}
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            value={password}
            id="password"
            required
            disabled={isLoading}
          />
          {isLoading ? (
            <Spinner />
          ) : (
            <button type="submit" id="submit" disabled={isLoading}>
              Login
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;

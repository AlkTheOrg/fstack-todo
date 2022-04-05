import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store";
import { useNavigate } from "react-router-dom";
import Sidebar from "./components/side/Sidebar";
import TodoPageList from "./components/side/TodoPageList";
import "./styles/reset.scss";
import "./styles/App.scss";
import TodoPage from "./components/TodoPage";
import { setCurPage, setTodos } from "./slices/todoSlice";
import { mockTodos } from "./temp/mockData";
import { getToken } from "./util/authHelpers";

function App() {
  // const token = TODO;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      setTodos({
        "0": mockTodos,
        "1": mockTodos.map((todo) => ({
          ...todo,
          id: 1 + todo.id,
          pageId: "1",
          name: "111" + todo.name,
        })),
      })
    );
    dispatch(setCurPage("0"));
  }, [dispatch]);

  //similar logic to: if (!token) return <h1>Login</h1>;
  const user = useSelector((state: RootState) => state.auth.user);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user) {
      // TODO
    }
  }, [user])

  return (
    <div className="App" style={{ height: "770px" }}>
      <div className="hero">
        <Sidebar classes={["Sidebar"]}>
          <TodoPageList headerClass="header" headerTitle="Your Pages" />
        </Sidebar>
        <TodoPage />
      </div>
    </div>
  );
}

export default App;

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store";
import { useNavigate } from "react-router-dom";
import Sidebar from "./components/side/Sidebar";
import TodoPageList from "./components/side/TodoPageList";
import "./styles/reset.scss";
import "./styles/App.scss";
import TodoPage from "./components/TodoPage";
import { pageAdded, setCurPage, setTodos, todoAdded } from "./slices/todoSlice";
import { mockTodos } from "./temp/mockData";
import todoService, { TodoPageReponse } from "./util/todoService";

function App() {
  // const token = TODO;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   dispatch(
  //     setTodos({
  //       "0": mockTodos,
  //       "1": mockTodos.map((todo) => ({
  //         ...todo,
  //         id: 1 + todo.id,
  //         pageId: "1",
  //         name: "111" + todo.name,
  //       })),
  //     })
  //   );
  //   dispatch(setCurPage("0"));
  // }, [dispatch]);

  //similar logic to: if (!token) return <h1>Login</h1>;
  const user = useSelector((state: RootState) => state.auth.user);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
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
    if (user && user.id) {
      apiTodoPages(user.id);
    }
  }, [user, dispatch]);

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

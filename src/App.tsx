import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store";
import Sidebar from "./components/side/Sidebar";
import TodoPageList from "./components/side/TodoPageList";
import "./styles/reset.scss";
import "./styles/App.scss";
import Navbar from "./components/Navbar";
import TodoPage from "./components/TodoPage";
import { setCurPage, setTodos } from "./slices/todoSlice";
import { mockTodos } from "./temp/mockData";

function App() {
  // const token = TODO;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setTodos({
        "0": mockTodos,
        "1": mockTodos.map((todo) => ({
          ...todo,
          id: 1 + todo.id,
          pageId: "1",
          name: '111' + todo.name
        })),
      })
    );
    dispatch(setCurPage("0"));
  }, [dispatch]);

  // if (!token) return <h1>Login <br/> <AddAuth/></h1>;

  return (
    <div className="App" style={{ height: "770px" }}>
      <Navbar />
      <div className="hero">
        <Sidebar classes={["Sidebar"]}>
          <TodoPageList headerClass="header" headerTitle="Your Pages"/>
        </Sidebar>
        <TodoPage />
      </div>
    </div>
  );
}

export default App;

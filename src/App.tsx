import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store";
import Sidebar from "./components/Sidebar";
import TodoPageList from "./components/TodoPageList";
import "./styles/reset.scss"
import "./styles/App.scss"
import Navbar from "./components/Navbar";
import TodoPage from "./components/TodoPage";
import { setCurPage, setTodos } from "./slices/todoSlice";
import { mockTodos } from './temp/mockData';

function App() {
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTodos({"0": mockTodos}))
    dispatch(setCurPage("0"));
  }, [dispatch])

  // if (!token) return <h1>Login <br/> <AddAuth/></h1>;

  return (
    <div className="App" style={{height: "770px"}}>
      <Navbar />
      <div className="hero">
        <Sidebar isDetached={true} classes={['Sidebar']}>
          <TodoPageList />
        </Sidebar>
        <TodoPage title="groceries"/>
      </div>
    </div>
  );
}

export default App;

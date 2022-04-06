import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { useNavigate } from "react-router-dom";
import Sidebar from "./components/side/Sidebar";
import TodoPageList from "./components/side/TodoPageList";
import "./styles/reset.scss";
import "./styles/App.scss";
import TodoPage from "./components/TodoPage";

function App() {
  const navigate = useNavigate();

  //similar logic to: if (!token) return <h1>Login</h1>;
  const user = useSelector((state: RootState) => state.auth.user);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

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

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { store } from "./store"
import { Provider } from "react-redux";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Login } from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<h1>no match</h1>} />
        </Routes>
      </HashRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

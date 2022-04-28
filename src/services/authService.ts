import axios from "axios";
import { UnregisteredUser, UserLogin } from "../slices/authSlice";
import { removeToken, setToken } from "../util/authHelpers";
import { getAxiosConfig } from "./todoService";

const API_URL = "http://localhost:5000";

type UserResponse = {
  id: string;
  username: string;
  email: string;
  token: string;
};

const register = async (user: UnregisteredUser) => {
  const response = await axios.post<UserResponse>(
    API_URL + "/signup",
    user
  );
  const result = response.data;
  console.log('register result:', result);
  setToken(result.token);
  const userWithoutToken = { id: result.id, username: result.username, email: result.email }
  return userWithoutToken;
};

const login = async (user: UserLogin) => {
  const response = await axios.post<UserResponse>(API_URL + "/login", user);
  console.log("api login called");
  const result = response.data;
  console.log('login result: ', result);
  setToken(result.token);
  const userWithoutToken = { id: result.id, username: result.username, email: result.email }
  return userWithoutToken;
};

type UserResponse2 = {
  _id: string;
  username: string;
  email: string;
  token: string;
};

const update = async (userId: string, user: UserLogin) => {
  const response = await axios.post<UserResponse2>(API_URL + "/user/" + userId, user, getAxiosConfig());
  console.log("api update user called");
  const result = response.data;
  console.log('update user result: ', result);
  const userWithoutToken = { id: result._id, username: result.username, email: result.email }
  return userWithoutToken;
}

const remove = async (userId: string) => {
  const response = await axios.delete(API_URL + "/user/" + userId, getAxiosConfig());
  console.log("api update user called");
  const result = response.data;
  console.log('update user result: ', result);
  removeToken();
  return true;
}

const logout = () => {
  removeToken();
}

const authService = {
  register,
  login,
  logout,
  update,
  remove
};

export default authService;

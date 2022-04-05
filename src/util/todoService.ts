import axios from "axios";
import { UnregisteredUser, UserLogin } from "../slices/authSlice";
import { SortKey, SortOrder } from "../slices/todoSlice";
import { getToken } from "./authHelpers";

const API_URL = "http://localhost:5000";

export type TodoPageReponse = {
  _id: string;
  name: string;
  sortKey: SortKey;
  sortOrder: SortOrder;
  todos: TodoResponse[];
  __v: number;
};

type TodoResponse = {
  _id: string;
  name: string;
  due: string;
  color: string;
  completed: boolean;
  __v: number;
};

const getAxiosConfig = () => ({
  headers: { Authorization: `Bearer ${getToken()}` }
})

const getTodoPages = async (userId: string) => {
  const response = await axios.get<TodoPageReponse[]>(
    API_URL + "/user/" + userId + "/todo-page/",
    getAxiosConfig()
  );
  const result = response.data;
  console.log('todoPages result: ', result)
  return result;
};

// new TodoPage
// update TodoPage
// delete TodoPage

// new Todo
// update Todo
// delete Todo

const todoService = {
  getTodoPages,
};

export default todoService;

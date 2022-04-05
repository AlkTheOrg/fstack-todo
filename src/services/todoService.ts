import axios from "axios";
import { SortKey, SortOrder, Page } from "../slices/todoSlice";
import { getToken } from "../util/authHelpers";

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

const createTodoPage = async (userId: string, todoPage: Page) => {
  const response = await axios.post(
    API_URL + '/user/' + userId + '/todo-page/',
    todoPage,
    getAxiosConfig()
  )
  const result = response.data;
  console.log('create todoPage result:', result);
  return result;

}
const updateTodoPage = async (userId: string, todoPage: Page, tpId: string) => {
  const response = await axios.post(
    API_URL + '/user/' + userId + '/todo-page/' + tpId,
    todoPage,
    getAxiosConfig()
  )
  const result = response.data;
  console.log('update todoPage result:', result);
  return result;
}
const deleteTodoPage = async (userId: string, tpId: string) => {
  const response = await axios.delete(
    API_URL + '/user/' + userId + '/todo-page/' + tpId,
    getAxiosConfig()
  )
  const result = response.data;
  console.log('delete todoPage result:', result);
  return result;
}

// new Todo
// update Todo
// delete Todo

const todoService = {
  getTodoPages,
  createTodoPage,
  updateTodoPage,
  deleteTodoPage
};

export default todoService;

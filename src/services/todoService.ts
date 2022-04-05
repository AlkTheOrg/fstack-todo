import axios from "axios";
import { SortKey, SortOrder, Page, PageWithId } from "../slices/todoSlice";
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

export type CreateTodoPage = {
  userId: string,
  todoPage: Page,
}

const createTodoPage = async ({ userId, todoPage }: CreateTodoPage) => {
  const response = await axios.post(
    API_URL + '/user/' + userId + '/todo-page/',
    todoPage,
    getAxiosConfig()
  )
  const result = response.data;
  console.log('create todoPage result:', result);
  return result;

}

export type UpdateTodoPage = {
  userId: string;
  tpId: string;
  todoPage: Partial<Page>;
};

const updateTodoPage = async ({ userId, tpId, todoPage }: UpdateTodoPage) => {
  const response = await axios.post(
    API_URL + "/user/" + userId + "/todo-page/" + tpId,
    todoPage,
    getAxiosConfig()
  );
  const result = response.data;
  console.log("update todoPage result:", result);
  return result;
};

export type DeleteTodoPage = {
  userId: string;
  tpId: string;
};

const deleteTodoPage = async ({ userId , tpId }: DeleteTodoPage) => {
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

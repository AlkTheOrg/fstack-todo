import axios from "axios";
import { SortKey, SortOrder, Page, Todo } from "../slices/todoSlice";
import { getToken } from "../util/authHelpers";

// const API_URL = "http://localhost:5000";
const API_URL = "https://fstack-todo-backend.herokuapp.com";

export type TodoPageReponse = {
  _id: string;
  name: string;
  sortKey: SortKey;
  sortOrder: SortOrder;
  todos: TodoResponse[];
  __v: number;
};

export type TodoResponse = {
  _id: string;
  name: string;
  due: string;
  color: string;
  completed: boolean;
  __v: number;
};

export const getAxiosConfig = () => ({
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
  const response = await axios.post<TodoPageReponse>(
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

export type CreateTodo = {
  userId: string,
  tpId: string,
  todo: Omit<Todo, "id">
}

const createTodo = async({ userId, tpId, todo }: CreateTodo) => {
  const response = await axios.post<TodoResponse>(
    API_URL + '/user/' + userId + '/todo-page/' + tpId + '/todo/',
    todo,
    getAxiosConfig()
  )
  const result = response.data;
  console.log('create todo result:', result);
  return result;
}

export type UpdateTodo = {
  userId: string,
  tpId: string,
  todo: Todo
}

const updateTodo = async({ userId, tpId, todo }: UpdateTodo) => {
  const { color, completed, due, name } = todo;
  const response = await axios.post(
    API_URL + '/user/' + userId + '/todo-page/' + tpId + '/todo/' + todo.id,
    { color, completed, due, name },
    getAxiosConfig()
  )
  const result = response.data;
  console.log('create todo result:', result);
  return result;
}

export type DeleteTodo = {
  userId: string,
  tpId: string,
  todo: Todo
};

const deleteTodo = async ({ userId , tpId, todo }: DeleteTodo) => {
  const response = await axios.delete(
    API_URL + '/user/' + userId + '/todo-page/' + tpId + '/todo/' + todo.id,
    getAxiosConfig()
  )
  const result = response.data;
  console.log('delete todoPage result:', result);
  return result;
}

const todoService = {
  getTodoPages,
  createTodoPage,
  updateTodoPage,
  deleteTodoPage,
  createTodo,
  updateTodo,
  deleteTodo
};

export default todoService;

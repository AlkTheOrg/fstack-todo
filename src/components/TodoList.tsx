import { Dispatch, FC, SetStateAction, useState } from "react";
import { Todo as TodoType } from "../slices/todoSlice";
import Todo from "./Todo";
import "../styles/TodoList.scss";
import TodoWrapper from "./TodoWrapper";
import CreateOrUpdateTodo from "./CreateOrUpdateTodo";

export type Props = {
  todos: TodoType[];
  showNewTodoForm: boolean;
  setShowNewTodoForm: Dispatch<SetStateAction<boolean>>;
  removeTodo: (todo: TodoType) => any;
  updateTodo: (todo: TodoType) => any;
  setCurEditingTodoId: (id: string) => any;
  curEditingTodoId: string | undefined;
};

const TodoList: FC<Props> = ({
  todos,
  showNewTodoForm,
  setShowNewTodoForm,
  updateTodo,
  setCurEditingTodoId,
  curEditingTodoId,
}) => {
  const [showEditingTodo, setShowEditingTodo] = useState(false);

  return (
    <div className="TodoList">
      {showNewTodoForm && (
        <TodoWrapper>
          <CreateOrUpdateTodo setShowTodoForm={setShowNewTodoForm} updateTodo={updateTodo}/>
        </TodoWrapper>
      )}
      {todos.length ?
        todos.map((todo, i) => {
          if (curEditingTodoId && curEditingTodoId === todo.id) {
            return (
              <TodoWrapper key={"todo-editing"}>
                <CreateOrUpdateTodo
                  setShowTodoForm={setShowEditingTodo}
                  mode="update"
                  prevColor={todo.color}
                  prevStartDate={todo.due}
                  prevName={todo.name}
                  updateTodo={updateTodo}
                />
              </TodoWrapper>
            );
          }
          return (
            <TodoWrapper key={"todo" + i}>
              <Todo
                onClickTodo={() => updateTodo({ ...todo, completed: !todo.completed })}
                {...todo}
              />
            </TodoWrapper>
          );
        }) : !showNewTodoForm && (
          <div className="no-page-selected centered">
            <h1>Couldn't find any todos in this page.</h1>
            <h2>If you have a search filter, please clear or close it first.</h2>
          </div>
        )}
    </div>
  );
};

export default TodoList;

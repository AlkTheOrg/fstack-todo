import { Dispatch, FC, SetStateAction, useState, useEffect } from "react";
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
  removeTodo,
  updateTodo,
  setCurEditingTodoId,
  curEditingTodoId,
}) => {
  const [showEditingTodo, setShowEditingTodo] = useState(false);

  return (
    <div className="TodoList">
      {showNewTodoForm && (
        <TodoWrapper>
          <CreateOrUpdateTodo setShowTodoForm={setShowNewTodoForm} />
        </TodoWrapper>
      )}
      {todos &&
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
                />
              </TodoWrapper>
            );
          }
          return (
            <TodoWrapper key={"todo" + i}>
              <Todo
                removeTodo={() => removeTodo(todo)}
                updateTodo={() => updateTodo(todo)}
                {...todo}
              />
            </TodoWrapper>
          );
        })}
    </div>
  );
};

export default TodoList;

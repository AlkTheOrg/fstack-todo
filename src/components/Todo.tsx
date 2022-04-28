import moment from "moment";
import React, { useState } from "react";
import { setCurEditingTodoId, Todo as TodoType } from "../slices/todoSlice";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import "../styles/Todo.scss";
import { IconType } from "react-icons";
import { useDispatch } from 'react-redux';

export interface Props extends TodoType {
  onClickTodo: () => any;
  EditIcon?: IconType;
  DeleteIcon?: IconType;
  onDelete: (todo: TodoType) => any;
}

const Todo: React.FC<Props> = ({
  color,
  due,
  id,
  name,
  pageId,
  onClickTodo,
  completed,
  onDelete,
  EditIcon = FiEdit2,
  DeleteIcon = FiTrash2
}) => {
  const [nameOnHover, setNameOnHover] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const dispatch = useDispatch();

  const handleMouseEnter = () => {
    setIsHovering(true);
    toggleNameHover();
  }

  const handleMouseLeave = () => {
    setIsHovering(false);
    toggleNameHover();
  }

  const toggleNameHover = () => setNameOnHover((before) => !before);
  const todoIsInFuture = moment(Date.now()).isBefore(due);

  return (
    <div
      className={"Todo" + (completed ? " completed" : "")}
      id={"todo-" + id}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <main>
        <div
          className="check"
          style={{ borderColor: completed ? "green" : color }}
          onClick={onClickTodo}
          role="checkbox"
          aria-checked="false"
          aria-label="Mark todo as done"
        ></div>
        <span
          className="Todo-name"
          style={{ color: completed ? "green" : nameOnHover ? color : "black" }}
        >
          {name.length < 55 ? name : name.substring(0, 54) + "..."}
        </span>
      </main>
      <span className="Todo-due">
        {isHovering && (
          <div className="icon-container">
            <div className="icon-wrapper">
              <EditIcon
                size={18}
                onClick={() => dispatch(setCurEditingTodoId(id))}
                id={"edit-" + id}
                className="edit-todo-icon"
              />
            </div>
            <div className="icon-wrapper">
              <DeleteIcon
                size={18}
                onClick={() =>
                  onDelete({
                    color,
                    completed,
                    due,
                    id,
                    name,
                    pageId,
                  })
                }
                id={"remove-" + id}
                className="delete-todo-icon"
              />
            </div>
          </div>
        )}
        {todoIsInFuture ? (
          moment(due).fromNow(true)
        ) : (
          <p style={{ color: "#BA0010" }}>Due</p>
        )}
      </span>
    </div>
  );
};

export default Todo;

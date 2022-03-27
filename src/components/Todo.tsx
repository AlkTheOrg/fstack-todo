import moment from "moment";
import React, { useState } from "react";
import { setCurEditingTodoId, Todo as TodoType } from "../slices/todoSlice";
import { FiEdit2 } from "react-icons/fi";
import "../styles/Todo.scss";
import { IconType } from "react-icons";
import { useDispatch } from 'react-redux';

export interface Props extends TodoType {
  removeTodo: () => any;
  updateTodo: () => any;
  EditIcon?: IconType
}

const Todo: React.FC<Props> = ({
  color,
  due,
  id,
  name,
  pageId,
  removeTodo,
  updateTodo,
  children,
  EditIcon = FiEdit2
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
      className="Todo"
      id={"todo-"+id}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <main>
        <div
          className="check"
          style={{ borderColor: color }}
          onClick={removeTodo}
          role="checkbox"
          aria-checked="false"
          aria-label="Mark todo as done"
        ></div>
        <span
          className="Todo-name"
          style={{ color: nameOnHover ? color : "black" }}
        >
          {name}
        </span>
      </main>
      <span className="Todo-due">
        {isHovering && <div className="icon-wrapper edit-todo-icon" >
          <EditIcon size={18} onClick={() => dispatch(setCurEditingTodoId(id))} id={"edit-"+id}/>
        </div>}
        {todoIsInFuture ? moment(due).fromNow(true) : "Due"}
      </span>
    </div>
  );
};

export default Todo;
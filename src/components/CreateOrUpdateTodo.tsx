import {
  Dispatch,
  FC,
  SetStateAction,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { connect, useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import "../styles/DatePicker.scss";
import "../styles/CreateOrUpdateTodo.scss";
import "react-datepicker/dist/react-datepicker.css";
import { AppDispatch, RootState } from "../store";
import {
  createTodo,
  setCurEditingTodoId,
  Todo,
  todoAdded,
} from "../slices/todoSlice";
import { getTomorrowDate } from "../util/getTomorrowDate";
import { elementContainsTarget } from "../util/elementContainsTarget";
import { CreateTodo } from "../services/todoService";

export type Props = {
  curPageId: string;
  updateTodo: (todo: Todo) => any;
  setShowTodoForm: Dispatch<SetStateAction<boolean>>;
  prevStartDate?: Date;
  prevName?: string;
  prevColor?: string;
  mode?: "create" | "update";
  curEditingTodoId: string | undefined;
  isLoading: boolean,
  userId: string
};

const CreateOrUpdateTodo: FC<Props> = ({
  curPageId,
  updateTodo,
  setShowTodoForm,
  prevStartDate,
  prevName = "",
  prevColor = "#000",
  mode = "create",
  curEditingTodoId,
  isLoading,
  userId
}) => {
  const dispatch: AppDispatch = useDispatch();
  const addTodo = (todo: Todo) => dispatch(todoAdded(todo));
  const resetCurEditingTodoId = useCallback(
    () => dispatch(setCurEditingTodoId("")),
    [dispatch]
  );

  const tomorrow = getTomorrowDate();
  const [startDate, setStartDate] = useState(
    prevStartDate ? prevStartDate : tomorrow
  );
  const [name, setName] = useState(prevName);
  const [color, setColor] = useState(prevColor);
  const todoFormDivRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const modeIsCreate = mode === "create";

  const handleClickOutside = useCallback(
    (e: Event) => {
      if (isLoading) return;
      const child =
        todoFormDivRef.current &&
        (todoFormDivRef.current.firstChild as HTMLElement);
      const target = e.target as Element;

      if (
        child &&
        !child.contains(target) &&
        !target.classList.contains("react-datepicker__day")
      ) {
        if (modeIsCreate && !elementContainsTarget("#new-todo-icon", target)) {
          // TODO handle handleClickOutside with refs
          setShowTodoForm(false);
        } else if (
          !modeIsCreate && target.id !== `edit-${curEditingTodoId}` &&
          target.parentElement?.id !== `edit-${curEditingTodoId}` &&
          curEditingTodoId
          // document.querySelector(`#todo-${curEditingTodoId} .edit-todo-icon`)
        ) {
          setShowTodoForm(false);
          resetCurEditingTodoId();
        }
      }
    },
    [setShowTodoForm, isLoading, curEditingTodoId, modeIsCreate, resetCurEditingTodoId]
  );

  useEffect(() => {
    if (nameInputRef && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  const submitNewTodo = async (createParams: CreateTodo) => await dispatch(createTodo(createParams));

  const handleSubmit = async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log('submit triggered')
    if (!name) {
      setShowTodoForm(false);
      return;
    }
    if (mode === "create" && !isLoading) {
      const todo = { color, name, due: startDate, pageId: curPageId, completed: false };
      const resultAction = await submitNewTodo({ tpId: curPageId, userId, todo });
      if (createTodo.fulfilled.match(resultAction)) {
        addTodo({ color, name, id: resultAction.payload._id, due: startDate, pageId: curPageId, completed: false });
      }
    } else if (curEditingTodoId) {
      updateTodo({
        color,
        name,
        id: curEditingTodoId,
        due: startDate,
        pageId: curPageId,
        completed: false
      });
      resetCurEditingTodoId();
    }
    setShowTodoForm(false);
  };

  const SubmitButton = () => {
    return (
      <button className="submit" onClick={handleSubmit} disabled={isLoading}>
        {mode === "create" ? "Add" : "Update"}
      </button>
    );
  };

  return (
    <div ref={todoFormDivRef} style={{ width: "100%", height: "100%" }}>
      <form className="CreateOrUpdateTodo">
        <input
          type="text"
          name="name"
          id="todo-name"
          placeholder="Todo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          ref={nameInputRef}
          disabled={isLoading}
        />
        <DatePicker
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
          minDate={tomorrow}
          disabled={isLoading}
        />
        <input
          type="color"
          name="color"
          id="todo-color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          disabled={isLoading}
        />
        <SubmitButton />
      </form>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  curPageId: state.todo.curPageId,
  curEditingTodoId: state.todo.curEditingTodoId,
  isLoading: state.todo.isLoading,
  userId: state.auth.user ? state.auth.user.id : ''
});

export default connect(mapStateToProps)(CreateOrUpdateTodo);

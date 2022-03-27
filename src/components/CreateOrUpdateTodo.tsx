import {
  Dispatch,
  FC,
  SetStateAction,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { connect, DispatchProp, MapDispatchToProps } from "react-redux";
import DatePicker from "react-datepicker";
import "../styles/DatePicker.scss";
import "react-datepicker/dist/react-datepicker.css";
import { AppDispatch, RootState } from "../store";
import {
  setCurEditingTodoId,
  Todo,
  todoAdded,
  todoUpdated,
} from "../slices/todoSlice";
import { getTomorrowDate } from "../util/getTomorrowDate";
import { elementContainsTarget } from "../util/elementContainsTarget";

const style = {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  fontSize: "18px",
  borderBottom: ".5px solid #3334",
  borderTop: ".5px solid #3334",
};

export type Props = {
  curPageId: string;
  addTodo: (todo: Todo) => any;
  updateTodo: (todo: Todo) => any;
  resetCurEditingTodoId: () => void;
  setShowTodoForm: Dispatch<SetStateAction<boolean>>;
  prevStartDate?: Date;
  prevName?: string;
  prevColor?: string;
  mode?: "create" | "update";
  curEditingTodoId: string | undefined;
};

const CreateOrUpdateTodo: FC<Props> = ({
  curPageId,
  addTodo,
  updateTodo,
  setShowTodoForm,
  prevStartDate,
  prevName = "",
  prevColor = "#000",
  mode = "create",
  resetCurEditingTodoId,
  curEditingTodoId,
}) => {
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
    [setShowTodoForm, curEditingTodoId, modeIsCreate, resetCurEditingTodoId]
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

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (mode === "create")
      addTodo({ color, name, id: "1332", due: startDate, pageId: curPageId });
    else if (curEditingTodoId) {
      updateTodo({
        color,
        name,
        id: curEditingTodoId,
        due: startDate,
        pageId: curPageId,
      });
      resetCurEditingTodoId();
    }
    setShowTodoForm(false);
  };

  const SubmitButton = () => {
    return (
      <button onClick={handleSubmit}>
        {mode === "create" ? "Add" : "Update"}
      </button>
    );
  };

  return (
    <div ref={todoFormDivRef} style={{ width: "100%", height: "100%" }}>
      <form style={style}>
        <input
          type="text"
          name="name"
          id="todo-name"
          placeholder="Todo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          ref={nameInputRef}
        />
        <DatePicker
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
          minDate={tomorrow}
        />
        <input
          type="color"
          name="color"
          id="todo-color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <SubmitButton />
      </form>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  curPageId: state.todo.curPageId,
  curEditingTodoId: state.todo.curEditingTodoId,
});

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    addTodo: (todo: Todo) => dispatch(todoAdded(todo)),
    updateTodo: (todo: Todo) => dispatch(todoUpdated(todo)),
    resetCurEditingTodoId: () => dispatch(setCurEditingTodoId("")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrUpdateTodo);

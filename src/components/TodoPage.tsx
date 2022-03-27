import "../styles/TodoPage.scss";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { FiSearch, FiMoreHorizontal, FiPlus } from "react-icons/fi";
import { IconType } from "react-icons";
import FilteredTodoList from "../containers/FilteredTodoList";
import PopoverMenu from "./PopoverMenu";
import EditableText from "./EditableText";
import { useDispatch, useSelector } from "react-redux";
import { pageRenamed, sortByKey } from "../slices/todoSlice";
import { RootState } from "../store";

export type Props = {
  SearchIcon?: IconType;
  NewTodoIcon?: IconType;
  MoreIcon?: IconType;
};

export const defaultProps: Props = {
  SearchIcon: FiSearch,
  NewTodoIcon: FiPlus,
  MoreIcon: FiMoreHorizontal,
};

export type TodoPageHeaderProps = {
  SearchIcon: IconType;
  NewTodoIcon: IconType;
  MoreIcon: IconType;
  setShowNewTodoForm: Dispatch<SetStateAction<boolean>>;
  showPopover: boolean;
  setShowPopover: Dispatch<SetStateAction<boolean>>;
};

export const TodoPageHeader: FC<TodoPageHeaderProps> = ({
  SearchIcon,
  NewTodoIcon,
  MoreIcon,
  setShowNewTodoForm,
  showPopover,
  setShowPopover,
}) => {
  const dispatch = useDispatch();
  const curPageId = useSelector((state: RootState) => state.todo.curPageId)
  const title = useSelector((state: RootState) => state.todo.pages[curPageId])
  return (
    <div className="TodoPage-header">
      <EditableText
        defaultValue={title}
        wrapperClass="EditableText"
        DefaultComponent={() => <h1 className="todo-title">{title}</h1>}
        excludedClickOutsideClasses={['todo-title']}
        onSubmit={(newName: string) => dispatch(pageRenamed([curPageId, newName]))}
      />

      <div className="TodoPage-header-icons">
        <div className="icon-wrapper">
          <SearchIcon size={28} />
        </div>
        <div className="icon-wrapper">
          <NewTodoIcon
            id="new-todo-icon"
            size={28}
            onClick={() => setShowNewTodoForm(true)}
          />
        </div>
        <div className="icon-wrapper" style={{ position: "relative" }}>
          <MoreIcon size={25} onClick={() => setShowPopover(true)} />
          {showPopover && (
            <PopoverMenu
              baseClass="PopoverMenu"
              popoverClass="PopoverMenu-popover"
              popoverWrapperClass="PopoverMenu-popover-wrapper"
              popovers={[
                [
                  "Ascending Date",
                  () => dispatch(sortByKey({ key: "due", order: "asc" })),
                ],
                [
                  "Descending Date",
                  () => dispatch(sortByKey({ key: "due", order: "desc" })),
                ],
                [
                  "Ascending Name",
                  () => dispatch(sortByKey({ key: "name", order: "asc" })),
                ],
                [
                  "Descending Name",
                  () => dispatch(sortByKey({ key: "name", order: "desc" })),
                ],
              ]}
              showPopover={showPopover}
              setShowPopover={setShowPopover}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const TodoPage: FC<Props> = ({ SearchIcon, NewTodoIcon, MoreIcon }) => {
  const [showNewTodoForm, setShowNewTodoForm] = useState(false);
  const [showPopover, setShowPopover] = useState(true);
  return (
    <div className="TodoPage">
      <TodoPageHeader
        SearchIcon={SearchIcon || FiSearch}
        NewTodoIcon={NewTodoIcon || FiPlus}
        MoreIcon={MoreIcon || FiMoreHorizontal}
        setShowNewTodoForm={setShowNewTodoForm}
        showPopover={showPopover}
        setShowPopover={setShowPopover}
      />
      <FilteredTodoList
        showNewTodoForm={showNewTodoForm}
        setShowNewTodoForm={setShowNewTodoForm}
      />
    </div>
  );
};

TodoPage.defaultProps = defaultProps;

export default TodoPage;
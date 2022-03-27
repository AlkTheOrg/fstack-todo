import "../styles/TodoPage.scss";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { FiSearch, FiMoreHorizontal, FiPlus } from "react-icons/fi";
import { IconType } from "react-icons";
import FilteredTodoList from "../containers/FilteredTodoList";
import PopoverMenu from "./PopoverMenu";
import { useDispatch } from "react-redux";
import { sortByKey } from "../slices/todoSlice";

export type Props = {
  title: string;
  SearchIcon?: IconType;
  NewTodoIcon?: IconType;
  MoreIcon?: IconType;
};

export const defaultProps: Props = {
  title: "Sample Title",
  SearchIcon: FiSearch,
  NewTodoIcon: FiPlus,
  MoreIcon: FiMoreHorizontal,
};

export type TodoPageHeaderProps = {
  title: string;
  SearchIcon: IconType;
  NewTodoIcon: IconType;
  MoreIcon: IconType;
  setShowNewTodoForm: Dispatch<SetStateAction<boolean>>;
  showPopover: boolean;
  setShowPopover: Dispatch<SetStateAction<boolean>>;
};

export const TodoPageHeader: FC<TodoPageHeaderProps> = ({
  title,
  SearchIcon,
  NewTodoIcon,
  MoreIcon,
  setShowNewTodoForm,
  showPopover,
  setShowPopover,
}) => {
  const dispatch = useDispatch();
  return (
    <div className="TodoPage-header">
      <h1>{title}</h1>
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

const TodoPage: FC<Props> = ({ title, SearchIcon, NewTodoIcon, MoreIcon }) => {
  const [showNewTodoForm, setShowNewTodoForm] = useState(false);
  const [showPopover, setShowPopover] = useState(true);
  return (
    <div className="TodoPage">
      <TodoPageHeader
        title={title}
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

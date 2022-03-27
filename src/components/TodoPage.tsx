import "../styles/TodoPage.scss";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { FiSearch, FiMoreHorizontal, FiPlus } from "react-icons/fi";
import { IconType } from "react-icons";
import FilteredTodoList from '../containers/FilteredTodoList';

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
};

export const TodoPageHeader: FC<TodoPageHeaderProps> = ({
  title,
  SearchIcon,
  NewTodoIcon,
  MoreIcon,
  setShowNewTodoForm
}) => {

  return (
    <div className="TodoPage-header">
      <h1>{title}</h1>
      <div className="TodoPage-header-icons">
        <div className="icon-wrapper">
          <SearchIcon size={28} />
        </div>
        <div className="icon-wrapper" >
          <NewTodoIcon id="new-todo-icon" size={28} onClick={() => setShowNewTodoForm(true)} />
        </div>
        <div className="icon-wrapper">
          <MoreIcon size={25} />
        </div>
      </div>
    </div>
  );
};

const TodoPage: FC<Props> = ({ title, SearchIcon, NewTodoIcon, MoreIcon }) => {
  const [showNewTodoForm, setShowNewTodoForm] = useState(false);
  return (
    <div className="TodoPage">
      <TodoPageHeader
        title={title}
        SearchIcon={SearchIcon || FiSearch}
        NewTodoIcon={NewTodoIcon || FiPlus}
        MoreIcon={MoreIcon || FiMoreHorizontal}
        setShowNewTodoForm={setShowNewTodoForm}
      />
      <FilteredTodoList showNewTodoForm={showNewTodoForm} setShowNewTodoForm={setShowNewTodoForm}/>
    </div>
  );
};

TodoPage.defaultProps = defaultProps;

export default TodoPage;

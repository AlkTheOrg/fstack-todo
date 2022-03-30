import "../../styles/TodoPageList.scss";
import TodoPageItem from "./TodoPageItem";
import { AppDispatch, RootState } from "../../store";
import { connect } from "react-redux";
import {
  pageAdded,
  pageRemoved,
  pageRenamed,
  Pages,
  setCurPage,
} from "../../slices/todoSlice";
import { FC, useState } from "react";
import { IconType } from "react-icons";
import { FiPlus } from "react-icons/fi";
import NewTodoPage from "./NewTodoPage";

export type Props = {
  pages: Pages;
  onEditSubmit: (pageId: string, newName: string) => any;
  onDelete: (pageId: string) => any;
  onClick: (pageId: string) => any;
  submitNewTodoPage: (name: string) => any;
  headerClass?: string;
  headerTitle?: string;
  NewTodoIcon?: IconType;
};

const TodoPageList: FC<Props> = ({
  pages,
  onEditSubmit,
  onDelete,
  onClick,
  submitNewTodoPage,
  headerClass,
  headerTitle,
  NewTodoIcon = FiPlus,
}) => {
  const [isAddingTodo, setIsAddingTodo] = useState(true);
  const cancelNewTodo = () => setIsAddingTodo(false);
  const submitNewTodo = (name: string) => {
    submitNewTodoPage(name);
    setIsAddingTodo(false);
  }

  return (
    <div className="TodoPageList">
      <div className={headerClass ? headerClass : ""}>
        {headerTitle ? (
          <h2>{headerTitle}</h2>
        ) : (
          <div className="invisible-box" aria-hidden="true"></div>
        )}
        <div
          className="new-todo-btn-wrapper"
          aria-label="Hide sidebar"
          role="button"
          onClick={() => setIsAddingTodo(true)}
        >
          <NewTodoIcon size="25" />
        </div>
      </div>

      {isAddingTodo && (
        <NewTodoPage
          onCancel={cancelNewTodo}
          onSubmit={submitNewTodo}
          onClickOutside={cancelNewTodo}
        />
      )}

      {Object.keys(pages).map((pageId, i) => (
        <TodoPageItem
          name={pages[pageId]}
          onEditSubmit={onEditSubmit}
          onDelete={() => onDelete(pageId)}
          key={"tpi-" + i}
          pageId={pageId}
          onClick={() => onClick(pageId)}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  pages: state.todo.pages,
});

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    onEditSubmit: (pageId: string, newName: string) =>
      dispatch(pageRenamed([pageId, newName])),
    onDelete: (pageId: string) => dispatch(pageRemoved(pageId)),
    onClick: (pageId: string) => dispatch(setCurPage(pageId)),
    submitNewTodoPage: (name: string) => dispatch(pageAdded(name)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoPageList);

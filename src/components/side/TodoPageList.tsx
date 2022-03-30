import "../../styles/TodoPageList.scss";
import TodoPageItem from "./TodoPageItem";
import { AppDispatch, RootState } from "../../store";
import { connect } from "react-redux";
import {
  pageRemoved,
  pageRenamed,
  Pages,
  setCurPage,
} from "../../slices/todoSlice";
import { FC } from "react";
import { IconType } from "react-icons";
import { FiPlus } from "react-icons/fi";

export type Props = {
  pages: Pages;
  onEditSubmit: (pageId: string, newName: string) => any;
  onDelete: (pageId: string) => any;
  onClick: (pageId: string) => any;
  headerClass?: string;
  headerTitle?: string;
  NewTodoIcon?: IconType;
};

const TodoPageList: FC<Props> = ({
  pages,
  onEditSubmit,
  onDelete,
  onClick,
  headerClass,
  headerTitle,
  NewTodoIcon = FiPlus
}) => {
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
          onClick={console.log} //TOD
        >
          <NewTodoIcon size="25" />
        </div>
      </div>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoPageList);

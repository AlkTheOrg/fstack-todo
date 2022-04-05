import "../../styles/TodoPageList.scss";
import TodoPageItem from "./TodoPageItem";
import { AppDispatch, RootState } from "../../store";
import { connect } from "react-redux";
import {
  pageAdded,
  pageRemoved,
  pageRenamed,
  Pages,
  PageWithId,
  removePage,
  setCurPage,
} from "../../slices/todoSlice";
import { FC, useState } from "react";
import { IconType } from "react-icons";
import { FiPlus } from "react-icons/fi";
import NewTodoPage from "./NewTodoPage";

export type Props = {
  pages: Pages;
  userId: string;
  onEditSubmit: (pageId: string, newName: string) => any;
  onDelete: (tpId: string, userId: string) => any;
  onClick: (pageId: string) => any;
  submitNewTodoPage: (page: PageWithId) => any;
  headerClass?: string;
  headerTitle?: string;
  NewTodoIcon?: IconType;
};

const TodoPageList: FC<Props> = ({
  pages,
  userId,
  onEditSubmit,
  onDelete,
  onClick,
  submitNewTodoPage,
  headerClass,
  headerTitle,
  NewTodoIcon = FiPlus,
}) => {
  const [isAddingTodo, setIsAddingTodo] = useState(false);
  const cancelNewTodo = () => setIsAddingTodo(false);
  const submitNewTodo = (name: string) => {
    //TODO replace randId with id returned from backend
    const randId = Math.floor(Math.random() * 100) + 100
    submitNewTodoPage({ name, sortKey: "due", sortOrder: "asc", id: randId.toString() });
    setIsAddingTodo(false);
  };

  const TodoPageItems = () => {
    return (
      <>
        {Object.keys(pages).map((pageId, i) => (
          <TodoPageItem
            name={pages[pageId].name}
            onEditSubmit={onEditSubmit}
            onDelete={() => onDelete(pageId, userId)}
            key={"tpi-" + i}
            pageId={pageId}
            onClick={() => onClick(pageId)}
          />
        ))}
      </>
    );
  };

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

      {Object.keys(pages).length
        ? <TodoPageItems />
        : <div className="no-page centered">
            <h2>You don't have any pages yet.</h2>
          </div>
      }
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  pages: state.todo.pages,
  userId: state.auth.user ? state.auth.user.id : ''
});

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    onEditSubmit: (pageId: string, newName: string) =>
      dispatch(pageRenamed([pageId, newName])),
    onDelete: async(tpId: string, userId: string) => {
      const resultAction = await dispatch(removePage({ userId, tpId }))
      console.log('removePage called');
      if (removePage.fulfilled.match(resultAction)) {
        const deletedPage = resultAction.payload;
        console.log('deletedPage:', deletedPage);
      }
    },
    onClick: (pageId: string) => dispatch(setCurPage(pageId)),
    submitNewTodoPage: (page: PageWithId) => dispatch(pageAdded(page)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoPageList);

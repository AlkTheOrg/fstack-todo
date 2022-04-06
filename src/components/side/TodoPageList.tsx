import "../../styles/TodoPageList.scss";
import TodoPageItem from "./TodoPageItem";
import { AppDispatch, RootState } from "../../store";
import { connect, useDispatch } from "react-redux";
import {
  Pages,
  removePage,
  updatePage,
  setCurPage,
  Page,
  createPage,
  pageAdded,
} from "../../slices/todoSlice";
import { FC, useState } from "react";
import { IconType } from "react-icons";
import { FiPlus } from "react-icons/fi";
import NewTodoPage from "./NewTodoPage";

export type Props = {
  pages: Pages;
  userId: string;
  onEditSubmit: (tpId: string, newName: string, userId: string) => any;
  onDelete: (tpId: string, userId: string) => any;
  onClick: (pageId: string) => any;
  headerClass?: string;
  headerTitle?: string;
  NewTodoPageIcon?: IconType;
  isLoading: boolean
};

const TodoPageList: FC<Props> = ({
  pages,
  userId,
  onEditSubmit,
  onDelete,
  onClick,
  headerClass,
  headerTitle,
  NewTodoPageIcon = FiPlus,
  isLoading
}) => {
  const [isAddingTodoPage, setIsAddingTodoPage] = useState(false);
  const cancelNewTodoPage = () => setIsAddingTodoPage(false);
  const dispatch: AppDispatch = useDispatch();
  const submitNewTodoPage = async (userId: string, todoPage: Page) => await dispatch(createPage({ userId, todoPage }));
  const addNewTodoPage = async(name: string) => {
    const resultAction = await submitNewTodoPage(userId, { name, sortKey: "due", sortOrder: "asc" });
    if (createPage.fulfilled.match(resultAction)) {
      dispatch(pageAdded({ name, sortKey: "due", sortOrder: "asc", id: resultAction.payload._id }))
      console.log('handled new todopage');
    }
    setIsAddingTodoPage(false);
  };

  const TodoPageItems = () => {
    return (
      <>
        {Object.keys(pages).map((pageId, i) => (
          <TodoPageItem
            name={pages[pageId].name}
            onEditSubmit={(tpId: string, newName: string) => onEditSubmit(tpId, newName, userId)}
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
          onClick={() => setIsAddingTodoPage(true)}
        >
          <NewTodoPageIcon size="25" />
        </div>
      </div>

      {isAddingTodoPage && (
        <NewTodoPage
          onCancel={cancelNewTodoPage}
          onSubmit={addNewTodoPage}
          onClickOutside={cancelNewTodoPage}
          isLoading={isLoading}
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
  userId: state.auth.user ? state.auth.user.id : '',
  isLoading: state.todo.isLoading
});

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    onEditSubmit: async (tpId: string, newName: string, userId: string) => {
      const resultAction = await dispatch(updatePage({ userId, tpId, todoPage: { name: newName } }))
      console.log('rename page called');
      if (removePage.fulfilled.match(resultAction)) {
        const updatedPage = resultAction.payload;
        console.log('updatedPage:', updatedPage);
      }
    },
    onDelete: async(tpId: string, userId: string) => {
      const resultAction = await dispatch(removePage({ userId, tpId }))
      console.log('removePage called');
      if (removePage.fulfilled.match(resultAction)) {
        const deletedPage = resultAction.payload;
        console.log('deletedPage:', deletedPage);
      }
    },
    onClick: (pageId: string) => dispatch(setCurPage(pageId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoPageList);

import "../../styles/TodoPageList.scss";
import TodoPageItem from "./TodoPageItem";
import { AppDispatch, RootState } from "../../store";
import { connect } from "react-redux";
import { pageRemoved, pageRenamed, Pages, setCurPage } from "../../slices/todoSlice";
import { FC } from "react";

export type Props = {
  pages: Pages;
  onEditSubmit: (pageId: string, newName: string) => any;
  onDelete: (pageId: string) => any;
  onClick: (pageId: string) => any;
};

const TodoPageList: FC<Props> = ({ pages, onEditSubmit, onDelete, onClick }) => {
  return (
    <div className="TodoPageList">
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

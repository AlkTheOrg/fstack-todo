import { Dispatch, SetStateAction } from "react";
import { connect } from "react-redux";
import TodoList from "../components/TodoList";
import { RootState, AppDispatch } from "../store";
import { sortByKey } from "../util/sortByKey";
import {
  Pages,
  removeTodo,
  setCurEditingTodoId,
  Todo as TodoType,
  updateTodo,
} from "../slices/todoSlice";

type OwnProps = {
  showNewTodoForm: boolean;
  setShowNewTodoForm: Dispatch<SetStateAction<boolean>>;
  pageId: string;
  userId: string;
};

const getFilteredTodos: (
  records: Record<string, TodoType[]>,
  pageId: string,
  pages: Pages,
  searchString: string
) => TodoType[] = (records, pageId, pages, searchString) => {
  const foundPages = pages[pageId]
    ? sortByKey(records[pageId], pages[pageId].sortKey, pages[pageId].sortOrder)
    : [];
  if (!searchString) return foundPages;
  const loweredSearchStr = searchString.toLocaleLowerCase();
  return foundPages.filter((foundPage) =>
    foundPage.name.toLowerCase().includes(loweredSearchStr)
  );
};

const mapStateToProps = (state: RootState, ownProps: OwnProps) => ({
  todos: getFilteredTodos(
    state.todo.byPageId,
    state.todo.curPageId,
    state.todo.pages,
    state.todo.searchString
  ),
  showNewTodoForm: ownProps.showNewTodoForm,
  setShowNewTodoForm: ownProps.setShowNewTodoForm,
  curEditingTodoId: state.todo.curEditingTodoId,
});

const mapDispatchToProps = (dispatch: AppDispatch, ownProps: OwnProps) => ({
  removeTodo: (todo: TodoType) =>
    dispatch(
      removeTodo({ userId: ownProps.userId, tpId: ownProps.pageId, todo })
    ),
  updateTodo: (todo: TodoType) =>
    dispatch(
      updateTodo({ userId: ownProps.userId, tpId: ownProps.pageId, todo })
    ),
  setCurEditingTodoId: (id: string) => dispatch(setCurEditingTodoId(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);

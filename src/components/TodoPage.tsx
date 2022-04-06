import "../styles/TodoPage.scss";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { FiSearch, FiMoreHorizontal, FiPlus } from "react-icons/fi";
import { IconType } from "react-icons";
import FilteredTodoList from "../containers/FilteredTodoList";
import PopoverMenu from "./PopoverMenu";
import EditableText from "./EditableText";
import { useDispatch, useSelector } from "react-redux";
import { setSearchString, updatePage } from "../slices/todoSlice";
import { AppDispatch, RootState } from "../store";
import Search from "./Search";

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
  pageId: string;
  userId: string;
};

export const TodoPageHeader: FC<TodoPageHeaderProps> = ({
  SearchIcon,
  NewTodoIcon,
  MoreIcon,
  setShowNewTodoForm,
  showPopover,
  setShowPopover,
  pageId: curPageId,
  userId
}) => {
  const dispatch: AppDispatch = useDispatch();
  const title = useSelector((state: RootState) => state.todo.pages[curPageId] ? state.todo.pages[curPageId].name : "");
  return (
    <div className="TodoPage-header">
      <EditableText
        defaultValue={title}
        wrapperClass="EditableText"
        DefaultComponent={() => <h1 className="todo-title">{title}</h1>}
        excludedClickOutsideClasses={["todo-title"]}
        onSubmit={(newName: string) =>
          dispatch(updatePage({ userId, tpId: curPageId, todoPage: { name: newName } }))
        }
      />

      <div className="TodoPage-header-icons">
        {/* <div className="icon-wrapper">
          <SearchIcon size={28} />
        </div> */}
        <Search SearchIcon={SearchIcon} onChange={(val: string) => dispatch(setSearchString(val))}/>
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
                  () => dispatch(updatePage({ userId, tpId: curPageId, todoPage: { sortKey: "due", sortOrder: "asc" }})),
                ],
                [
                  "Descending Date",
                  () => dispatch(updatePage({ userId, tpId: curPageId, todoPage: { sortKey: "due", sortOrder: "desc" }})),
                ],
                [
                  "Ascending Name",
                  () => dispatch(updatePage({ userId, tpId: curPageId, todoPage: { sortKey: "name", sortOrder: "asc" }})),
                ],
                [
                  "Descending Name",
                  () => dispatch(updatePage({ userId, tpId: curPageId, todoPage: { sortKey: "name", sortOrder: "desc" }})),
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
  const [showPopover, setShowPopover] = useState(false);
  const curPageId = useSelector((state: RootState) => state.todo.curPageId);
  const userId = useSelector((state: RootState) => state.auth.user ? state.auth.user.id : '')

  return (
    <>
      <div className="TodoPage">
        {curPageId ? (
          <>
            <TodoPageHeader
              SearchIcon={SearchIcon || FiSearch}
              NewTodoIcon={NewTodoIcon || FiPlus}
              MoreIcon={MoreIcon || FiMoreHorizontal}
              setShowNewTodoForm={setShowNewTodoForm}
              showPopover={showPopover}
              setShowPopover={setShowPopover}
              pageId={curPageId}
              userId={userId}
            />
            <FilteredTodoList
              showNewTodoForm={showNewTodoForm}
              setShowNewTodoForm={setShowNewTodoForm}
              pageId={curPageId}
              userId={userId}
            />
          </>
        ) : (
          <div className="no-page-selected centered">
            <h1>NO PAGE SELECTED</h1>
            <h2>Please select a page or create a new one.</h2>
          </div>
        )}
      </div>
    </>
  );
};

TodoPage.defaultProps = defaultProps;

export default TodoPage;

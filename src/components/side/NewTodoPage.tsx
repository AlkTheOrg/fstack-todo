import { FC, useState, useRef, useEffect } from "react";
import SubmitOrCancel from "../SubmitOrCancel";
import "../../styles/NewTodoPage.scss";

// focus to input on render
export type Props = {
  defaultValue?: string;
  onSubmit: (name: string) => any;
  onCancel: () => any;
  onClickOutside: () => any;
  isLoading: boolean
};

const NewTodoPage: FC<Props> = ({
  defaultValue = "New Todo Page",
  onSubmit,
  onCancel,
  onClickOutside,
  isLoading
}) => {
  const [value, setValue] = useState(defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      const input = inputRef.current;
      const target = e.target as Element;
      if (input && target && !isLoading && !input.contains(target)) {
        onClickOutside();
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [onClickOutside, isLoading]);

  const cancelEditing = () => {
    if (!isLoading) onCancel();
  };

  const handleSubmit = () => {
    if (!isLoading) onSubmit(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      cancelEditing();
    } else if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="NewTodoPage">
      <input
        disabled={isLoading}
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {!isLoading &&
        <SubmitOrCancel
        onClickCancel={cancelEditing}
        onClickSubmit={handleSubmit}
        iconSize={22}
        />
      }
    </div>
  );
};

export default NewTodoPage;

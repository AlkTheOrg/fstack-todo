import { FC, useEffect, useRef, useState } from "react";
import "../styles/Search.scss";
import { IconType } from "react-icons";

export type Props = {
  onChange: (val: string) => any;
  defaultValue?: string;
  isSubmittable?: boolean;
  onSubmit?: (...args: any[]) => any;
  buttonClassname?: string;
  buttonText?: string;
  SearchIcon: IconType;
  closeOnClickOutside?: boolean;
};

const Search: FC<Props> = ({
  onChange,
  defaultValue = "",
  isSubmittable = false,
  onSubmit = () => {},
  buttonClassname = "",
  buttonText = "Submit",
  SearchIcon,
  closeOnClickOutside = false,
}) => {
  const [value, setValue] = useState(defaultValue);
  const [inputIsOpen, setInputIsOpen] = useState(false);
  const searchDivRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    onChange(value);
  }, [onChange, value]);

  useEffect(() => {
    if (!inputIsOpen) {
      onChange("");
      setValue("");
      if (inputRef && inputRef.current) {
        inputRef.current.blur();
      }
    }
  }, [inputIsOpen, onChange]);

  useEffect(() => {
    const focusAfterDelay = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (inputRef && inputRef.current && inputIsOpen) {
        inputRef.current.focus();
      }
    };
    focusAfterDelay();
  }, [inputIsOpen]);

  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      const searchDiv = searchDivRef.current;
      const target = e.target as Element;
      if (
        closeOnClickOutside &&
        searchDiv &&
        target &&
        !searchDiv.contains(target)
      ) {
        setInputIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [closeOnClickOutside]);

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isSubmittable) onSubmit();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') setInputIsOpen(false);
  }

  return (
    <div ref={searchDivRef} className="Search">
      <div className="input-wrapper">
        <input
          type="text"
          onChange={(e) => setValue(e.target.value)}
          value={value}
          className={inputIsOpen ? "open" : ""}
          ref={inputRef}
          placeholder="Filter todos"
          onKeyDown={handleKeyDown}
        />
        <SearchIcon
          onClick={() => setInputIsOpen((prev) => !prev)}
          className="icon"
          size={28}
          data-testid="search-icon"
        />
      </div>
      {isSubmittable && (
        <button
          onSubmit={handleSubmit}
          type="submit"
          className={buttonClassname}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default Search;

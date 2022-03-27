import { FC, useState, useEffect, useRef, useCallback } from "react";
import { FiCheck } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import "../styles/EditableText.scss";

export type Props = {
  DefaultComponent: FC;
  defaultValue: string;
  wrapperClass: string;
  inputClass?: string;
  onEdit?: () => any;
  onSubmit?: (...args: any[]) => any;
  excludedClickOutsideClasses?: string[]
};

const EditableText: FC<Props> = ({
  DefaultComponent,
  defaultValue,
  wrapperClass,
  inputClass,
  onEdit,
  onSubmit,
  excludedClickOutsideClasses,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const editableWrapperRef = useRef<HTMLDivElement>(null);

  const cancelEditing = useCallback(() => {
    setValue(defaultValue);
    setIsEditing(false);
  }, [defaultValue])
  
  const handleClickOutside = useCallback((e: Event) => {
    const current = editableWrapperRef && editableWrapperRef.current;
    const target = e.target as Element;
    
    const containsExcludedClass = Array.prototype.slice.call(target.classList).some((c) => {
      return excludedClickOutsideClasses?.includes(c);
    })
    if (current && !current.contains(target) && !containsExcludedClass) {
      cancelEditing();
    }
  }, [excludedClickOutsideClasses, cancelEditing]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      cancelEditing();
    } else if (e.key === 'Enter') {
      handleSubmit();
    }
  }

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(value);
    }
    setIsEditing(false);
  }

  useEffect(() => {
    if (isEditing && editableWrapperRef && editableWrapperRef.current) {
      editableWrapperRef.current.querySelector('input')?.focus();
      if (onEdit) onEdit();
    }
  }, [isEditing])

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  if (isEditing) {
    return (
      <div ref={editableWrapperRef} className={wrapperClass}>
        <input
          type="text"
          value={value.toUpperCase()}
          onChange={(e) => setValue(e.target.value)}
          className={inputClass ? inputClass : ""}
          onKeyDown={handleKeyDown}
        />
        <div className="icons">
          <div className="icon-wrapper" onClick={cancelEditing}>
            <IoCloseOutline size={26} />
          </div>
          <div className="icon-wrapper" onClick={handleSubmit}>
            <FiCheck size={26} />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div onClick={() => setIsEditing(true)}>
      <DefaultComponent />
    </div>
  );
};

export default EditableText;

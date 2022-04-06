import { FC, useState, useEffect, useRef, useCallback } from "react";
import "../styles/EditableText.scss";
import SubmitOrCancel from "./SubmitOrCancel";

export type Props = {
  DefaultComponent: FC;
  defaultValue: string;
  showValueInUpperCase?: boolean;
  wrapperClass: string;
  inputClass?: string;
  onEdit?: () => any;
  onSubmit?: (newName: string) => any;
  excludedClickOutsideClasses?: string[];
  isEditingActive?: boolean;
};

const EditableText: FC<Props> = ({
  DefaultComponent,
  defaultValue,
  showValueInUpperCase = true,
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
    if (!isEditing) cancelEditing();
  }, [isEditing, onEdit, cancelEditing])

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
          value={
            showValueInUpperCase
              ? value.toUpperCase()
              : value
          }
          onChange={(e) => setValue(e.target.value)}
          className={inputClass ? inputClass : ""}
          onKeyDown={handleKeyDown}
        />
        <SubmitOrCancel
          onClickCancel={cancelEditing}
          onClickSubmit={handleSubmit}
        />
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

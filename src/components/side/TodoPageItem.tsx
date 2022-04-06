import { FC, useState } from "react";
import { FiTrash2, FiEdit } from "react-icons/fi";
import { GrDocumentText } from "react-icons/gr";
import EditableText from "../EditableText";
import "../../styles/TodoPageItem.scss";
import { IconType } from "react-icons";

type Props = {
  logoUrl?: URL;
  fallbackLogo?: IconType;
  EditLogo?: IconType;
  DeleteLogo?: IconType;
  onEditSubmit: (...args: any[]) => any;
  onDelete: () => any;
  onClick: () => any;
  name: string;
  pageId: string
};

const TodoPageItem: FC<Props> = ({
  logoUrl,
  fallbackLogo,
  EditLogo = FiEdit,
  DeleteLogo = FiTrash2,
  onEditSubmit,
  onDelete,
  onClick,
  name,
  pageId
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const handleSubmit = (newName: string) => onEditSubmit(pageId, newName);
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target !== e.currentTarget) return;
    onClick();
  }
  const DefaultName = () => <p className="page-naame">{name.length < 21 ? name : name.slice(0, 20) + "..."}</p>;
  return (
    <div
      className="TodoPageItem"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={handleClick}
    >
      <div className="icon-wrapper">
        <GrDocumentText size={20} />
      </div>

      <div className="page-name">
        <EditableText
          wrapperClass="EditableText EditableText-small"
          defaultValue={name}
          DefaultComponent={DefaultName}
          excludedClickOutsideClasses={["page-naame"]}
          showValueInUpperCase={false}
          onSubmit={handleSubmit}
        />
      </div>

      {isHovering && (
        <div className="hover-icons">
          {/* <div className="icon-wrapper" onClick={TODO}>
            <EditLogo size={17} />
          </div> */}
          <div className="icon-wrapper" onClick={onDelete}>
            <DeleteLogo size={17} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoPageItem;

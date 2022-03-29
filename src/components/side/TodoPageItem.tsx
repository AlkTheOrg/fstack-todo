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
  const DefaultName = () => <p className="page-naame">{name}</p>;
  return (
    <div
      className="TodoPageItem"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={onClick}
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

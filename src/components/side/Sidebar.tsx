import React, { FC, useState } from "react";
import "../../styles/Sidebar.scss";
import { FaChevronLeft } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { combineClassNames } from "../../util/combineClassNames";
import { IconType } from "react-icons";
import { useDispatch } from 'react-redux';
import { RootState } from "../../store";
import { useSelector } from 'react-redux';
import { detachModeToggled } from "../../slices/pageSettingsSlice";

export interface Props {
  title?: string;
  isDetached?: boolean;
  DetachIcon?: IconType;
  closeOnMouseLeave?: boolean;
  classes: string[];
  onClose?: () => any;
}

export const defaultProps: Props = {
  title: "",
  DetachIcon: GiHamburgerMenu,
  classes: [],
  onClose: () => {},
};

const Sidebar: FC<Props> = ({
  title,
  DetachIcon,
  classes,
  onClose,
  children,
}): JSX.Element => {
  const dispatch = useDispatch();
  const isDetached = useSelector((state: RootState) => state.pageSettings.isSidebarDetached);

  //TODO Uncomment below after finishing the design of siebar
  // const [isVisible, setIsVisible] = useState(!isDetached);
  const [isVisible, setIsVisible] = useState(true);

  const toggleDetach = () => dispatch(detachModeToggled());

  const closeSidebar = () => {
    setIsVisible(false);
    if (onClose) onClose();
  }

  const handleMouseLeave = () => {
    if (isDetached) closeSidebar();
  };

  const handleMouseEnter = () => {
    if (!isVisible && isDetached) {
      setIsVisible(true);
    }
  };

  const handleClickHide = () => {
    if (isDetached) closeSidebar();
  }

  const combinedClasses = classes ? combineClassNames(classes) : "";

  // useEffect(() => {
  //   console.log(isVisible);
  // }, [isVisible]);

  return (
    <aside
      className={`${combinedClasses} ${isVisible ? "isVisible" : ""} ${
        isDetached ? "isDetached" : "isAttached"
      }`}
      onMouseLeave={handleMouseLeave}
    >
      <div className="header">
        {title ? (
          <h2>{title}</h2>
        ) : (
          <div className="invisible-box" aria-hidden="true"></div>
        )}
        <div
          className="detach-btn-wrapper"
          aria-label="Hide sidebar"
          role="button"
          onClick={toggleDetach}
        >
          {DetachIcon && <DetachIcon size="25" />}
        </div>
      </div>
      {isDetached && (
        <div
          className="hide-btn-container"
          onMouseEnter={handleMouseEnter}
          aria-hidden="true"
        >
          <div
            className="hide-btn"
            role="button"
            aria-label={
              isVisible ? "Hide Todo Pages sidebar" : "Show Todo Pages sidebar"
            }
            onClick={handleClickHide}
          >
            <FaChevronLeft className="hide-icn" />
          </div>
        </div>
      )}
      {children}
    </aside>
  );
};

Sidebar.defaultProps = defaultProps;

export default Sidebar;

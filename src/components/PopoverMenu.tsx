import {
  FC,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
  useCallback,
} from "react";
import "../styles/PopoverMenu.scss";

export type Props = {
  baseClass: string;
  popoverClass: string;
  popoverWrapperClass: string;
  showPopover: boolean;
  setShowPopover: Dispatch<SetStateAction<boolean>>;
  closOnClickOutside?: boolean;
  popovers: [string, () => any][];
};

const PopoverMenu: FC<Props> = ({
  baseClass,
  popoverClass,
  popoverWrapperClass,
  showPopover,
  setShowPopover,
  closOnClickOutside = true,
  children,
  popovers,
}) => {
  const popoverRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (e: Event) => {
      const target = e.target as HTMLElement;
      const firstChild = popoverRef && popoverRef.current;
      if (closOnClickOutside && firstChild && !firstChild.contains(target)) {
        setShowPopover(false);
      }
    },
    [closOnClickOutside, setShowPopover]
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div
      ref={popoverRef}
      className={baseClass + `${showPopover ? " isShow" : ""}`}
    >
      {popovers.map(([str, f], i) => {
        return <div key={"pop-"+i} className={popoverWrapperClass} onClick={f}>
          <div className={popoverClass}>
            <p>{str}</p>
          </div>
        </div>
      })}
    </div>
  );
};

export default PopoverMenu;

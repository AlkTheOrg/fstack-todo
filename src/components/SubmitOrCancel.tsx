import { FC } from "react";
import { IconType } from "react-icons";
import { FiCheck } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import "../styles/SubmitOrCancel.scss";

export type Props = {
  onClickCancel: (...args: [any]) => any;
  onClickSubmit: (...args: [any]) => any;
  SubmitIcon?: IconType;
  CancelIcon?: IconType;
  iconSize?: number;
  submitBtnAriaLabel?: string;
  cancelBtnAriaLabel?: string;
};

const SubmitOrCancel: FC<Props> = ({
  onClickCancel,
  onClickSubmit,
  SubmitIcon = FiCheck,
  CancelIcon = IoCloseOutline,
  iconSize = 26,
  submitBtnAriaLabel = "Submit",
  cancelBtnAriaLabel = "Cancel",
}) => {
  return (
    <div className="icons">
      <div
        className="icon-wrapper"
        onClick={onClickCancel}
        aria-label={cancelBtnAriaLabel}
      >
        <CancelIcon size={iconSize} />
      </div>
      <div
        className="icon-wrapper"
        onClick={onClickSubmit}
        aria-label={submitBtnAriaLabel}
      >
        <SubmitIcon size={iconSize} />
      </div>
    </div>
  );
};

export default SubmitOrCancel;

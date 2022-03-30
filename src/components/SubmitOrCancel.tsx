import { FC } from 'react'
import { IconType } from 'react-icons';
import { FiCheck } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import '../styles/SubmitOrCancel.scss'

export type Props = {
  onClickCancel: (...args: [any]) => any;
  onClickSubmit: (...args: [any]) => any;
  SubmitIcon?: IconType;
  CancelIcon?: IconType;
  iconSize?: number
}

const SubmitOrCancel: FC<Props> = ({
  onClickCancel,
  onClickSubmit,
  SubmitIcon = FiCheck,
  CancelIcon = IoCloseOutline,
  iconSize = 26
}) => {
  return (
    <div className="icons">
          <div className="icon-wrapper" onClick={onClickCancel}>
            <CancelIcon size={iconSize} />
          </div>
          <div className="icon-wrapper" onClick={onClickSubmit}>
            <SubmitIcon size={iconSize} />
          </div>
    </div>
  )
}

export default SubmitOrCancel
